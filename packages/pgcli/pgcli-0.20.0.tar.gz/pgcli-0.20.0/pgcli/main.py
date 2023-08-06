#!/usr/bin/env python
from __future__ import unicode_literals
from __future__ import print_function

import os
import re
import sys
import traceback
import logging
import threading
import shutil
from time import time
from codecs import open

import click
try:
    import setproctitle
except ImportError:
    setproctitle = None
import sqlparse
from prompt_toolkit import CommandLineInterface, Application, AbortAction
from prompt_toolkit.enums import DEFAULT_BUFFER
from prompt_toolkit.shortcuts import create_default_layout, create_eventloop
from prompt_toolkit.document import Document
from prompt_toolkit.filters import Always, HasFocus, IsDone
from prompt_toolkit.layout.processors import (ConditionalProcessor,
                                        HighlightMatchingBracketProcessor)
from prompt_toolkit.history import FileHistory
from pygments.lexers.sql import PostgresLexer
from pygments.token import Token

from .packages.tabulate import tabulate
from .packages.expanded import expanded_table
from pgspecial.main import (PGSpecial, NO_QUERY, content_exceeds_width)
import pgspecial as special
from .pgcompleter import PGCompleter
from .pgtoolbar import create_toolbar_tokens_func
from .pgstyle import style_factory
from .pgexecute import PGExecute
from .pgbuffer import PGBuffer
from .completion_refresher import CompletionRefresher
from .config import write_default_config, load_config, config_location
from .key_bindings import pgcli_bindings
from .encodingutils import utf8tounicode
from .__init__ import __version__

click.disable_unicode_literals_warning = True

try:
    from urlparse import urlparse
except ImportError:
    from urllib.parse import urlparse

from getpass import getuser
from psycopg2 import OperationalError

from collections import namedtuple

# Query tuples are used for maintaining history
MetaQuery = namedtuple(
    'Query',
    [
        'query',            # The entire text of the command
        'successful',       # True If all subqueries were successful
        'total_time',       # Time elapsed executing the query
        'meta_changed',     # True if any subquery executed create/alter/drop
        'db_changed',       # True if any subquery changed the database
        'path_changed',     # True if any subquery changed the search path
        'mutated',          # True if any subquery executed insert/update/delete
    ])
MetaQuery.__new__.__defaults__ = ('', False, 0, False, False, False, False)


