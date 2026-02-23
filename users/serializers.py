from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            user = User.objects.get(email=data["email"])
        except User.DoesNotExist:
            raise serializers.ValidationError("Email tidak terdaftar.")

        user = authenticate(
            username=user.username,
            password=data["password"]
        )

        if not user:
            raise serializers.ValidationError("Password salah.")

        if not user.is_active:
            raise serializers.ValidationError("User tidak aktif.")

        return user