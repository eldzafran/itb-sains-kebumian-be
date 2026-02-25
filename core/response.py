from rest_framework.response import Response
from django.utils.timezone import now


def success_response(data=None, message="Success", code=200):
    return Response({
        "status": "success",
        "code": code,
        "message": message,
        "data": data,
        "metadata": {
            "server_time": now(),
            "version": "v1.0"
        }
    }, status=code)