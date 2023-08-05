===================
django-crispy-admin
===================

.. image:: https://badge.fury.io/py/django-crispy-admin.png
    :target: https://badge.fury.io/py/django-crispy-admin

.. image:: https://travis-ci.org/feverup/django-crispy-admin.png?branch=master
    :target: https://travis-ci.org/feverup/django-crispy-admin

Django Crispy Admin allows you to edit your forms with django-crispy-admin

Documentation
-------------

The full documentation is at https://django-crispy-admin.readthedocs.org.

Quickstart
----------

Install django-crispy-admin::

    pip install django-crispy-admin

Then use it in a project::


    INSTALLED_APPS = [

        # Add this: 
        'crispy_admin',
        'crispy_admin.bootstrap3',

        # Before this one :)
        'django.contrib.admin',

    ]

Features
--------

* Crispy-forms renders the forms so you can use the nice layout improvements
* Both plain and bootstrap3 for now.




History
-------

0.0.6 (2015-10-15)
++++++++++++++++++

* Add django 1.8 template overrides
* Add Bootstrap3 namespace
* Add info in `make help` about reset-release
* Remove sortable inline static files
* Improve Makefile, add phony targets and reset-release target to cance

0.0.5 (2015-10-14)
++++++++++++++++++

* Fix setup.py typo
* Update README, remove cookiecutter info since it's already in git log
* Remove ununsed widgets
* Update environment tests
* Remove sortableInline

0.0.4 (2015-10-14)
++++++++++++++++++

* Test Makefile change for auto commit mesage

0.0.3 (2015-10-14)
++++++++++++++++++

* Fix linting
* Refactor Makefile and setup.cfg to ease flake8 linting
* Fix requirements in setup.py
* Add superpowers to Makefile
* Remove tests from django-admin-bootstrapped

0.0.2 (2015-10-13)
++++++++++++++++++

* Remove dynamic requirements in setup.py

0.0.1 (2015-10-13)
++++++++++++++++++

* Based on work from https://github.com/django-admin-bootstrapped/django-admin-bootstrapped
* Added support of layouted forms from crispy
* Added support of Layout helper for placing inlines
* Add configuration for tests in setup.py
* Add base files from https://github.com/pydanny/cookiecutter-djangopackage
* Add Draft for crispy inside admin


