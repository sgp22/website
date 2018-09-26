from django.conf.urls import url

from feedback import views

urlpatterns = [
    url(r'^thumbs-up', views.FeedbackThumbsUp.as_view()),
    url(r'^thumbs-down', views.FeedbackThumbsDown.as_view())
]
