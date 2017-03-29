from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<setid>[0-9]+)(?P<mode>[0-9]+)$', views.index, name='index'),
]