class PGCli(object):

    def __init__(self, force_passwd_prompt=False, never_passwd_prompt=False,
                 pgexecute=None, pgclirc_file=None):

        self.force_passwd_prompt = force_passwd_prompt
        self.never_passwd_prompt = never_passwd_prompt
        self.pgexecute = pgexecute

        from pgcli import __file__ as package_root
        package_root = os.path.dirname(package_root)

        default_config = os.path.join(package_root, 'pgclirc')
        write_default_config(default_config, pgclirc_file)

        self.pgspecial = PGSpecial()

        # Load config.
        c = self.config = load_config(pgclirc_file, default_config)
        self.multi_line = c['main'].as_bool('multi_line')
        self.vi_mode = c['main'].as_bool('vi')
        self.pgspecial.timing_enabled = c['main'].as_bool('timing')
        self.table_format = c['main']['table_format']
        self.syntax_style = c['main']['syntax_style']
        self.cli_style = c['colors']
        self.wider_completion_menu = c['main'].as_bool('wider_completion_menu')

        self.on_error = c['main']['on_error'].upper()

        self.completion_refresher = CompletionRefresher()

        self.logger = logging.getLogger(__name__)
        self.initialize_logging()

        self.query_history = []

        # Initialize completer
        smart_completion = c['main'].as_bool('smart_completion')
        completer = PGCompleter(smart_completion, pgspecial=self.pgspecial)
        self.completer = completer
        self._completer_lock = threading.Lock()
        self.register_special_commands()

        self.cli = None

    def register_special_commands(self):

        self.pgspecial.register(self.change_db, '\\c',
                              '\\c[onnect] database_name',
                              'Change to a new database.',
                              aliases=('use', '\\connect', 'USE'))
        self.pgspecial.register(self.refresh_completions, '\\#', '\\#',
                              'Refresh auto-completions.', arg_type=NO_QUERY)
        self.pgspecial.register(self.refresh_completions, '\\refresh', '\\refresh',
                              'Refresh auto-completions.', arg_type=NO_QUERY)
        self.pgspecial.register(self.execute_from_file, '\\i', '\\i filename',
                              'Execute commands from file.')

    def change_db(self, pattern, **_):
        if pattern:
            db = pattern[1:-1] if pattern[0] == pattern[-1] == '"' else pattern
            self.pgexecute.connect(database=db)
        else:
            self.pgexecute.connect()

        yield (None, None, None, 'You are now connected to database "%s" as '
                'user "%s"' % (self.pgexecute.dbname, self.pgexecute.user))

    def execute_from_file(self, pattern, **_):
        if not pattern:
            message = '\\i: missing required argument'
            return [(None, None, None, message)]
        try:
            with open(os.path.expanduser(pattern), encoding='utf-8') as f:
                query = f.read()
        except IOError as e:
            return [(None, None, None, str(e))]

        return self.pgexecute.run(query, self.pgspecial, on_error=self.on_error)

    def initialize_logging(self):

        log_file = self.config['main']['log_file']
        log_level = self.config['main']['log_level']

        level_map = {'CRITICAL': logging.CRITICAL,
                     'ERROR': logging.ERROR,
                     'WARNING': logging.WARNING,
                     'INFO': logging.INFO,
                     'DEBUG': logging.DEBUG
                     }

        handler = logging.FileHandler(os.path.expanduser(log_file))

        formatter = logging.Formatter(
            '%(asctime)s (%(process)d/%(threadName)s) '
            '%(name)s %(levelname)s - %(message)s')

        handler.setFormatter(formatter)

        root_logger = logging.getLogger('pgcli')
        root_logger.addHandler(handler)
        root_logger.setLevel(level_map[log_level.upper()])

        root_logger.debug('Initializing pgcli logging.')
        root_logger.debug('Log file %r.', log_file)

    def connect_dsn(self, dsn):
        self.connect(dsn=dsn)

    def connect_uri(self, uri):
        uri = urlparse(uri)
        database = uri.path[1:]  # ignore the leading fwd slash
        self.connect(database, uri.hostname, uri.username,
                     uri.port, uri.password)

    def connect(self, database='', host='', user='', port='', passwd='',
                dsn=''):
        # Connect to the database.

        if not user:
            user = getuser()

        if not database:
            database = user

        # If password prompt is not forced but no password is provided, try
        # getting it from environment variable.
        if not self.force_passwd_prompt and not passwd:
            passwd = os.environ.get('PGPASSWORD', '')

        # Prompt for a password immediately if requested via the -W flag. This
        # avoids wasting time trying to connect to the database and catching a
        # no-password exception.
        # If we successfully parsed a password from a URI, there's no need to
        # prompt for it, even with the -W flag
        if self.force_passwd_prompt and not passwd:
            passwd = click.prompt('Password', hide_input=True,
                                  show_default=False, type=str)

        # Prompt for a password after 1st attempt to connect without a password
        # fails. Don't prompt if the -w flag is supplied
        auto_passwd_prompt = not passwd and not self.never_passwd_prompt

        # Attempt to connect to the database.
        # Note that passwd may be empty on the first attempt. If connection
        # fails because of a missing password, but we're allowed to prompt for
        # a password (no -w flag), prompt for a passwd and try again.
        try:
            try:
                pgexecute = PGExecute(database, user, passwd, host, port, dsn)
            except OperationalError as e:
                if ('no password supplied' in utf8tounicode(e.args[0]) and
                        auto_passwd_prompt):
                    passwd = click.prompt('Password', hide_input=True,
                                          show_default=False, type=str)
                    pgexecute = PGExecute(database, user, passwd, host, port,
                                          dsn)
                else:
                    raise e

        except Exception as e:  # Connecting to a database could fail.
            self.logger.debug('Database connection failed: %r.', e)
            self.logger.error("traceback: %r", traceback.format_exc())
            click.secho(str(e), err=True, fg='red')
            exit(1)

        self.pgexecute = pgexecute

    def handle_editor_command(self, cli, document):
        """
        Editor command is any query that is prefixed or suffixed
        by a '\e'. The reason for a while loop is because a user
        might edit a query multiple times.
        For eg:
        "select * from \e"<enter> to edit it in vim, then come
        back to the prompt with the edited query "select * from
        blah where q = 'abc'\e" to edit it again.
        :param cli: CommandLineInterface
        :param document: Document
        :return: Document
        """
        while special.editor_command(document.text):
            filename = special.get_filename(document.text)
            sql, message = special.open_external_editor(filename,
                                                          sql=document.text)
            if message:
                # Something went wrong. Raise an exception and bail.
                raise RuntimeError(message)
            cli.current_buffer.document = Document(sql, cursor_position=len(sql))
            document = cli.run(False)
            continue
        return document

    def run_cli(self):
        logger = self.logger
        original_less_opts = self.adjust_less_opts()

        self.refresh_completions()

        self.cli = self._build_cli()

        print('Version:', __version__)
        print('Chat: https://gitter.im/dbcli/pgcli')
        print('Mail: https://groups.google.com/forum/#!forum/pgcli')
        print('Home: http://pgcli.com')

        try:
            while True:
                document = self.cli.run()

                # The reason we check here instead of inside the pgexecute is
                # because we want to raise the Exit exception which will be
                # caught by the try/except block that wraps the pgexecute.run()
                # statement.
                if quit_command(document.text):
                    raise EOFError

                try:
                    document = self.handle_editor_command(self.cli, document)
                except RuntimeError as e:
                    logger.error("sql: %r, error: %r", document.text, e)
                    logger.error("traceback: %r", traceback.format_exc())
                    click.secho(str(e), err=True, fg='red')
                    continue

                # Initialize default metaquery in case execution fails
                query = MetaQuery(query=document.text, successful=False)

                try:
                    output, query = self._evaluate_command(document.text)
                except KeyboardInterrupt:
                    # Restart connection to the database
                    self.pgexecute.connect()
                    logger.debug("cancelled query, sql: %r", document.text)
                    click.secho("cancelled query", err=True, fg='red')
                except NotImplementedError:
                    click.secho('Not Yet Implemented.', fg="yellow")
                except OperationalError as e:
                    if ('server closed the connection'
                            in utf8tounicode(e.args[0])):
                        self._handle_server_closed_connection()
                    else:
                        logger.error("sql: %r, error: %r", document.text, e)
                        logger.error("traceback: %r", traceback.format_exc())
                        click.secho(str(e), err=True, fg='red')
                except Exception as e:
                    logger.error("sql: %r, error: %r", document.text, e)
                    logger.error("traceback: %r", traceback.format_exc())
                    click.secho(str(e), err=True, fg='red')
                else:
                    try:
                        click.echo_via_pager('\n'.join(output))
                    except KeyboardInterrupt:
                        pass

                    if self.pgspecial.timing_enabled:
                        print('Time: %0.03fs' % query.total_time)

                    # Check if we need to update completions, in order of most
                    # to least drastic changes
                    if query.db_changed:
                        self.refresh_completions(reset=True)
                    elif query.meta_changed:
                        self.refresh_completions(reset=False)
                    elif query.path_changed:
                        logger.debug('Refreshing search path')
                        with self._completer_lock:
                            self.completer.set_search_path(
                                self.pgexecute.search_path())
                        logger.debug('Search path: %r',
                                     self.completer.search_path)

                self.query_history.append(query)

        except EOFError:
            print ('Goodbye!')
        finally:  # Reset the less opts back to original.
            logger.debug('Restoring env var LESS to %r.', original_less_opts)
            os.environ['LESS'] = original_less_opts

    def _build_cli(self):

        def set_vi_mode(value):
            self.vi_mode = value

        key_binding_manager = pgcli_bindings(
            get_vi_mode_enabled=lambda: self.vi_mode,
            set_vi_mode_enabled=set_vi_mode)

        def prompt_tokens(_):
            return [(Token.Prompt, '%s> ' % self.pgexecute.dbname)]

        get_toolbar_tokens = create_toolbar_tokens_func(
            lambda: self.vi_mode, self.completion_refresher.is_refreshing)

        layout = create_default_layout(
            lexer=PostgresLexer,
            reserve_space_for_menu=True,
            get_prompt_tokens=prompt_tokens,
            get_bottom_toolbar_tokens=get_toolbar_tokens,
            display_completions_in_columns=self.wider_completion_menu,
            multiline=True,
            extra_input_processors=[
               # Highlight matching brackets while editing.
               ConditionalProcessor(
                   processor=HighlightMatchingBracketProcessor(chars='[](){}'),
                   filter=HasFocus(DEFAULT_BUFFER) & ~IsDone()),
            ])

        history_file = self.config['main']['history_file']
        with self._completer_lock:
            buf = PGBuffer(
                always_multiline=self.multi_line,
                completer=self.completer,
                history=FileHistory(os.path.expanduser(history_file)),
                complete_while_typing=Always())

            application = Application(
                style=style_factory(self.syntax_style, self.cli_style),
                layout=layout,
                buffer=buf,
                key_bindings_registry=key_binding_manager.registry,
                on_exit=AbortAction.RAISE_EXCEPTION,
                ignore_case=True)

            cli = CommandLineInterface(
                application=application,
                eventloop=create_eventloop())

            return cli

    def _evaluate_command(self, text):
        """Used to run a command entered by the user during CLI operation
        (Puts the E in REPL)

        returns (results, MetaQuery)
        """
        logger = self.logger
        logger.debug('sql: %r', text)

        all_success = True
        meta_changed = False  # CREATE, ALTER, DROP, etc
        mutated = False  # INSERT, DELETE, etc
        db_changed = False
        path_changed = False
        output = []
        total = 0

        # Run the query.
        start = time()
        on_error_resume = self.on_error == 'RESUME'
        res = self.pgexecute.run(text, self.pgspecial,
                                 exception_formatter, on_error_resume)

        for title, cur, headers, status, sql, success in res:
            logger.debug("headers: %r", headers)
            logger.debug("rows: %r", cur)
            logger.debug("status: %r", status)
            threshold = 1000
            if (is_select(status) and
                    cur and cur.rowcount > threshold):
                click.secho('The result set has more than %s rows.'
                            % threshold, fg='red')
                if not click.confirm('Do you want to continue?'):
                    click.secho("Aborted!", err=True, fg='red')
                    break

            if self.pgspecial.auto_expand:
                max_width = self.cli.output.get_size().columns
            else:
                max_width = None

            formatted = format_output(
                title, cur, headers, status, self.table_format,
                self.pgspecial.expanded_output, max_width)

            output.extend(formatted)
            end = time()
            total += end - start

            # Keep track of whether any of the queries are mutating or changing
            # the database
            if success:
                mutated = mutated or is_mutating(status)
                db_changed = db_changed or has_change_db_cmd(sql)
                meta_changed = meta_changed or has_meta_cmd(sql)
                path_changed = path_changed or has_change_path_cmd(sql)
            else:
                all_success = False

        meta_query = MetaQuery(text, all_success, total, meta_changed,
                               db_changed, path_changed, mutated)

        return output, meta_query

    def _handle_server_closed_connection(self):
        """Used during CLI execution"""
        reconnect = click.prompt(
            'Connection reset. Reconnect (Y/n)',
            show_default=False, type=bool, default=True)
        if reconnect:
            try:
                self.pgexecute.connect()
                click.secho('Reconnected!\nTry the command again.', fg='green')
            except OperationalError as e:
                click.secho(str(e), err=True, fg='red')

    def adjust_less_opts(self):
        less_opts = os.environ.get('LESS', '')
        self.logger.debug('Original value for LESS env var: %r', less_opts)
        os.environ['LESS'] = '-SRXF'

        return less_opts

    def refresh_completions(self, reset=False):
        if reset:
            with self._completer_lock:
                self.completer.reset_completions()
        self.completion_refresher.refresh(self.pgexecute, self.pgspecial,
                                          self._on_completions_refreshed)
        return [(None, None, None,
                'Auto-completion refresh started in the background.')]

    def _on_completions_refreshed(self, new_completer):
        self._swap_completer_objects(new_completer)

        if self.cli:
            # After refreshing, redraw the CLI to clear the statusbar
            # "Refreshing completions..." indicator
            self.cli.request_redraw()

    def _swap_completer_objects(self, new_completer):
        """Swap the completer object in cli with the newly created completer.
        """
        with self._completer_lock:
            self.completer = new_completer
            # When pgcli is first launched we call refresh_completions before
            # instantiating the cli object. So it is necessary to check if cli
            # exists before trying the replace the completer object in cli.
            if self.cli:
                self.cli.current_buffer.completer = new_completer

    def get_completions(self, text, cursor_positition):
        with self._completer_lock:
            return self.completer.get_completions(
                Document(text=text, cursor_position=cursor_positition), None)


