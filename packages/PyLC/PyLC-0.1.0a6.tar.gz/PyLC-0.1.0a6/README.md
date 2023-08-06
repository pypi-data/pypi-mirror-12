#Lending Club API
[![Build Status](https://travis-ci.org/bmorrise/pylc.svg?branch=master)](https://travis-ci.org/bmorrise/pylc)

This project is intended for anyone who wants to interact with the Lending Club's API via Python. You can find the Lending Club API documentation here: https://www.lendingclub.com/developers/lc-api.action

###Installation
```
sudo pip install pylc
```

###Usage
```python
from pylc import LendingClubAPI
lc = LendingClubAPI('[LENDING_CLUB_API_KEY]', '[ACCOUNT_NUMBER]')
summary = lc.account.summary()
```
Replace the **[LENDING_CLUB_API_KEY]** with a developer key from the Lending Club which can be generated here: https://www.lendingclub.com/account/profile.action

Replace the **[ACCOUNT_NUMBER]** with your account number from this page: https://www.lendingclub.com/account/summary.action. You'll see your account number displayed like this: **My Account #XXXXXXXX**
