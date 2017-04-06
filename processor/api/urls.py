from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^error404$', views.handle404, name="error404"),
    url(r'^map/(?P<setid>[0-9]+)/(?P<mode>[0-9]+)$', views.MapSetAPI.as_view(), name="map"),
    url(r'^map/(?P<setid>[0-9]+)/(?P<mode>[0-9]+)/(?P<update>[0-9]+)$', views.MapSetAPI.as_view(), name="map"),
    url(r'^user/(?P<name>[A-Za-z0-9]+)$', views.UserAPI.as_view(), name="user"),
]

urlpatterns = format_suffix_patterns(urlpatterns)
