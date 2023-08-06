================================
Django Mail Save
================================

Saves all emails sent to the database and can be viewed in django's admin interface.
Includes attachments and alternative email formats such as text/html.

Tests and more backends to follow. Also to follow is the abilit to resend emails, create new etc.

Installation
============
Installation with ``pip``::

    $ pip install django_mail_save


Setup
=====
Add the following apps to the ``INSTALLED_APPS``::

    INSTALLED_APPS = (
        ...
        'mail_save',
        ...
    )

Override the EMAIL_BACKEND in settings.py::

    EMAIL_BACKEND = 'mail_save.backends.smtp.EmailBackend'

Attachments are saved using django's FileField so be sure to setup your MEDIA_ROOT AND URLS

