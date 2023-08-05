WinRemote
=========

This package is primarily a library which helps you remotely manage your
windows machine. Secondly it's command line tool to manage windows
machine remotely. The command line tool calls directly specific module.
Modules are very easily extensible. You can write your own and use it
from command line immediately, only specifying its name and module
function.

For example this command:

.. code:: bash

    $ python winremote.py --username=X--password=Y--ip=IP services list

Equals to this python code:

.. code:: python

    import winremote
    import winrm
    import pprint

    session = winrm.Session(target=IP, auth=(X, Y))
    win = Windows(session, winremote.WMI(session))
    pprint.pprint(win.services.list())


