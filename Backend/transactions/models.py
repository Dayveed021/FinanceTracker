# transactions/models.py
from django.db import models
from django.contrib.auth.models import User

class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=10)
    category = models.CharField(max_length=50)
    date = models.DateField()
    description = models.TextField()
