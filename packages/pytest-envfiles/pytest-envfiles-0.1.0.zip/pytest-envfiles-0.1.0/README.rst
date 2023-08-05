.. include globals.rst

.. image:: https://travis-ci.org/JonnyFunFun/pytest-envfiles.svg?branch=master
    :target: https://travis-ci.org/JonnyFunFun/pytest-envfiles

pytest-envfiles
===============

pytest-envfiles is a py.test plugin that allows you to specify environment variable files that are to be parsed prior
to executing tests.  These files contain environment variables in a KEY=VALUE format.

Installation
------------

Use pip:

.. code:: shell

    pip install pytest-envfiles


Usage
-----

In your pytest.ini file add a key, `env_files` and the environment variable files as a line
separated list.  The listed files will be parsed prior to test execution

.. code:: shell

    [pytest]
    env_files =
        ./common.env
        ./tests.env
        /opt/secrets.env
