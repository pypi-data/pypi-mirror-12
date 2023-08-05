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
