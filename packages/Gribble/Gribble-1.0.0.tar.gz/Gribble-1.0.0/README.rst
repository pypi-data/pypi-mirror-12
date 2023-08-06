======
Gribble
======

.. image:: https://travis-ci.org/JamieCressey/python-gribble.svg?branch=master
    :target: https://travis-ci.org/JamieCressey/python-gribble

python daemon that munches on logs and sends their contents to logstash


Notice
======

Gribble is a fork of python-beaver version 34.1.0 (https://github.com/josegonzalez/python-beaver)  with our own fixes merged in.


Requirements
============

* Python 2.6+
* Optional zeromq support: install libzmq (``brew install zmq`` or ``apt-get install libzmq-dev``) and pyzmq (``pip install pyzmq==2.1.11``)

Installation
============


From PyPI::

    pip install gribble==34.1.0

Documentation
=============


You can also build the docs locally::

    # get sphinx installed
    pip install sphinx

    # retrieve the repository
    git clone git://github.com/JamieCressey/gribble.git

    # build the html output
    cd gribble/docs
    make html

HTML docs will be available in `gribble/docs/_build/html`.

Credits
=======

Fork of the python-beaver log shipper created by Jose Diaz-Gonzalez::

	https://github.com/josegonzalez/python-beaver


Based on work from Giampaolo and Lusis::

    Real time log files watcher supporting log rotation.

    Original Author: Giampaolo Rodola' <g.rodola [AT] gmail [DOT] com>
    http://code.activestate.com/recipes/577968-log-watcher-tail-f-log/

    License: MIT

    Other hacks (ZMQ, JSON, optparse, ...): lusis
