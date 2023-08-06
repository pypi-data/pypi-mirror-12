
===================
Leonardo Cookie Law
===================

leonardo-cookie-law integrates django-cookie-law helps to your Leonardo project comply with the EU cookie regulations. by displaying a cookie information banner until it is dismissed by the user.

.. contents::
    :local:

Installation
------------

.. code-block:: bash

    pip install leonardo_cookie_law

or as leonardo bundle

.. code-block:: bash

    pip install django-leonardo["cookielaw"]

Collect assets

.. code-block:: bash

	python manage.py collectstatic --noinput


Configuration
-------------

If you want to use our default template, add ``cookielaw/css/cookielaw.css`` to the markup and you should see the cookie law banner at the top of the page until you dismiss it with the button in the top-right. This CSS is Twitter Bootstrap compatible, but chances are, you'll like to adjust it anyway.

To change the markup, just add a template named ``cookielaw/banner.html`` and make sure it is loaded before the default template (for example put the django.template.loaders.filesystem.Loader before django.template.loaders.app_directories.Loader and add your new template to any of the TEMPLATE_DIRS).

To change the CSS, just write your own rules and don't include the default stylesheet.

Read More
---------

* https://github.com/TyMaszWeb/django-cookie-law