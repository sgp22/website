from django.conf.urls import url

from docs import views

urlpatterns = [
    url(r'^$', views.CreateDocs.as_view()),
]