@click.command()
# Default host is '' so psycopg2 can default to either localhost or unix socket
@click.option('-h', '--host', default='', envvar='PGHOST',
        help='Host address of the postgres database.')
@click.option('-p', '--port', default=5432, help='Port number at which the '
        'postgres instance is listening.', envvar='PGPORT')
@click.option('-U', '--user', envvar='PGUSER', help='User name to '
        'connect to the postgres database.')
@click.option('-W', '--password', 'prompt_passwd', is_flag=True, default=False,
        help='Force password prompt.')
@click.option('-w', '--no-password', 'never_prompt', is_flag=True,
        default=False, help='Never prompt for password.')
@click.option('-v', '--version', is_flag=True, help='Version of pgcli.')
@click.option('-d', '--dbname', default='', envvar='PGDATABASE',
        help='database name to connect to.')
@click.option('--pgclirc', default=config_location(), envvar='PGCLIRC',
        help='Location of pgclirc file.')
@click.argument('database', default=lambda: None, envvar='PGDATABASE', nargs=1)
@click.argument('username', default=lambda: None, envvar='PGUSER', nargs=1)
def cli(database, user, host, port, prompt_passwd, never_prompt, dbname,
        username, version, pgclirc):

    if version:
        print('Version:', __version__)
        sys.exit(0)

    config_dir = os.path.dirname(config_location())
    if not os.path.exists(config_dir):
        os.makedirs(config_dir)

    # Migrate the config file from old location.
    if os.path.exists(os.path.expanduser('~/.pgclirc')):
        if not os.path.exists(config_location()):
            shutil.move(os.path.expanduser('~/.pgclirc'), config_location())
            print ('Config file (~/.pgclirc) moved to new location',
                    config_location())
        else:
            print ('Config file is now located at', config_location())
            print ('Please move the existing config file ~/.pgclirc to',
                    config_location())

    pgcli = PGCli(prompt_passwd, never_prompt, pgclirc_file=pgclirc)

    # Choose which ever one has a valid value.
    database = database or dbname
    user = username or user

    if '://' in database:
        pgcli.connect_uri(database)
    elif "=" in database:
        pgcli.connect_dsn(database)
    elif os.environ.get('PGSERVICE', None):
        pgcli.connect_dsn('service={0}'.format(os.environ['PGSERVICE']))
    else:
        pgcli.connect(database, host, user, port)

    pgcli.logger.debug('Launch Params: \n'
            '\tdatabase: %r'
            '\tuser: %r'
            '\thost: %r'
            '\tport: %r', database, user, host, port)

    if setproctitle:
        obfuscate_process_password()

    pgcli.run_cli()


