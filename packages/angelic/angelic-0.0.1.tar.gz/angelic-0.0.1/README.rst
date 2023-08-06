angelic
=======

An API for daemonization

Installation
------------

From the project root directory::

    $ python setup.py install

Usage
-----

Add it to the top of your programs::

    from angelic import daemonize

Then wrap your looping function::
    
    @daemonize
    def loop(verbose=False, ...):
        ...


Release Notes
-------------

:0.0.1:
    Project created
