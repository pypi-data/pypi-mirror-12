================
pytest-benchmark
================

.. list-table::
    :stub-columns: 1

    * - docs
      - |docs|
    * - tests
      - | |travis| |appveyor| |requires| |coveralls| |codecov|
        | |scrutinizer| |codacy| |codeclimate|
    * - package
      - |version| |downloads| |wheel| |supported-versions| |supported-implementations|

.. |docs| image:: https://readthedocs.org/projects/pytest-benchmark/badge/?style=flat
    :target: https://readthedocs.org/projects/pytest-benchmark
    :alt: Documentation Status

.. |travis| image:: https://travis-ci.org/ionelmc/pytest-benchmark.svg?branch=master
    :alt: Travis-CI Build Status
    :target: https://travis-ci.org/ionelmc/pytest-benchmark

.. |appveyor| image:: https://ci.appveyor.com/api/projects/status/github/ionelmc/pytest-benchmark?branch=master&svg=true
    :alt: AppVeyor Build Status
    :target: https://ci.appveyor.com/project/ionelmc/pytest-benchmark

.. |requires| image:: https://requires.io/github/ionelmc/pytest-benchmark/requirements.svg?branch=master
    :alt: Requirements Status
    :target: https://requires.io/github/ionelmc/pytest-benchmark/requirements/?branch=master

.. |coveralls| image:: https://coveralls.io/repos/ionelmc/pytest-benchmark/badge.svg?branch=master&service=github
    :alt: Coverage Status
    :target: https://coveralls.io/r/ionelmc/pytest-benchmark

.. |codecov| image:: https://codecov.io/github/ionelmc/pytest-benchmark/coverage.svg?branch=master
    :alt: Coverage Status
    :target: https://codecov.io/github/ionelmc/pytest-benchmark

.. |landscape| image:: https://landscape.io/github/ionelmc/pytest-benchmark/master/landscape.svg?style=flat
    :target: https://landscape.io/github/ionelmc/pytest-benchmark/master
    :alt: Code Quality Status

.. |codacy| image:: https://img.shields.io/codacy/80e2960677c24d5083a802dd57df17dc.svg?style=flat
    :target: https://www.codacy.com/app/ionelmc/pytest-benchmark
    :alt: Codacy Code Quality Status

.. |codeclimate| image:: https://codeclimate.com/github/ionelmc/pytest-benchmark/badges/gpa.svg
   :target: https://codeclimate.com/github/ionelmc/pytest-benchmark
   :alt: CodeClimate Quality Status

.. |version| image:: https://img.shields.io/pypi/v/pytest-benchmark.svg?style=flat
    :alt: PyPI Package latest release
    :target: https://pypi.python.org/pypi/pytest-benchmark

.. |downloads| image:: https://img.shields.io/pypi/dm/pytest-benchmark.svg?style=flat
    :alt: PyPI Package monthly downloads
    :target: https://pypi.python.org/pypi/pytest-benchmark

.. |wheel| image:: https://img.shields.io/pypi/wheel/pytest-benchmark.svg?style=flat
    :alt: PyPI Wheel
    :target: https://pypi.python.org/pypi/pytest-benchmark

.. |supported-versions| image:: https://img.shields.io/pypi/pyversions/pytest-benchmark.svg?style=flat
    :alt: Supported versions
    :target: https://pypi.python.org/pypi/pytest-benchmark

.. |supported-implementations| image:: https://img.shields.io/pypi/implementation/pytest-benchmark.svg?style=flat
    :alt: Supported implementations
    :target: https://pypi.python.org/pypi/pytest-benchmark

.. |scrutinizer| image:: https://img.shields.io/scrutinizer/g/ionelmc/pytest-benchmark/master.svg?style=flat
    :alt: Scrutinizer Status
    :target: https://scrutinizer-ci.com/g/ionelmc/pytest-benchmark/

A ``py.test`` fixture for benchmarking code. It will group the tests into rounds that are calibrated to the chosen
timer. See calibration_ and FAQ_.

* Free software: BSD license

Installation
============

::

    pip install pytest-benchmark

Documentation
=============

Available at: `pytest-benchmark.readthedocs.org <http://pytest-benchmark.readthedocs.org/en/stable/>`_.

Examples
========

This plugin provides a `benchmark` fixture. This fixture is a callable object that will benchmark any function passed
to it.

Example:

.. code-block:: python

    def something(duration=0.000001):
        """
        Function that needs some serious benchmarking.
        """
        time.sleep(duration)
        # You may return anything you want, like the result of a computation
        return 123

    def test_my_stuff(benchmark):
        # benchmark something
        result = benchmark(something)

        # Extra code, to verify that the run completed correctly.
        # Sometimes you may want to check the result, fast functions
        # are no good if they return incorrect results :-)
        assert result == 123

You can also pass extra arguments:

.. code-block:: python

    def test_my_stuff(benchmark):
        benchmark(time.sleep, 0.02)

Or even keyword arguments:

.. code-block:: python

    def test_my_stuff(benchmark):
        benchmark(time.sleep, duration=0.02)

Another pattern seen in the wild, that is not recommended for micro-benchmarks (very fast code) but may be convenient:

.. code-block:: python

    def test_my_stuff(benchmark):
        @benchmark
        def something():  # unnecessary function call
            time.sleep(0.000001)

A better way is to just benchmark the final function:

.. code-block:: python

    def test_my_stuff(benchmark):
        benchmark(time.sleep, 0.000001)  # way more accurate results!

If you need to do fine control over how the benchmark is run (like a `setup` function, exact control of `iterations` and
`rounds`) there's a special mode - pedantic_:

.. code-block:: python

    def my_special_setup():
        ...

    def test_with_setup(benchmark):
        benchmark.pedantic(something, setup=my_special_setup, args=(1, 2, 3), kwargs={'foo': 'bar'}, iterations=10, rounds=100)

Screenshots
-----------

Normal run:

.. image:: https://github.com/ionelmc/pytest-benchmark/raw/master/docs/screenshot.png
    :alt: Screenshot of py.test summary

Compare mode (``--benchmark-compare``):

.. image:: https://github.com/ionelmc/pytest-benchmark/raw/master/docs/screenshot-compare.png
    :alt: Screenshot of py.test summary in compare mode

Histogram (``--benchmark-histogram``):

.. image:: https://cdn.rawgit.com/ionelmc/pytest-benchmark/94860cc8f47aed7ba4f9c7e1380c2195342613f6/docs/sample-tests_test_normal.py_test_xfast_parametrized%5B0%5D.svg
    :alt: Histogram sample

..

    Also, it has `nice tooltips <https://cdn.rawgit.com/ionelmc/pytest-benchmark/master/docs/sample.svg>`_.

Development
===========

To run the all tests run::

    tox

Credits
=======

* Timing code and ideas taken from: https://bitbucket.org/haypo/misc/src/tip/python/benchmark.py

.. _FAQ: http://pytest-benchmark.readthedocs.org/en/latest/faq.html
.. _calibration: http://pytest-benchmark.readthedocs.org/en/latest/features.html#calibration
.. _pedantic: http://pytest-benchmark.readthedocs.org/en/latest/pedantic.html





