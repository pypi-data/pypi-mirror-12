*********************
django-taggit-helpers
*********************

``django-taggit-helpers`` makes it easier to work with admin pages of models associated with ``django-taggit`` tags.

Source code is available on GitHub at `mfcovington/django-taggit-helpers <https://github.com/mfcovington/django-taggit-helpers>`_. Information about ``django-taggit`` is available on `GitHub <https://github.com/alex/django-taggit>`_ and `Read the Docs <http://django-taggit.readthedocs.org/en/latest/index.html>`_.

``django-taggit-helpers`` is compatible with Python 2.7+/3.2+ and Django 1.7+.

.. contents:: :local:

Installation
============

**PyPI**

.. code-block:: sh

    pip install django-taggit-helpers

**GitHub**

.. code-block:: sh

    pip install https://github.com/mfcovington/django-taggit-helpers/releases/download/0.1.3/django-taggit-helpers-0.1.3.tar.gz

Configuration
=============

Add ``taggit_helpers`` to ``INSTALLED_APPS`` in ``settings.py``:

.. code-block:: python

    INSTALLED_APPS = (
        ...
        'taggit',
        'taggit_helpers',
    )

Helper Classes
==============

``TaggitCounter``
-----------------

Display (and sort by) number of Taggit tags associated with tagged items.

.. code-block:: python

    from taggit_helpers import TaggitCounter

    class MyModelAdmin(TaggitCounter, admin.ModelAdmin):    # TaggitCounter before ModelAdmin
        list_display = (
            ...
            'taggit_counter',
        )

*Note:* Currently, the ``TaggableManager()`` field must be named ``tags``.

*Note:* To avoid overcounting, set ``distinct=True`` if further annotating the queryset with ``Count()``:

.. code-block:: python

    queryset.annotate(m2m_field_count=Count('m2m_field', distinct=True))

``TaggitListFilter``
--------------------

Filter records by Taggit tags for the current model only.
Tags are sorted alphabetically by name.

.. code-block:: python

    from taggit_helpers import TaggitListFilter

    class MyModelAdmin(admin.ModelAdmin):
        list_filter = [TaggitListFilter]

``TaggitStackedInline``
-----------------------

Add stacked inline for Taggit tags to admin.
Tags are sorted alphabetically by name.

.. code-block:: python

    from taggit_helpers import TaggitStackedInline

    class MyModelAdmin(admin.ModelAdmin):
        inlines = [TaggitStackedInline]

``TaggitTabularInline``
-----------------------

Add tabular inline for Taggit tags to admin.
Tags are sorted alphabetically by name.

.. code-block:: python

    from taggit_helpers import TaggitTabularInline

    class MyModelAdmin(admin.ModelAdmin):
        inlines = [TaggitTabularInline]

Issues
======

If you experience any problems or would like to request a feature, please `create an issue <https://github.com/mfcovington/django-taggit-helpers/issues>`_ on GitHub.

*Version 0.1.3*


Revision history
================

0.1.3 2015-11-30

- Require Python 2.7+/3.2+
- Add slides from Django SF Meetup lightning talk


0.1.2 2015-06-14

- Add Django 1.8 compatibility


0.1.1 2015-06-11

- Rename ``taggit_count`` to ``taggit_counter``


0.1.0 2015-06-10

- Django admin helper classes for django-taggit tags

  - ``TaggitCounter``
  - ``TaggitListFilter``
  - ``TaggitStackedInline``
  - ``TaggitTabularInline``


