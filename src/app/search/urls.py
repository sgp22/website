from django.conf.urls import url

from .views import search, ElasticSearchView


urlpatterns = [
    url(r'^$', search, name='search'),
    url(r'^es/(?P<index>[a-z]+)/$', ElasticSearchView.as_view(), name='elastic_search'),
]
