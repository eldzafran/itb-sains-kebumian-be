from rest_framework.views import exception_handler
from rest_framework.response import Response
from django.utils.timezone import now


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is None:
        return Response({
            "status": "error",
            "code": 500,
            "message": "Internal Server Error",
            "error_details": {
                "issue": str(exc),
            }
        }, status=500)

    # VALIDATION ERROR
    if response.status_code == 400:
        errors = []
        for field, messages in response.data.items():
            if isinstance(messages, list):
                for message in messages:
                    errors.append({
                        "field": field,
                        "message": message
                    })
            else:
                errors.append({
                    "field": field,
                    "message": messages
                })

        return Response({
            "status": "fail",
            "code": 400,
            "message": "Validation failed",
            "errors": errors
        }, status=400)

    # OTHER ERROR
    return Response({
        "status": "error",
        "code": response.status_code,
        "message": response.data.get("detail", "Error occurred"),
        "error_details": response.data
    }, status=response.status_code)