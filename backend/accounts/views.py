from rest_framework import generics
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer

User = get_user_model()

class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

# login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = getattr(user, "profile", None)
        return Response({
            "username": user.username,
            "email": user.email,
            "contact_number": profile.contact_number if profile else "",
            "address": profile.address if profile else "",
            "profile_picture": request.build_absolute_uri(profile.profile_picture.url) if profile and profile.profile_picture else "",
        })
