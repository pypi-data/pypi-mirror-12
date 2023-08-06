daexy
=====

This is a simple proxy program to system init scripts

It has been designed to be used together with supervisord to launch
daemons handling signals their own way, using their init script.

HowTo
=====

Getting started
---------------

Simply run ``daexy -i /etc/init.d/couchdb``

Then - ``/etc/init.d/couchdb start`` will be called at program startup -
``SIGINT`` and ``SIGTERM`` will cause a call to
``/etc/init.d/couchdb stop`` - ``SIG_IGN`` and ``SIGHUP`` will cause a
call to ``/etc/init.d/couchdb reload``

Customize actions
-----------------

Add ``--<SignalName>=<Action>`` option to map any signal to the desired
init action.

Adding an option of ``--SIG_IGN=graceful`` to the previous command will
map the ``SIG_IGN`` signal to call ``/etc/init.d/couchdb graceful``
