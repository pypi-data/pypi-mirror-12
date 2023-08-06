=====
djangoapps-lunch
=====

a simple web app build with django

Quick start
-----------

1. Add "bases......" to your INSTALLED_APPS setting like this::

    INSTALLED_APPS = (
        ...
    'bases',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',
    'allauth',
    'allauth.account',
    'rest_auth.registration',
    'usercenter',
    'lunchapp',
    )

2. Add " LOGIN_URL='/usercenter/login/' " to your INSTALLED_APPS setting like this::

3. Include the polls URLconf in your project urls.py like this::

    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^usercenter/', include('usercenter.urls')),
    url(r'^account/',include('allauth.urls')),
    url(r'lunch/',include('lunchapp.urls'))

4. Run `python manage.py migrate` to create the polls models.

5. Visit http://127.0.0.1:8000/lunch/ to user the app.