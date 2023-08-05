Vumi Go command line interface
==============================

A command line interface for `Vumi Go`_ HTTP APIs.

.. _Vumi Go: http://github.com/praekelt/vumi-go

|go-cli|_ |go-cli-cover|_

.. |go-cli| image:: https://travis-ci.org/praekelt/go-cli.png?branch=develop
.. _go-cli: https://travis-ci.org/praekelt/go-cli

.. |go-cli-cover| image:: https://coveralls.io/repos/praekelt/go-cli/badge.png?branch=develop
.. _go-cli-cover: https://coveralls.io/r/praekelt/go-cli


Installation
------------

Install with::

  $ pip install --user go-cli

Then run::

  $ go-cli --help

and read the usage instructions.


Sending messages
----------------

Run::

  $ go-cli send --help

to learn about the options available for sending.

Example message sending::

  $ go-cli --account 1edfdd412f253e9fc4975eb93c2c1e8c \
           send \
           --conversation a3aa791fab164dc894328564e2be5f16 \
           --token secret-token-you-entered \
           --csv messages.csv

Where `messages.csv` looks something like::

  to_addr,content
  +12345678,"Hello first person"
  +12345679,"Hello second person"


Exporting contacts
------------------

Run::

  $ go-cli export-contacts --help

to learn about the options available for downloading contacts.

Example contact exporting::

  $ go-cli --account 1edfdd412f253e9fc4975eb93c2c1e8c \
           export-contacts \
           --token secret-token-for-your-contacts-api \
           --csv contacts.csv

Where `contacts.csv` is the file you'd like to export the contacts to.

If contact exporting is interrupt by a network error, a message will be printed
explaining how to use `--resume` to continue it.



Reporting issues
----------------

You can contact the Vumi development team in the following ways:

* via *email* by joining the the `vumi-dev@googlegroups.com`_ mailing list
* on *irc* in *#vumi* on the `Freenode IRC network`_

.. _vumi-dev@googlegroups.com: https://groups.google.com/forum/?fromgroups#!forum/vumi-dev
.. _Freenode IRC network: https://webchat.freenode.net/?channels=#vumi

Issues can be filed in the GitHub issue tracker. Please don't use the issue
tracker for general support queries.
