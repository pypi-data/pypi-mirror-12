HitchQuickstart
===============

HitchQuickstart is a hitch plugin that generates a base hitch project from scratch,
including an engine.py, hitchreqs.txt, settings files, system.packages and a stub
test.

Install and Run
---------------

If you want to run hitch quickstart from scratch, simply copy and paste the following 3 command::

    ~/yourproject$ mkdir tests

    ~/yourproject/tests$ cd tests

    ~/yourproject/tests$ curl -sSL https://hitchtest.com/init.sh > init.sh ; chmod +x init.sh ; ./init.sh

Note that the exact name of the tests directory is not important.

If you have an existing hitch environment::

    $ hitch install hitchquickstart

    $ hitch quickstart
