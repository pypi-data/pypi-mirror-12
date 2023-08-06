===============================
Stockfighter
===============================

.. image:: https://img.shields.io/pypi/v/stockfighter.svg
        :target: https://pypi.python.org/pypi/stockfighter

.. image:: https://img.shields.io/travis/striglia/stockfighter.svg
        :target: https://travis-ci.org/striglia/stockfighter

.. image:: https://readthedocs.org/projects/stockfighter/badge/?version=latest
        :target: https://readthedocs.org/projects/stockfighter/?badge=latest
        :alt: Documentation Status


API wrapper for Stockfighter

* Free software: ISC license
* Documentation someday at: https://stockfighter.readthedocs.org.

Get things started
--------

Not hard!

.. code-block:: shell

    pip install stockfighter

.. code-block:: python

    from stockfighter import Stockfighter
    s = Stockfighter(venue='TESTEX', account='EXB123456')
    print s.venue_stocks()

Features
--------

* Calling the API is pretty important :)
* .....get back to me later on what else


=======
History
=======

0.2.2 (2015-12-12)
------------------

* Fix testing and implementation for place_order

0.2.2 (2015-12-11)
------------------

* Make py2 and py3 compatibility a thing, guaranteed by Tox and Travis.

0.2.1 (2015-12-11)
------------------

* Working README and quick install

0.2.0 (2015-12-11)
------------------

* All API functions implemented and tested

0.1.0 (2015-12-11)
------------------

* First release on PyPI.


