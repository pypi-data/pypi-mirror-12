=====================
django-unihandecodejs
=====================

A Django app that simply provides unihandecode.js (https://github.com/ojii/unihandecode.js) out of box to be used along side with Django CMS.

Installation
============

To get started using ``django-unihandecodejs``:

- install it with ``pip``::

    $ pip install django-unihandecodejs

- add the app to ``INSTALLED_APPS``::

    INSTALLED_APPS = (
        ...
        'unihandecodejs',
        ...
    )

Usage
=====

This app does nothing excepts injecting unihandecode.js as static files into your Django project. No specific usage is needed.

Most people just need unihandecode.js for their Django CMS project as they have East Asian languages on their sites. Due to licence issue, unihandecode.js isn't included in Django CMS. You have to download and throw the codes of unihandecode.js into your project's static file folder, which becomes a tedious step of each Django CMS site's setup phase. That's why this app is created: a simple pip install to replace download and copy.

Since this app is mainly used for Django CMS project, please refer to http://docs.django-cms.org/en/latest/reference/configuration.html#unicode-support-for-automated-slugs for configuration. For the impatient, just add the below lines into your settings.py::

	CMS_UNIHANDECODE_HOST = '%sunihandecodejs/' % STATIC_URL

	CMS_UNIHANDECODE_VERSION = '1.0.0'

	CMS_UNIHANDECODE_DECODERS = ['zh'] #Change to your desired language list
