sdist_check
===========

|bdg-build| | `sources <https://github.com/ulif/sdist_check>`_ | `issues <https://github.com/ulif/sdist_check/issues>`_

.. |bdg-build| image:: https://travis-ci.org/ulif/sdist_check.svg
    :target: https://travis-ci.org/ulif/sdist_check

`setuptools`_ plugin providing a new command ``sdist_check``. It is
run like any other regular `setuptools`_ command::

  $ python setup.py sdist_check
  running sdist_check

and does some additional checks compared to the `setuptools`_ built-in
command ``check``. For instance it scans distributions built with
``sdist`` for files you most probably do not want to be part of the
distribution.

A list of all supported options of the `sdist_check` command can be
retrieved like this::

  $ python setup.py sdist_check --help
  Common commands: (see '--help-commands' for more)
  
    setup.py build      will build the package underneath 'build/'
    setup.py install    will install the package
  
    ...
  
  Options for 'sdist_check' command:
    --metadata (-m)          Verify meta-data
    --restructuredtext (-r)  Checks if long string meta-data syntax are
                             reStructuredText-compliant
    --strict (-s)            Will exit with an error if a check fails
    --badfiles (-b)          Check files included in dist for unusual names
  
  ...

The `badfiles` option is a list of filename patterns which are
considered as non-wanted in distributions. By default, we look for
files named like ``"*~"``.

.. _setuptools: https://bitbucket.org/pypa/setuptools
