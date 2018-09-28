from django.conf.urls import url

from feedback import views

urlpatterns = [
    url(r'^thumbs/$', views.FeedbackThumbs.as_view()),
]
