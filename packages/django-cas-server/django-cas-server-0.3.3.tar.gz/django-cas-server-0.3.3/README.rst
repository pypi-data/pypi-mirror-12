=====
CAS Server
=====

CAS Server is a Django app implementing the `CAS Protocol 3.0 Specification
<https://jasig.github.io/cas/development/protocol/CAS-Protocol-Specification.html>`_.

By defaut, the authentication process use django internal users but you can easily
use any sources (see auth classes in the auth.py file)

The differents parametters you can use in settings.py to tweak the application
are listed in default_settings.py

The defaut login/logout template use `django-bootstrap3 <https://github.com/dyve/django-bootstrap3>`_
but you can use your own templates using the CAS_LOGIN_TEMPLATE,
CAS_LOGGED_TEMPLATE, CAS_WARN_TEMPLATE and CAS_LOGOUT_TEMPLATEsetting variables.

Quick start
-----------

1. Add "cas_server" to your INSTALLED_APPS setting like this::

    INSTALLED_APPS = (
        ...
        'bootstrap3',
        'cas_server',
    )

   For internatinalization support, add "django.middleware.locale.LocaleMiddleware"
   to your MIDDLEWARE_CLASSES setting like this::

    MIDDLEWARE_CLASSES = (
        ...
        'django.middleware.locale.LocaleMiddleware',
        ...
    )

2. Include the polls URLconf in your project urls.py like this::

    url(r'^cas/', include('cas_server.urls', namespace="cas_server")),

3. Run `python manage.py migrate` to create the cas_server models.

4. Start the development server and visit http://127.0.0.1:8000/admin/
   to add a first service allowed to authenticate user agains the CAS
   (you'll need the Admin app enabled).

5. Visit http://127.0.0.1:8000/cas/ to login with your django users.
