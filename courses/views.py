from rest_framework import generics
from .models import Course
from .serializers import CourseSerializer


class CourseListCreateAPIView(generics.ListCreateAPIView):
    queryset = Course.objects.all().order_by("course_name")
    serializer_class = CourseSerializer


class CourseRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer