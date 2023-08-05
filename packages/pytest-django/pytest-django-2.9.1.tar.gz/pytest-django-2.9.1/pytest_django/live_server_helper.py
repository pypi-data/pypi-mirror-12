import sys

from .lazy_django import get_django_version


class LiveServer(object):
    """The liveserver fixture

    This is the object which is returned to the actual user when they
    request the ``live_server`` fixture.  The fixture handles creation
    and stopping however.
    """

    def __init__(self, addr):
        from django.db import connections
        from django.test.testcases import LiveServerThread

        connections_override = {}
        for conn in connections.all():
            # If using in-memory sqlite databases, pass the connections to
            # the server thread.
            if (conn.settings_dict['ENGINE'] == 'django.db.backends.sqlite3' and
                    conn.settings_dict['NAME'] == ':memory:'):
                # Explicitly enable thread-shareability for this connection
                conn.allow_thread_sharing = True
                connections_override[conn.alias] = conn

        liveserver_kwargs = {'connections_override': connections_override}
        from django.conf import settings
        if ('django.contrib.staticfiles' in settings.INSTALLED_APPS and
                get_django_version() >= (1, 7)):
            from django.contrib.staticfiles.handlers import (
                StaticFilesHandler)
            liveserver_kwargs['static_handler'] = StaticFilesHandler
        else:
            try:
                from django.test.testcases import _StaticFilesHandler
            except ImportError:
                pass
            else:
                liveserver_kwargs['static_handler'] = _StaticFilesHandler

        host, possible_ports = parse_addr(addr)
        self.thread = LiveServerThread(host, possible_ports,
                                       **liveserver_kwargs)
        self.thread.daemon = True
        self.thread.start()
        self.thread.is_ready.wait()

        if self.thread.error:
            raise self.thread.error

    def stop(self):
        """Stop the server"""
        # .terminate() was added in Django 1.7
        terminate = getattr(self.thread, 'terminate', lambda: None)
        terminate()
        self.thread.join()

    @property
    def url(self):
        return 'http://%s:%s' % (self.thread.host, self.thread.port)

    if sys.version_info < (3, 0):
        def __unicode__(self):
            return self.url

        def __add__(self, other):
            return unicode(self) + other  # noqa: pyflakes on python3
    else:
        def __str__(self):
            return self.url

        def __add__(self, other):
            return str(self) + other

    def __repr__(self):
        return '<LiveServer listening at %s>' % self.url


def parse_addr(specified_address):
    """Parse the --liveserver argument into a host/IP address and port range"""
    # This code is based on
    # django.test.testcases.LiveServerTestCase.setUpClass

    # The specified ports may be of the form '8000-8010,8080,9200-9300'
    # i.e. a comma-separated list of ports or ranges of ports, so we break
    # it down into a detailed list of all possible ports.
    possible_ports = []
    try:
        host, port_ranges = specified_address.split(':')
        for port_range in port_ranges.split(','):
            # A port range can be of either form: '8000' or '8000-8010'.
            extremes = list(map(int, port_range.split('-')))
            assert len(extremes) in (1, 2)
            if len(extremes) == 1:
                # Port range of the form '8000'
                possible_ports.append(extremes[0])
            else:
                # Port range of the form '8000-8010'
                for port in range(extremes[0], extremes[1] + 1):
                    possible_ports.append(port)
    except Exception:
        raise Exception(
            'Invalid address ("%s") for live server.' % specified_address)

    return host, possible_ports
