from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from articles.models import Article
from courses.models import Course
from lecturers.models import Lecturer

from .serializers import DashboardOverviewSerializer


class DashboardOverviewAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        total_articles = Article.objects.count()
        total_published_articles = Article.objects.filter(
            status="Published"
        ).count()

        latest_articles = Article.objects.order_by("-created_at")[:5].values(
            "id", "title", "slug", "status", "created_at"
        )

        total_courses = Course.objects.count()

        latest_courses = Course.objects.order_by("-created_at")[:5].values(
            "id", "course_name", "course_code", "created_at"
        )

        total_lecturers = Lecturer.objects.count()
        total_active_lecturers = Lecturer.objects.filter(
            is_active=True
        ).count()

        latest_lecturers = Lecturer.objects.order_by("-created_at")[:5].values(
            "id", "name", "nip", "slug", "created_at"
        )

        data = {
            "total_articles": total_articles,
            "total_published_articles": total_published_articles,

            "total_courses": total_courses,

            "total_lecturers": total_lecturers,
            "total_active_lecturers": total_active_lecturers,

            "latest_articles": latest_articles,
            "latest_courses": latest_courses,
            "latest_lecturers": latest_lecturers,
        }

        serializer = DashboardOverviewSerializer(data)

        return Response(serializer.data)