from __future__ import absolute_import, unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.core import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

from .api import api_router


urlpatterns = [
    # Wagtail API.
    url(r'^api/v2/', api_router.urls),

    # Django default admin.
    url(r'^dj_default_admin/', admin.site.urls),

    # Wagtail admin, documents, and search.
    url(r'^admin/', include(wagtailadmin_urls)),
    url(r'^documents/', include(wagtaildocs_urls)),
    url(r'^site-search/', include('search.urls')),

    # Deployed docs API.
    url(r'^api/docs/', include('docs.urls')),

    # Feedback
    url(r'^api/feedback/', include('feedback.urls')),

    # Wagtail pages.
    url(r'^', include(wagtail_urls)),
]


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
