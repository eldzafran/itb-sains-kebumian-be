from rest_framework import viewsets
from .models import Lecturer, LecturerCategory, LecturerCourse
from .serializers import (
    LecturerSerializer,
    LecturerCategorySerializer,
    LecturerCourseSerializer
)


class LecturerCategoryViewSet(viewsets.ModelViewSet):
    queryset = LecturerCategory.objects.all()
    serializer_class = LecturerCategorySerializer


class LecturerViewSet(viewsets.ModelViewSet):
    queryset = Lecturer.objects.all()
    serializer_class = LecturerSerializer


class LecturerCourseViewSet(viewsets.ModelViewSet):
    queryset = LecturerCourse.objects.all()
    serializer_class = LecturerCourseSerializer
