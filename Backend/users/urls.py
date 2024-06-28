from django.urls import re_path
from . import views

urlpatterns = [
    re_path('login', views.login),
    re_path('signup', views.signup),
    re_path('test_token', views.test_token),
    re_path('getallusers', views.get_all_users),
    re_path(r'^update/(?P<pk>\d+)$', views.update_user, name='update-user'),
    re_path(r'^delete/(?P<pk>\d+)$', views.delete_user, name='delete-user'),
]
