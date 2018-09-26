from django.conf.urls import url

from feedback import views

urlpatterns = [
    url(r'^thumbs-up', views.GetFeedback.as_view()),
    url(r'^thumbs-down', views.GetFeedback.as_view())
]
