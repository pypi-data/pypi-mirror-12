Lending Club API

.. image:: https://travis-ci.org/bmorrise/pylc.svg?branch=master
    :target: https://travis-ci.org/bmorrise/pylc

.. image:: https://img.shields.io/pypi/v/pylc.svg
    :target: https://pypi.python.org/pypi/pylc

.. image:: https://img.shields.io/pypi/dm/pylc.svg
        :target: https://pypi.python.org/pypi/pylc

This project is intended for anyone who wants to interact with the Lending Club's API via Python. You can find the Lending Club API documentation here: https://www.lendingclub.com/developers/lc-api.action

Installation
------------
.. code-block:: python

  sudo pip install pylc

Usage
-----
.. code-block:: python

  from pylc import LendingClubAPI
  lc = LendingClubAPI('[LENDING_CLUB_API_KEY]', '[ACCOUNT_NUMBER]')
  summary = lc.account.summary()

Replace the [LENDING_CLUB_API_KEY] with a developer key from the Lending Club which can be generated here: https://www.lendingclub.com/account/profile.action

Replace the [ACCOUNT_NUMBER] with your account number from this page: https://www.lendingclub.com/account/summary.action. You'll see your account number displayed like this: **My Account #XXXXXXXX**