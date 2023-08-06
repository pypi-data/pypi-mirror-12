=========
MiniBench
=========














MiniBench provides a simple framework for benchmarking following the ``unittest`` module pattern.

Compatibility
=============

minibench requires Python 2.7+.


Installation
============

You can install minibench with pip:

::

    $ pip install minibench

or with easy_install:

::

    $ easy_install minibench


Quick start
===========

Write your benchmarks as you would write you unittests.
Just create a ``.bench.py`` file.

::

    # fake.bench.py
    from minibench import Benchmark

    class FakeBenchmark(Benchmark):
        '''Fake benchmark'''
        def bench_fake(self):
            '''Run my bench'''
            # Do something

Then run it with the ``bench`` command

::

    $ bench
    >>> Fake benchmark (x5)
    Run my bench ......................................... ✔ (0.1234s)


Documentation
=============

The documentation is hosted `on Read the Docs <http://minibench.readthedocs.org/en/0.1.0/>`_

Changelog
=========

0.1.0
-----

- Initial release



