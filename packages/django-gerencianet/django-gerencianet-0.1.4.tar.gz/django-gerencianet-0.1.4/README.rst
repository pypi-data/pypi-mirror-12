=====
Gerencianet
=====

Gerencianet is a simple Django app to make the integration with the GerenciaNet payment Gateway.

Quick start
-----------

1. Add "gerencianet" to your INSTALLED_APPS setting like this::

    INSTALLED_APPS = (
        ...
        'gerencianet',
    )

2. Include the base gerencianet URLconf in your project urls.py like this::

    url(r'^gerencianet/', include('gerencianet.urls')),

3. Run `python manage.py migrate` to create the gerencianet models.
OBS. If you get some errors like "gerencianet_paymentlog already exists", try to fake the initial migration for the model. Ex: python manage.py migrate gerencianet --fake-initial

