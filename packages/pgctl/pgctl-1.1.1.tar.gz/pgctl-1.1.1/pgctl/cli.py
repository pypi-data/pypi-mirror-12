# -*- coding: utf-8 -*-
from __future__ import absolute_import
from __future__ import print_function
from __future__ import unicode_literals

import argparse
import os
import time
from subprocess import MAXFD
from time import time as now

from cached_property import cached_property
from frozendict import frozendict
from py._path.local import LocalPath as Path

from .config import Config
from .configsearch import search_parent_directories
from .daemontools import SvStat
from .debug import debug
from .errors import CircularAliases
from .errors import NoPlayground
from .errors import PgctlUserError
from .errors import Unsupervised
from .functions import commafy
from .functions import exec_
from .functions import JSONEncoder
from .functions import uniq
from .service import Service
from pgctl import __version__


XDG_RUNTIME_DIR = os.environ.get('XDG_RUNTIME_DIR') or '~/.run'
ALL_SERVICES = '(all services)'
PGCTL_DEFAULTS = frozendict({
    # TODO-DOC: config
    # where do our services live?
    'pgdir': 'playground',
    # where does pgdir live?
    'pghome': os.path.join(XDG_RUNTIME_DIR, 'pgctl'),
    # which services are we acting on?
    'services': ('default',),
    # how long do we wait for them to come down/up?
    'timeout': '2.0',
    'poll': '.01',
    # what are the named groups of services?
    'aliases': frozendict({
        'default': (ALL_SERVICES,)
    }),
})
CHANNEL = '[pgctl]'


def pgctl_print(*print_args, **print_kwargs):
    from sys import stderr
    print_kwargs.setdefault('file', stderr)
    print(CHANNEL, *print_args, **print_kwargs)


def timeout(service_name, error, start_time, timeout_length, check_time):
    curr_time = now()
    check_length = curr_time - check_time
    next_time = curr_time + check_length
    limit_time = start_time + timeout_length

    # assertion can take a long time. we timeout as close to the limit_time as we can.
    if abs(curr_time - limit_time) < abs(next_time - limit_time):
        error_message = "ERROR: '{0}' timed out at {1:.2g} seconds: {2}".format(
            service_name,
            timeout_length,
            error,
        )
        if limit_time - curr_time > 0.005:
            error_message += '(limit is %gs and our check took %.2f seconds)' % (
                timeout_length,
                check_length,
            )
        pgctl_print(error_message)
        return True
    else:
        debug('service %s still waiting: %.1f seconds.', service_name, limit_time - curr_time)
        return False


