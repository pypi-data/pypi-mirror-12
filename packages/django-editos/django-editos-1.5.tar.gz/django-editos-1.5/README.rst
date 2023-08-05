django-editos
=============

|Build status|

Django app to manage and display editos

Requires
--------

**1.5**

- Django >= 1.8

**<= 1.4.1**

- Django >= 1.6 <= 1.8

Install
-------

Using PyPI

.. code-block:: text

    pip install django-editos

From source

.. code-block:: text

    python setup.py install

Testing
-------

Preparing test env

.. code-block:: text

    virtualenv ./virtualenv
    source virtualenv/bin/activate
    pip install django>=1.8

Runing unit tests

.. code-block:: text

    python setup.py test

Configuring
-----------

Add ``geelweb.django.editos`` to ``INSTALLED_APPS`` in your settings.

Create the db with ``python manage.py migrate editos``

Load the editos tags in your templates with ``{% load editos %}``

Edito model
-----------

Fields
^^^^^^

``editos.models.Edito`` object have the following fields

**title**

Required. 100 characters or fewer.

**link**

Required. Url to redirect

**button_label**

Optional. 20 characters or fewer.

**image**

Required. Uploaded image.

**text_content**

Required. 400 characters or fewer.

**display_from**

Required. A date field to represent the date from which the item is active.

**display_until**

Required. A date field to represent the date by which the item is active.

**active**

Optional. Default to True. Define if the item is active.

**text_theme**

Required. A theme to apply to the item in the template rendering. Can be "light" or "dark". text_theme field use EDITOS_THEMES_ and EDITOS_DEFAULT_THEME_ settings.

Template tags
-------------

**editos**

Render the editos. Example

.. code-block:: text

    {% editos path/to/a/template.html %}

The first argument is the path to a template to use to render the editos. If
omited the default ``editos/carousel.html`` template is used.

Templates
---------

**editos/carousel.html**

The default template. Render a `Bootstrap 3 Carousel <http://getbootstrap.com/javascript/#carousel>`_

Write custom templates
----------------------

The editos will be assign to the template in the ``editos`` variable. Example

.. code-block:: text

    {% for edito in editos %}
      {{ edito.title }}
    {% endfor %}

Settings
--------

.. _EDITOS_THEMES:

**EDITOS_THEMES**

Default

.. code-block:: text

    (
    ('light', 'Light'),
    ('dark', 'Dark'),
    )

A tuple of (value, label) choices

.. _EDITOS_DEFAULT_THEME:

**EDITOS_DEFAULT_THEME**

Default: "light"

The default theme to use

**EDITOS_HELP_TEXTS**

Default: {}

This sets the mapping of help text to model field. Example

.. code-block:: text

    EDITOS_HELP_TEXTS = {
        'image': '150 x 300px',
    }

License
-------

django-editos is released under MIT License. See LICENSE.txt file for details.

.. |Build status| image:: https://travis-ci.org/geelweb/django-editos.svg?branch=master
