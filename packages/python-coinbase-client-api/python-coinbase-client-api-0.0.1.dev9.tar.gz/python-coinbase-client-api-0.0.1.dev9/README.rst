*********************************************************************
python-coinbase-client-api: Coinbase client API for python developers
*********************************************************************

This package is created to provide Coinbase client API access for python developers and their software. It includes Exchange API, Merchant API and Wallet API.

|pypi| |coverage|

============
Installation
============


A **universal installation method** (that works on **Windows**, Mac OS X, Linux, …,
and provides the latest version) is to use `pip`_:


.. code-block:: bash

    # Make sure we have an up-to-date version of pip and setuptools:

    $ pip install --upgrade pip setuptools

    $ pip install --upgrade python-coinbase-client-api

-------------------
Development version
-------------------

The **latest development version** can be installed directly from GitHub:

.. code-block:: bash

    # Universal

    $ pip install --upgrade https://bitbucket.org/bixority/python-coinbase-client-api.git

======
Config
======

python-coinbase-client-api uses settings config file written in Python with
the following variables:

=======================     =================================================
``EXCHANGE_API_KEY``          Get this in Coinbase Exchange control panel.

``EXCHANGE_SECRET_KEY``       Get this in Coinbase Exchange control panel.

``EXCHANGE_PASSPHRASE``       Get this in Coinbase Exchange control panel.
=======================     =================================================

Library settings should be provided as an environment variable which contains python module with configuration
variables.

.. code-block:: bash
    $ COINBASE_CONFIG="settings" python example.py

--------
Examples
--------

Settings file:

.. code-block:: python

    EXCHANGE_API_KEY='exampleApiKey'

    EXCHANGE_SECRET_KEY='exampleSecretKey'

    EXCHANGE_PASSPHRASE='examplePassphrase'

Example python code:

.. code-block:: python

    from coinbase.exchange.private import Accounts

    result = Accounts.get_list()

=======
Authors
=======


`Oleg Korsak`_ created python-coinbase-client-api and `these fine people`_ have contributed.


==========
Contribute
==========

Please see `CONTRIBUTING <https://bitbucket.org/bixority/python-coinbase-client-api/src/master/CONTRIBUTING.rst>`_.


==========
Change Log
==========

Please see `CHANGELOG <https://bitbucket.org/bixority/python-coinbase-client-api/src/master/CHANGELOG.rst>`_.


=======
Licence
=======

Please see `LICENSE <https://bitbucket.org/bixority/python-coinbase-client-api/raw/master/LICENSE.txt>`_.



.. _Requests: http://python-requests.org
.. _pip: http://www.pip-installer.org/en/latest/index.html
.. _these fine people: https://bitbucket.org/bixority/python-coinbase-client-api/src/master/AUTHORS.rst
.. _Oleg Korsak: https://google.com/+OlegKorsak

.. |pypi| image:: https://img.shields.io/pypi/v/python-coinbase-client-api.svg?style=flat-square&label=latest%20version
    :target: https://pypi.python.org/pypi/python-coinbase-client-api
    :alt: Latest version released on PyPi

.. |coverage| image:: https://coveralls.io/repos/bixority/python-coinbase-client-api/badge.svg?branch=master&service=bitbucket
    :target: https://coveralls.io/bitbucket/bixority/python-coinbase-client-api?branch=master
    :alt: Test coverage