def obfuscate_process_password():
    process_title = setproctitle.getproctitle()
    if '://' in process_title:
        process_title = re.sub(r":(.*):(.*)@", r":\1:xxxx@", process_title)
    elif "=" in process_title:
        process_title = re.sub(r"password=(.+?)((\s[a-zA-Z]+=)|$)", r"password=xxxx\2", process_title)

    setproctitle.setproctitle(process_title)

def format_output(title, cur, headers, status, table_format, expanded=False, max_width=None):
    output = []
    if title:  # Only print the title if it's not None.
        output.append(title)
    if cur:
        headers = [utf8tounicode(x) for x in headers]
        if expanded and headers:
            output.append(expanded_table(cur, headers))
        else:
            tabulated, rows = tabulate(cur, headers, tablefmt=table_format,
                missingval='<null>')
            if (max_width and
                    content_exceeds_width(rows[0], max_width) and
                    headers):
                output.append(expanded_table(rows, headers))
            else:
                output.append(tabulated)
    if status:  # Only print the status if it's not None.
        output.append(status)
    return output


def has_meta_cmd(query):
    """Determines if the completion needs a refresh by checking if the sql
    statement is an alter, create, or drop"""
    try:
        first_token = query.split()[0]
        if first_token.lower() in ('alter', 'create', 'drop'):
            return True
    except Exception:
        return False

    return False


def has_change_db_cmd(query):
    """Determines if the statement is a database switch such as 'use' or '\\c'"""
    try:
        first_token = query.split()[0]
        if first_token.lower() in ('use', '\\c', '\\connect'):
            return True
    except Exception:
        return False

    return False


def has_change_path_cmd(sql):
    """Determines if the search_path should be refreshed by checking if the
    sql has 'set search_path'."""
    return 'set search_path' in sql.lower()


def is_mutating(status):
    """Determines if the statement is mutating based on the status."""
    if not status:
        return False

    mutating = set(['insert', 'update', 'delete'])
    return status.split(None, 1)[0].lower() in mutating


def is_select(status):
    """Returns true if the first word in status is 'select'."""
    if not status:
        return False
    return status.split(None, 1)[0].lower() == 'select'


def quit_command(sql):
    return (sql.strip().lower() == 'exit'
            or sql.strip().lower() == 'quit'
            or sql.strip() == '\q'
            or sql.strip() == ':q')


def exception_formatter(e):
    return click.style(utf8tounicode(str(e)), fg='red')


if __name__ == "__main__":
    cli()
