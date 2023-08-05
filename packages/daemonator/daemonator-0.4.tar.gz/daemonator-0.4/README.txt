Daemonator (0.3.3)
==================

Lightweight and no-nonsense POSIX daemon library. Extensible, complete
with process forking and
`PID <http://en.wikipedia.org/wiki/Process_identifier>`__ management.

Inspired by `Sander
Marechal <http://www.jejik.com/articles/2007/02/a_simple_unix_linux_daemon_in_python/>`__.

License
-------

MIT/X11 - See
`LICENSE <https://github.com/stackd/daemon-py/blob/master/LICENSE>`__

Getting Started
---------------

**Installation**

::

        # git clone https://github.com/flaviocpontes/daemon-py.git
        # cd daemon-py/
        # python setup.py install

*Note: Daemon-Python, as of version 0.2, has only been tested on Linux.
The setup.py script will automatically detect if the underlying platform
is compatible, as well as determine the appropriate version of Python.*

1. **Instantiation**

   ::

       import daemon
       class MyDaemon(daemon.Daemon):
       """Subclass Daemon-Python."""
       ...
           def run(self):
           """Define what to daemonize by implementing the run() method."""
           ...

2. **Implementing control**

   Finally, we want to be able to control our daemon.

   ::

       ...
       if __name__ == "__main__":
           daemon = MyDaemon('/tmp/mydaemon.pid') #Define a pidfile location (typically located in /tmp or /var/run)
           if len(sys.argv) == 2:
               if 'start' == sys.argv[1]:
                   daemon.start()
               elif 'stop' == sys.argv[1]:
                   daemon.stop()
               elif 'restart' == sys.argv[1]:
                   daemon.restart()
               elif 'status' == sys.argv[1]:
                   daemon.status()
               else:
                   sys.stdout.write("Unknown command\n")
                   sys.exit(2)
               sys.exit(0)
           else:
               sys.stdout.write("Usage: %s start|stop|restart|status\n" % sys.argv[0])
               sys.exit(2)

For a complete basic implementation, see
`src/test.py <https://github.com/stackd/daemon-py/blob/master/src/test.py>`__
