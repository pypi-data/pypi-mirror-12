![Logo](http://andyfangdz.github.io/django-asyncmailer/logo.png)

[![Build Status](https://travis-ci.org/andyfangdz/django-asyncmailer.svg?branch=master)](https://travis-ci.org/andyfangdz/django-asyncmailer)[![Coverage Status](https://coveralls.io/repos/andyfangdz/django-asyncmailer/badge.svg)](https://coveralls.io/r/andyfangdz/django-asyncmailer)[![PyPI version](https://badge.fury.io/py/django-asyncmailer.svg)](http://badge.fury.io/py/django-asyncmailer)[![PyPI Daily Download](https://img.shields.io/pypi/dd/django-asyncmailer.svg)](https://pypi.python.org/pypi/django-asyncmailer)[![PyPI Weekly Download](https://img.shields.io/pypi/dw/django-asyncmailer.svg)](https://pypi.python.org/pypi/django-asyncmailer)[![PyPI Monthly Download](https://img.shields.io/pypi/dm/django-asyncmailer.svg)](https://pypi.python.org/pypi/django-asyncmailer)
- Asynchronous email sending with celery
- Manage multiple SMTP credentials(providers)
- Easily add blacklist(unreachable) of email servers to providers
- Configure Monthly or Daily quota of providers
- Set preferences for providers
- A built-in responsive email template
- When sending, a random provider from a list of providers that is enabled, whose blacklist does not contain the server of the address sending to, whose quota is not exceeded, and with the highest preference will be selected.

# Install
```
pip install django_asyncmailer
```
Note that django-asyncmailer only works on django > 1.7 due to the use of ```html_message```

# Quick start
- Add ```asyncmailer``` to ```INSTALLED_APPS```
- Add the following lines to ```$project/$project/__init__.py``` to enable ```shared_tasks``` in ```celery``` 
```
from __future__ import absolute_import
from .celery import app as celery_app
```
- Configure celery (Be sure to use ```autodiscover_tasks```)
- Set email backend ```EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'```
- Do migration/syncdb
- Start celery
- Start celery beat
- Add SMTP credentials in django admin

# Usage
```python
from asyncmailer.tasks import async_mail

async_mail([user.email], # Email (delay no longer required)
  "New Activity on Your Account", # Subject
  context_dict={ # Optional, if supplied, the templated will be rendered before sending
  "message": "Hello! \n Someone gave you a comment today! \n \"%s\"" % c.content,
  "button_text": "View",
  "button_url": "http://www.example.com/login/?token=%s&next=/notifications/" % t.token
  },
  template='email.html', # Optional, you can specify the template for email via this parameter. 
                         # If not supplied, a default template will be used.
  template_plaintext='email_pt.html' # Optional, the plaintext alternative of template.
  # It is important to note that if you specify the template but not the plaintext template, 
  # the default plaintext template will still be used, and vise versa.
)

```




