Django-sticky-files
===================

An application that solves a problem, when you need to save
form's file field values between page reloads
(including form validation errors).


Currently in development.

Installation
------------

Install an application::

    pip install django-sticky-files


Then add ``sticky_files`` to ``INSTALLED_APPS``.

Include urls::

    url(r'^sticky-images/', include('sticky_files.urls', namespace='sticky_files')),


Usage
-----

There are four model fields that implement sticky files behaviour::


    from sticky_files import fields

    class SomeModel(models.Model):
        main_image = fields.StickyImageField(related_name='+')
        images = fields.ManyStickyImageField(
            max_objects=4,
            related_name='galleries_images',
        )
        file = fields.StickyFileField(related_name='+')
        files = fields.ManyStickyFileField(
            max_objects=4,
            related_name='galleries_files',
        )


It looks like this:

.. image:: https://github.com/asyncee/django-sticky-files/raw/master/screenshots/intro.png
    :target: https://github.com/asyncee/django-sticky-files/raw/master/screenshots/intro.png


Project is in development, so there are no documentation and tests **yet**.
