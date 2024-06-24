# transactions/urls.py

from django.urls import path
from .views import transaction_list_create, transaction_detail

urlpatterns = [
    path('', transaction_list_create, name='transaction-list-create'),
    path('<int:pk>/', transaction_detail, name='transaction-detail'),
]