class PgctlApp(object):

    def __init__(self, config=PGCTL_DEFAULTS):
        self.pgconf = frozendict(config)

    def __call__(self):
        """Run the app."""
        # ensure no weird file descriptors are open.
        os.closerange(3, MAXFD)
        # config guarantees this is set
        command = self.pgconf['command']
        # argparse guarantees this is an attribute
        command = getattr(self, command)
        try:
            result = command()
        except PgctlUserError as error:
            # we don't need or want a stack trace for user errors
            result = str(error)

        if isinstance(result, basestring):
            return CHANNEL + ' ERROR: ' + result
        else:
            return result

    def __change_state(self, change_state, assert_state, get_timeout, changing, changed):
        """Changes the state of a supervised service using the svc command"""
        pgctl_print(changing, commafy(self.service_names))
        services = list(self.services)
        failed = []
        start_time = now()
        while services:
            for service in self.services:
                try:
                    change_state(service)
                except Unsupervised:
                    pass  # handled in state assertion, below
            for service in tuple(services):
                check_time = now()
                try:
                    assert_state(service)
                except PgctlUserError as error:
                    if timeout(service.name, error, start_time, get_timeout(service), check_time):
                        services.remove(service)
                        failed.append(service.name)
                else:
                    pgctl_print(changed, service.name)
                    services.remove(service)

            time.sleep(self.poll)

        return failed

    def with_services(self, services):
        """return a similar PgctlApp, but with a different set of services"""
        newconf = dict(self.pgconf)
        newconf['services'] = services
        return PgctlApp(newconf)

    def __show_failure(self, state, failed):
        if not failed:
            return

        failapp = self.with_services(failed)
        childpid = os.fork()
        if childpid:
            os.waitpid(childpid, 0)
        else:
            failapp.log(interactive=False)  # doesn't return
        if state == 'start':
            # we don't want services that failed to start to be 'up'
            failapp.stop()
        return 'Some services failed to %s: %s' % (state, commafy(failed))

    def start(self):
        """Idempotent start of a service or group of services"""
        failed = self.__change_state(
            lambda service: service.start(),
            lambda service: service.assert_ready(),
            lambda service: service.timeout_ready,
            'Starting:',
            'Started:',
        )
        return self.__show_failure('start', failed)

    def stop(self):
        """Idempotent stop of a service or group of services"""
        failed = self.__change_state(
            lambda service: service.stop(),
            lambda service: service.assert_stopped(),
            lambda service: service.timeout_stop,
            'Stopping:',
            'Stopped:',
        )
        return self.__show_failure('stop', failed)

    def status(self):
        """Retrieve the PID and state of a service or group of services"""
        for service in self.services:
            status = service.svstat()
            if status.state == SvStat.UNSUPERVISED:
                # this is the expected state for down services.
                status = status._replace(state='down')
            print('%s: %s' % (service.name, status))

    def restart(self):
        """Starts and stops a service"""
        result = self.stop()
        if result:
            return result
        return self.start()

    def reload(self):
        """Reloads the configuration for a service"""
        pgctl_print('reload:', commafy(self.service_names))
        return 'reloading is not yet implemented.'

    def log(self, interactive=None):
        """Displays the stdout and stderr for a service or group of services"""
        # TODO(p3): -n: send the value to tail -n
        # TODO(p3): -f: force iteractive behavior
        # TODO(p3): -F: force iteractive behavior off
        tail = ('tail', '--verbose')  # show file headers

        if interactive is None:
            import sys
            interactive = sys.stdout.isatty()
        if interactive:
            # we're interactive; give a continuous log
            # TODO-TEST: pgctl log | pb should be non-interactive
            tail += ('--follow=name', '--retry')

        pwd = Path()
        logfiles = []
        for service in self.services:
            service.ensure_logs()
            logfiles.append(service.path.join('stdout.log').relto(pwd))
            logfiles.append(service.path.join('stderr.log').relto(pwd))
        exec_(tail + tuple(logfiles))  # never returns

    def debug(self):
        """Allow a service to run in the foreground"""
        try:
            # start supervise in the foreground with the service up
            service, = self.services  # pylint:disable=unpacking-non-sequence
        except ValueError:
            return 'Must debug exactly one service, not: ' + commafy(self.service_names)

        self.stop()
        service.foreground()  # never returns

    def config(self):
        """Print the configuration for a service"""
        print(JSONEncoder(sort_keys=True, indent=4).encode(self.pgconf))

    def service_by_name(self, service_name):
        """Return an instantiated Service, by name."""
        path = self.pgdir.join(service_name)
        return Service(
            path,
            self.pghome.join(path.relto(str('/'))),
            self.pgconf['timeout'],
        )

    @cached_property
    def services(self):
        """Return a tuple of the services for a command

        :return: tuple of Service objects
        """
        services = [
            self.service_by_name(service_name)
            for alias in self.pgconf['services']
            for service_name in self._expand_aliases(alias)
        ]
        return uniq(services)

    def _expand_aliases(self, name):
        aliases = self.pgconf['aliases']
        visited = set()
        stack = [name]
        result = []

        while stack:
            name = stack.pop()
            if name == ALL_SERVICES:
                result.extend(self.all_service_names)
            elif name in visited:
                raise CircularAliases("Circular aliases! Visited twice during alias expansion: '%s'" % name)
            else:
                visited.add(name)
                if name in aliases:
                    stack.extend(reversed(aliases[name]))
                else:
                    result.append(name)

        return result

    @cached_property
    def poll(self):
        return float(self.pgconf['poll'])

    @cached_property
    def all_service_names(self):
        """Return a tuple of all of the Services.

        :return: tuple of strings -- the service names
        """
        pgdir = self.pgdir.listdir(sort=True)

        return tuple([
            service_path.basename
            for service_path in pgdir
            if service_path.check(dir=True)
        ])

    @cached_property
    def service_names(self):
        return tuple([service.name for service in self.services])

    @cached_property
    def pgdir(self):
        """Retrieve the set playground directory"""
        for parent in search_parent_directories():
            pgdir = Path(parent).join(self.pgconf['pgdir'])
            if pgdir.check(dir=True):
                return pgdir
        raise NoPlayground(
            "could not find any directory named '%s'" % self.pgconf['pgdir']
        )

    @cached_property
    def pghome(self):
        """Retrieve the set pgctl home directory.

        By default, this is "$XDG_RUNTIME_DIR/pgctl".
        """
        return Path(self.pgconf['pghome'], expanduser=True)

    commands = (start, stop, status, restart, reload, log, debug, config)


def parser():
    commands = [command.__name__ for command in PgctlApp.commands]
    parser = argparse.ArgumentParser()
    parser.add_argument('--version', action='version', version=__version__)
    parser.add_argument('--pgdir', help='name the playground directory', default=argparse.SUPPRESS)
    parser.add_argument('--pghome', help='directory to keep user-level playground state', default=argparse.SUPPRESS)
    parser.add_argument('command', help='specify what action to take', choices=commands, default=argparse.SUPPRESS)
    parser.add_argument('services', nargs='*', help='specify which services to act upon', default=argparse.SUPPRESS)

    return parser


def main(argv=None):
    p = parser()
    args = p.parse_args(argv)
    config = Config('pgctl')
    config = config.combined(PGCTL_DEFAULTS, args)
    app = PgctlApp(config)

    return app()


if __name__ == '__main__':
    exit(main())
