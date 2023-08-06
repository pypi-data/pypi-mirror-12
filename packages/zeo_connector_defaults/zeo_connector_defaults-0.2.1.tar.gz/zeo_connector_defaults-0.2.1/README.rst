Introduction
============

.. image:: https://badge.fury.io/py/zeo_connector_defaults.png
    :target: https://pypi.python.org/pypi/zeo_connector_defaults

.. image:: https://img.shields.io/pypi/dm/zeo_connector_defaults.svg
    :target: https://pypi.python.org/pypi/zeo_connector_defaults

.. image:: https://img.shields.io/pypi/l/zeo_connector_defaults.svg

.. image:: https://img.shields.io/github/issues/Bystroushaak/zeo_connector_defaults.svg
    :target: https://github.com/Bystroushaak/zeo_connector_defaults/issues

Default configuration files and configuration file generator for zeo_connector_.

.. _zeo_connector: https://github.com/Bystroushaak/zeo_connector

Documentation
-------------

This project provides generators of the testing environment for the ZEO-related tests. It also provides generator, for the basic ZEO configuration files.

zeo_connector_gen_defaults.py
+++++++++++++++++++++++++++++

This script simplifies the process of generation of ZEO configuration files.

ZEO tests
+++++++++

Typically, when you test your program which is using the ZEO database, you need to generate the database files, then run new thread with ``runzeo`` program, do tests, cleanup and stop the thread.

This module provides two functions, which do exactly this:

    - zeo_connector_defaults.generate_environment()
    - zeo_connector_defaults.cleanup_environment()

generate_environment
^^^^^^^^^^^^^^^^^^^^
This function will create temporary directory in ``/tmp`` and copy template files for ZEO client and server into this directory. Then it starts new thread with ``runzeo`` program using the temporary server configuration file.

Names of the files may be resolved using ``tmp_context_name()`` function.

Note:
    This function works best, if added to setup part of your test environment.

cleanup_environment
^^^^^^^^^^^^^^^^^^^

Function, which stops the running ``runzeo`` thread and delete all the temporary files.

Note:
    This function works best, if added to setup part of your test environment.

Context functions
^^^^^^^^^^^^^^^^^

There is also two `temp environment access functions`:

    - tmp_context_name()
    - tmp_context()

Both of them take one `fn` argument and return name of the file (``tmp_context_name()``) or content of the file (``tmp_context()``) in context of random temporary directory.

For example:

.. code-block:: python

    tmp_context_name("zeo_client.conf")

returns the absolute path to the file ``zeo_client.conf``, which may be for example ``/tmp/tmp1r5keh/zeo_client.conf``.

You may also call it without the arguments, which will return just the name of the temporary directory:

.. code-block:: python

    tmp_context_name()

which should return something like ``/tmp/tmp1r5keh``.

Tests example
+++++++++++++

Here is the example how your test may look like:

.. code-block:: python

    #! /usr/bin/env python
    # -*- coding: utf-8 -*-
    #
    # Interpreter version: python 2.7
    #
    # Imports =====================================================================
    import pytest

    from zeo_connector_defaults import generate_environment
    from zeo_connector_defaults import cleanup_environment
    from zeo_connector_defaults import tmp_context_name


    # Setup =======================================================================
    def setup_module(module):
        generate_environment()


    def teardown_module(module):
        cleanup_environment()


    # Fixtures ====================================================================
    @pytest.fixture
    def zeo_conf_wrapper():
        return ZEOConfWrapper(
            conf_path=tmp_context_name("zeo_client.conf"),
        ...

    # Tests =======================================================================
    def test_something(zeo_conf_wrapper):
        ...

Installation
------------

Module is `hosted at PYPI <https://pypi.python.org/pypi/zeo_connector_defaults>`_, and can be easily installed using `PIP`_::

    sudo pip install zeo_connector_defaults

.. _PIP: http://en.wikipedia.org/wiki/Pip_%28package_manager%29


Source code
-----------

Project is released under the MIT license. Source code can be found at GitHub:

- https://github.com/Bystroushaak/zeo_connector_defaults
