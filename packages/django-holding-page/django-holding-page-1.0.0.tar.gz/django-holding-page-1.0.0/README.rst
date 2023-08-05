Django Holding Page
===================

Available on `PyPI
<https://pypi.python.org/pypi/django-holding-page/>`_.

A viral holding page to collect email address with export and unsubscribe functionality. This project started as a solution to basic
problem of what to put on new domain names while development was occurring.

Tested versions
---------------

Python
~~~~~~

- Python 2.7.9
- Python 3.3.5
- Python 3.4.2
- Python 3.5.0

Django
~~~~~~

- Django 1.8

.. image:: https://travis-ci.org/danux/django-holding-page.svg?branch=master
    :target: https://travis-ci.org/danux/django-holding-page

Features
--------

- Users can provide their email address and name which is saved in to the database for future exports to systems such as Campaign Monitor.
- Each user is sent a viral code, which allows them to share your holding page with other people and build up points.
- Complete use of templates - configure the entire app to your own needs without touching the code

Usage
-----

Start up a Django project in the usual way and then ensure you have the requirements installed::

    pip install django-widget-tweaks==1.4.1

To run the tests on **Python 2.7** install mock too::

    pip install mock==1.3.0

Install django-holding-page pip::

    pip install django-holding-page

At the end of settings.py::

    INSTALLED_APPS += (
        'django.contrib.sites',
        'widget_tweaks',
        'holding_page.subscribers',
    )

At the end of urls.py::

    urlpatterns += patterns(
        url(r'', include('holding_page.subscribers.urls', namespace='subscriber',)),
    )

Remember to migrate::

    python manage.py migrate

Finally, don't forget to change Django's default Site at /admin/ so the emails work correctly.

Templates
---------

The following templates can be overwritten in your templates directory. See https://docs.djangoproject.com/en/1.8/ref/templates/api/#configuring-an-engine

Web pages
~~~~~~~~~

- base.html
- subscriber/subscribe_form.html
- subscriber/successful_unsubscribe.html
- subscriber/thank_you.html
- subscriber/unsubscribe_form.html

Emails
~~~~~~

- email/welcome_body.txt
- email/welcome_subject.txt

Development
-----------

To develop the holding page package itself::

    git clone git://github.com/danux/django-holding-page.git
    cd django-holding-page
    pip install -r requirements.txt
    ./manage.py test
    ./manage.py migrate

Development Roadmap/Ideas
-------------------------

- Auto-export to Campaign Monitor, Sales Force, etc
- "Reserve my username" feature
- Make it easy to integrate this as a beta holding pen for Django projects (i.e. issue beta invites to your subscribers)
- Anything else you fancy adding/suggesting
- Pull requests will be reviewed if you choose to share back.

History
-------

1.0.0
~~~~~

- First version.
