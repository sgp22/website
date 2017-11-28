from __future__ import absolute_import, unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin

from wagtail.wagtailadmin import urls as wagtailadmin_urls
from wagtail.wagtailcore import urls as wagtail_urls
from wagtail.wagtaildocs import urls as wagtaildocs_urls

from .api import api_router

from search import views as search_views


urlpatterns = [
    # Wagtail API.
    url(r'^<DJANGO_URL_PATH>api/v2/', api_router.urls),

    # Django default admin.
    url(r'^<DJANGO_URL_PATH>dj_default_admin/', include(admin.site.urls)),

    # Wagtail admin, documents, and search.
    url(r'^<DJANGO_URL_PATH>admin/', include(wagtailadmin_urls)),
    url(r'^<DJANGO_URL_PATH>documents/', include(wagtaildocs_urls)),
    url(r'^<DJANGO_URL_PATH>search/$', search_views.search, name='search'),

    # Deployed docs API.
    url(r'^<DJANGO_URL_PATH>api/docs/', include('docs.urls')),

    # Wagtail pages.
    url(r'^<DJANGO_URL_PATH>', include(wagtail_urls)),
]


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)