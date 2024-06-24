# transactions/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Transaction
from .serializers import TransactionSerializer
from rest_framework.permissions import IsAuthenticated

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def transaction_list_create(request):
    if request.method == 'GET':
        transactions = Transaction.objects.filter(user=request.user)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def transaction_detail(request, pk):
    try:
        transaction = Transaction.objects.get(pk=pk, user=request.user)
    except Transaction.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TransactionSerializer(transaction)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        serializer = TransactionSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        transaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
