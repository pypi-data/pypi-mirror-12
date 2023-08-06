============
Aldryn Style
============

Aldryn Style provides a plugin that wraps other plugins in CSS styling, by placing a class name on a containing 
element.

------------
Installation
------------

This plugin requires `django CMS` 2.4 or higher to be properly installed.

* Within your ``virtualenv`` run ``pip install aldryn-style``
* Add ``'aldryn_style'`` to your ``INSTALLED_APPS`` setting.
* Run ``manage.py migrate aldryn_style``.

-----
Usage
-----

You can define styles in your settings.py::

    _ = lambda s: s
    ALDRYN_STYLE_CLASS_NAMES = (
        ('info', _('info')),
        ('new', _('new')),
        ('hint', _('hint')),
    )

After that you can place other plugins inside this style plugin.
It will create a div with a class that was prior selected around this plugin.

------------
Translations
------------

If you want to help translate the plugin please do it on transifex:

https://www.transifex.com/projects/p/django-cms/resource/aldryn-style/
