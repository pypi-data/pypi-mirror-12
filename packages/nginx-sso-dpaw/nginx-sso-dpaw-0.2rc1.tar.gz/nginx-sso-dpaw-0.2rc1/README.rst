==============
DPaW Nginx SSO
==============

This project is a library of Nginx configuration to undertake single-sign-on
within `Department of Parks and Wildlife`_ internal applications.

Installation (Django applications)
==================================

#. Install via pip: ``pip install nginx-sso-dpaw``
#. At the end of settings.py, add the following code
    try:
        import nginx_sso.django
        nginx_sso.django.config(globals())
    except:
        pass


When nginx sso is disabled
==================================

#. nginx sso app is not installed
#. Set "SSO_ENABLED" to False in .env file
#. The middleware "django.contrib.auth.middleware.AuthenticationMiddleware" is not configured

.. _Department of Parks and Wildlife: http://www.dpaw.wa.gov.au
