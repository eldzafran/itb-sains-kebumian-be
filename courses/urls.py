from django.urls import path
from .views import (
    CourseListCreateAPIView,
    CourseMetadataView,
    CourseRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path('', CourseListCreateAPIView.as_view(), name='course-list-create'),
    path('<int:pk>/', CourseRetrieveUpdateDestroyAPIView.as_view(), name='course-detail'),
    path('metadata/', CourseMetadataView.as_view(), name='course-metadata'),
]