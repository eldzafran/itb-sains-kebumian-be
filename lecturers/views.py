from rest_framework import viewsets, filters
from rest_framework.pagination import PageNumberPagination
from .models import Lecturer, LecturerCategory
from .serializers import LecturerSerializer, LecturerCategorySerializer


class TenPagination(PageNumberPagination):
    page_size = 10


class LecturerViewSet(viewsets.ModelViewSet):
    queryset = Lecturer.objects.all().order_by("-created_at")
    serializer_class = LecturerSerializer
    pagination_class = TenPagination

    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "nip"]


class LecturerCategoryViewSet(viewsets.ModelViewSet):
    queryset = LecturerCategory.objects.all()
    serializer_class = LecturerCategorySerializer
