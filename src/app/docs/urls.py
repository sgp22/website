from django.conf.urls import url

from docs import views

urlpatterns = [
    url(r'^.*$', views.GetCreateDocs.as_view())
]