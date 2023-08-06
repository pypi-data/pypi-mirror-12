Pinax Notifications
===================
.. image:: http://slack.pinaxproject.com/badge.svg
   :target: http://slack.pinaxproject.com/

.. image:: https://readthedocs.org/projects/pinax-notifications/badge/?version=latest
    :target: https://pinax-notifications.readthedocs.org/

.. image:: https://img.shields.io/travis/pinax/pinax-notifications.svg
    :target: https://travis-ci.org/pinax/pinax-notifications

.. image:: https://img.shields.io/coveralls/pinax/pinax-notifications.svg
    :target: https://coveralls.io/r/pinax/pinax-notifications

.. image:: https://img.shields.io/pypi/dm/pinax-notifications.svg
    :target:  https://pypi.python.org/pypi/pinax-notifications/

.. image:: https://img.shields.io/pypi/v/pinax-notifications.svg
    :target:  https://pypi.python.org/pypi/pinax-notifications/

.. image:: https://img.shields.io/badge/license-MIT-blue.svg
    :target:  https://pypi.python.org/pypi/pinax-notifications/
    

Pinax
------

Pinax is an open-source platform built on the Django Web Framework. It is an ecosystem of reusable Django apps, themes, and starter project templates. 
This collection can be found at http://pinaxproject.com.

This app was developed as part of the Pinax ecosystem but is just a Django app and can be used independently of other Pinax apps.


pinax-notifications
--------------------

``pinax-notifications`` is a user notification management app for the Django web framework. 
Many sites need to notify users when certain events have occurred and to allow
configurable options as to how those notifications are to be received.


Features
---------

The project aims to provide a Django app for this sort of functionality. This
includes:

* Submission of notification messages by other apps
* Notification messages on signing in
* Notification messages via email (configurable by user)
* Ability to supply your own backends notification channels


History
---------
This app was originally named `django-notification` but was renamed to
bring a common package name like `notification` under the `pinax` namespace
to avoid conflicts with other like named packages.

In addition, we wanted to take the opportunity to rename it to the plural
form, `notifications` to be in line with the convention we've adopted
across the ecosystem.


Running the Tests
------------------------------------

::

    $ pip install detox
    $ detox


Documentation
--------------

The pinax-notifications documentation is available at https://pinax-notifications.readthedocs.org/en/latest/. The Pinax documentation is available at http://pinaxproject.com/pinax/. If you would like to help us improve our documentation or write more documentation, please join our Pinax Project Slack channel and let us know!


Code of Conduct
-----------------

In order to foster a kind, inclusive, and harassment-free community, the Pinax Project has a code of conduct, which can be found here  http://pinaxproject.com/pinax/code_of_conduct/.


Pinax Project Blog and Twitter
-------------------------------

For updates and news regarding the Pinax Project, please follow us on Twitter at @pinaxproject and check out our blog http://blog.pinaxproject.com.


