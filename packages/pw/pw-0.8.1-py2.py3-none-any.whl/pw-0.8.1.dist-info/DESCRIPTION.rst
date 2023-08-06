pw |Build Status| |Latest Version| |Supported Python Versions|
==============================================================

``pw`` is a Python tool to search in a GPG-encrypted password database.

::

    Usage: pw [OPTIONS] [USER@][KEY] [USER]

      Search for USER and KEY in GPG-encrypted password file.

    Options:
      -C, --copy       Display account information, but copy password to clipboard (default mode).
      -E, --echo       Display account information as well as password in plaintext (alternative mode).
      -R, --raw        Only display password in plaintext (alternative mode).
      -S, --strict     Fail unless precisely a single result has been found.
      -U, --user       Copy or display username instead of password.
      -f, --file PATH  Path to password file.
      --edit           Launch editor to edit password database and exit.
      --gen            Generate a random password and exit.
      --version        Show the version and exit.
      --help           Show this message and exit.

Installation
------------

To install ``pw``, simply run:

.. code:: bash

    $ pip install pw

.. |Build Status| image:: https://travis-ci.org/catch22/pw.svg?branch=master
   :target: https://travis-ci.org/catch22/pw
.. |Latest Version| image:: https://img.shields.io/pypi/v/pw.svg
   :target: https://pypi.python.org/pypi/pw/
.. |Supported Python Versions| image:: https://img.shields.io/pypi/pyversions/pw.svg
   :target: https://pypi.python.org/pypi/pw/


