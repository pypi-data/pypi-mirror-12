=====
Statx
=====

.. image:: https://travis-ci.org/lorien/statx.png?branch=master
    :target: https://travis-ci.org/lorien/statx?branch=master

.. image:: https://img.shields.io/pypi/dm/statx.svg
    :target: https://pypi.python.org/pypi/statx

.. image:: https://img.shields.io/pypi/v/statx.svg
    :target: https://pypi.python.org/pypi/statx

.. image:: https://readthedocs.org/projects/statx/badge/?version=latest
    :target: http://user-agent.readthedocs.org


What is statx library?
----------------------

You might find it helpful to collect statistics about some long-running
process. For insitance, web site crawling, copying big number of files,
processing some big stuff. Stat class is able to::

* count things
* display speed of change
* collects things (collections are also counted)


Usage Example
-------------

.. code:: python

    >>> from statx import Stat
    >>> import time
    >>> import logging
    >>> logging.basicConfig(level=logging.DEBUG)
    >>> stat = Stat(speed_key='foo')
    >>> for x in range(20):
    ...     stat.inc('foo')
    ...     stat.inc('bar', 2)
    ...     stat.collect('gaz', 13)
    ...     time.sleep(0.5)
    ... 
    DEBUG:grab.stat:RPS: 0.01 [bar=82, foo=42]
    DEBUG:grab.stat:RPS: 2.00 [bar=86, foo=44, gaz=2]
    DEBUG:grab.stat:RPS: 2.00 [bar=90, foo=46, gaz=4]
    DEBUG:grab.stat:RPS: 2.00 [bar=94, foo=48, gaz=6]
    DEBUG:grab.stat:RPS: 2.00 [bar=98, foo=50, gaz=8]
    DEBUG:grab.stat:RPS: 2.00 [bar=102, foo=52, gaz=10]
    DEBUG:grab.stat:RPS: 2.00 [bar=106, foo=54, gaz=12]
    DEBUG:grab.stat:RPS: 2.00 [bar=110, foo=56, gaz=14]
    DEBUG:grab.stat:RPS: 2.00 [bar=114, foo=58, gaz=16]
    DEBUG:grab.stat:RPS: 2.00 [bar=118, foo=60, gaz=18]
    >>> stat.print_progress_line()
    DEBUG:grab.stat:RPS: 0.04 [bar=122, foo=61, gaz=20]
    >>> stat.counters
    defaultdict(<type 'int'>, {'foo': 61, 'bar': 122})
    >>> stat.collections
    defaultdict(<type 'list'>, {'gaz': [13, 13, 13, 13, 13, 13, 13, 13, 13,
                                        13, 13, 13, 13, 13, 13, 13, 13, 13,
                                        13, 13]})


Installation
------------

Use pip:

.. code:: shell

    $ pip install -U statx


Contribution
============

Use github to submit bug,fix or wish request: https://github.com/lorien/statx/issues
