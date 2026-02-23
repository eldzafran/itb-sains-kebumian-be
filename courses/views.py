from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Course
from .serializers import CourseSerializer


def api_response(status_code, message, success, data):
    return Response({
        "status": status_code,
        "message": message,
        "success": success,
        "data": data
    }, status=status_code)


# =====================================
# LIST + CREATE
# =====================================
class CourseListCreateAPIView(APIView):

    def get(self, request):
        try:
            courses = Course.objects.all().order_by("course_name")
            serializer = CourseSerializer(courses, many=True)

            return api_response(
                200,
                "Courses retrieved successfully",
                True,
                serializer.data
            )

        except Exception as e:
            return api_response(
                500,
                "Internal server error",
                False,
                str(e)
            )

    def post(self, request):
        try:
            serializer = CourseSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()

                return api_response(
                    201,
                    "Course created successfully",
                    True,
                    serializer.data
                )

            return api_response(
                400,
                "Validation error",
                False,
                serializer.errors
            )

        except Exception as e:
            return api_response(
                500,
                "Internal server error",
                False,
                str(e)
            )


# =====================================
# DETAIL + UPDATE + DELETE
# =====================================
class CourseRetrieveUpdateDestroyAPIView(APIView):

    def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            return None

    def get(self, request, pk):
        course = self.get_object(pk)

        if not course:
            return api_response(
                404,
                "Course not found",
                False,
                None
            )

        serializer = CourseSerializer(course)

        return api_response(
            200,
            "Course retrieved successfully",
            True,
            serializer.data
        )

    def put(self, request, pk):
        course = self.get_object(pk)

        if not course:
            return api_response(
                404,
                "Course not found",
                False,
                None
            )

        try:
            serializer = CourseSerializer(course, data=request.data)

            if serializer.is_valid():
                serializer.save()

                return api_response(
                    200,
                    "Course updated successfully",
                    True,
                    serializer.data
                )

            return api_response(
                400,
                "Validation error",
                False,
                serializer.errors
            )

        except Exception as e:
            return api_response(
                500,
                "Internal server error",
                False,
                str(e)
            )

    def delete(self, request, pk):
        course = self.get_object(pk)

        if not course:
            return api_response(
                404,
                "Course not found",
                False,
                None
            )

        try:
            course.delete()

            return api_response(
                200,
                "Course deleted successfully",
                True,
                None
            )

        except Exception as e:
            return api_response(
                500,
                "Internal server error",
                False,
                str(e)
            )