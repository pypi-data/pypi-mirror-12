===
ERP
===

ERP is resource planning system. This is very early version not for using.

Package is being developed in general for modeling and expected to be used
as advanced task management solution at the current stage.

First beta will roll out late july 2016 and will contain all to work with
enterprise material and technical base. After beta release work over finance
component would be done.

Detailed documentation would appear in the "docs" directory with beta release.

***********
Quick start
***********

1. Add package apps to your INSTALLED_APPS setting like this::

    INSTALLED_APPS = (
        ...
        'rest_framework',
        'erp.base.directory',
        'erp.base.planning',
        'erp.base.enterprise',
        'erp.base.article',
        'erp.base.storage',
        ...
    )

2. Include package URLconf in your project urls.py like this::

    url(r'^pm/', include('erp.base.planning.urls')),
    url(r'^structure/', include('erp.base.enterprise.urls')),
    url(r'^directory/', include('erp.base.directory.urls')),
    url(r'^storage/', include('erp.base.storage.urls')),
    url(r'^faq/', include('erp.base.article.urls')),
    url(r'^goods/', include('erp.base.trading.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

3. Add custom auth app to your project settings.py like this::

    from erp.base import enterprise
    AUTH_USER_MODEL = 'enterprise.CorpUser'

4. Process "makemigrations" and "migrate" to create models.

5. Visit http://127.0.0.1:8000/ to get started.

6. Forgive me ^_^

7. Visit Home Page and get involved!