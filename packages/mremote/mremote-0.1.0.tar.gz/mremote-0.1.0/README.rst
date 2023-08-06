===============================
Mremote
===============================

.. image:: https://img.shields.io/travis/XayOn/mremote.svg
        :target: https://travis-ci.org/XayOn/mremote

.. image:: https://img.shields.io/pypi/v/mremote.svg
        :target: https://pypi.python.org/pypi/mremote


Simple multi-remote web interface for LIRC setups.
This requires a fully configured lirc setup, and can handle multiple controllers (I currently have four).

* Free software: BSD license
* Documentation: https://mremote.readthedocs.org.


Requires installing scipy, wich requires numpy, so you must install 

::

	apt-get install liblas-dev liblapack-dev

Features
--------

* Web interface emulating the full remote control
* Simple API enabling RestTasker control
