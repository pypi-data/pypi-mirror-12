.. highlight:: bash

****************
Welcome to Nana!
****************

.. image:: https://img.shields.io/pypi/v/nana.svg?style=flat-square
    :alt: Latest Version

.. image:: https://img.shields.io/pypi/dm/nana.svg?style=flat-square
    :alt: Downloads

.. image:: https://img.shields.io/pypi/l/nana.svg?style=flat-square
    :alt: License

**Nana** keeps an eye on a directory and reacts when anything changes.

`Read the docs → <http://nana.rtfd.org>`__

Quickstart
==========

You need Python 3.5 or better to install Nana.

Install nana from PyPI::

    $ pip install nana

Tell Nana where to watch and what to do::

    # Rebuild Sphinx docs on every change in the "docs" directory:
    $ nana "sphinx-build -a docs/ docs/_build/html" -d docs
    ^.   .  ^

The ``--directory`` param is optional, by default Nana monitors the current directory::

    # Print "Updated!" on every change in the current directory:
    $ nana "echo Updated!"

To quit, press ``Ctrl+C``::

    --- Ruff-Ruff! ---


Contribute
==========

`Report a bug <https://bitbucket.org/moigagoo/nana/issues/new>`__

`Fork and improve <https://bitbucket.org/moigagoo/nana/fork>`__


