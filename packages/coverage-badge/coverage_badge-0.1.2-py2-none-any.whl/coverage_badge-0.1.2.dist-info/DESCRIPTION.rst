Coverage.py Badge
==================

.. image:: https://img.shields.io/travis/dbrgn/coverage-badge/master.svg
    :alt: Build status
    :target: https://travis-ci.org/dbrgn/coverage-badge

.. image:: https://img.shields.io/pypi/dm/coverage-badge.svg
    :alt: PyPI Downloads
    :target: https://pypi.python.org/pypi/coverage-badge

A small script to generate coverage badges using Coverage.py. Example of a generated badge:

.. image:: https://cdn.rawgit.com/dbrgn/coverage-badge/master/example.svg
    :alt: Example coverage badge

The badge template has been taken from shields.io_, therefore it should look
mostly good. (The spec is a bit stricter on the margins, but I can't easily do
text width calculations in Python so the margins might not always be 4px.)

.. _shields.io: http://shields.io/


Usage
-----

First, run Coverage.py to generate the necessary coverage data. Then you can
either return the badge SVG to stdout::

    $ coverage-badge

...or write it to a file::

    $ coverage-badge -o coverage.svg

It's important that you run ``coverage-badge`` from the directory where the
``.coverage`` data file is located.

---

The full usage text::

    usage: __main__.py [-h] [-o FILEPATH] [-q] [-v]

    Generate coverage badges for Coverage.py.

    optional arguments:
      -h, --help   show this help message and exit
      -o FILEPATH  Save the file to the specified path.
      -q           Don't output any non-error messages.
      -v           Show version.


License
-------

MIT License, see `LICENSE.txt` file..


