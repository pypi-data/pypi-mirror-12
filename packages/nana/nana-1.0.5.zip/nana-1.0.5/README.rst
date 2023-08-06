****************
Welcome to Nana!
****************

.. image:: https://img.shields.io/pypi/v/nana.svg?style=flat-square
    :alt: Latest Version

.. image:: https://img.shields.io/pypi/dm/nana.svg?style=flat-square
    :alt: Downloads

.. image:: https://img.shields.io/pypi/l/nana.svg?style=flat-square
    :alt: License

----

.. image:: docs/images/Nana.jpg
    :align: center
    :alt: Nana the Dog

**Nana** keeps an eye on a directory and reacts when anything changes.


Usage
=====

Nana requires Python 2.6 or better (including 3).

Install Nana from PyPI::

    $ pip install nana

Tell Nana what to do when anything changes in the current directory::

    # Rebuild Sphinx docs on every change in the current directory:
    $ nana "sphinx-build -a docs/ docs/_build/html"
    ^.   .  ^

You can specify the directory to monitor with the ``-d`` option::

    # Rebuild Sphinx docs on every change in the "docs" directory:
    $ nana "sphinx-build -a docs/ docs/_build/html" -d docs
    ^.   .  ^

You can also tell Nana how many seconds she should wait between the checks with the ``-t`` option::

    # Check the current directory once a minute:
    $ nana "echo Updated!" -t 60
    ^.   .  ^

By default, Nana checks the directory every second.

To quit Nana, press ``Ctrl+C``::

    --- Ruff-Ruff! ---


Contribute
==========

`Report a bug <https://bitbucket.org/moigagoo/nana/issues/new>`__

`Fork and improve <https://bitbucket.org/moigagoo/nana/fork>`__