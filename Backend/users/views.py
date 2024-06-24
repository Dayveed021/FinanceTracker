from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

@api_view(['POST'])
def login(request):
    user= get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"token":token.key, "user": serializer.data})

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data= request.data)
    if serializer.is_valid():
        serializer.save()
        user= User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token":token.key, "user": serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response({"passed for {}".format(request.user.email)})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request, pk):
    user = get_object_or_404(User, pk=pk)

    # Check if the user performing the request is the same as the user being updated
    if request.user != user:
        return Response({"detail": "You do not have permission to perform this action."},
                        status=status.HTTP_403_FORBIDDEN)

    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, pk):
    user = get_object_or_404(User, pk=pk)

    # Check if the user performing the request is the same as the user being deleted
    if request.user != user:
        return Response({"detail": "You do not have permission to perform this action."},
                        status=status.HTTP_403_FORBIDDEN)

    user.delete()
    return Response({"detail": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
