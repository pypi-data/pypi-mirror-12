==============
DPaW Nginx SSO
==============

This project is a library of Nginx configuration to undertake single-sign-on
within `Department of Parks and Wildlife`_ internal applications.

Installation (Django applications)
==================================

#. Install via pip: ``pip install nginx-sso-dpaw``
#. Add ``'nginx_sso_dpaw'`` to ``INSTALLED_APPS``
#. Add ``nginx_sso_dpaw.middleware.NginxAuthMiddleware`` after or (replace)
   ``'django.contrib.auth.middleware.AuthenticationMiddleware'`` to
   ``MIDDLEWARE_CLASSES``
#. Add ``'nginx_sso_dpaw.backends.NginxAuthBackend'`` to ``AUTHENTICATION_BACKENDS``

.. _Department of Parks and Wildlife: http://www.dpaw.wa.gov.au
