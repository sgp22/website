from django.conf.urls import url

from .views import (
    search,
    ElasticSearchView
)


urlpatterns = [
    # Legacy search view.
    # Probably powering something on the frontend,
    # needs to be merged into the main view below.
    url(r'^$', search, name='site-search'),

    url(r'^es/$', ElasticSearchView.as_view(), name='elastic_search'),
]
