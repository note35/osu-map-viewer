from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<name>[A-Za-z0-9]+)$', views.index, name='index'),
]
