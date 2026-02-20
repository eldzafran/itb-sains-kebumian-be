from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from rest_framework.filters import SearchFilter
from django.utils import timezone
from .models import Article, ArticleCategory
from .serializers import ArticleSerializer, ArticleCategorySerializer
from .filters import ArticleFilter


class ArticleCategoryViewSet(viewsets.ModelViewSet):
    queryset = ArticleCategory.objects.all().order_by('-created_at')
    serializer_class = ArticleCategorySerializer
    permission_classes = [permissions.IsAuthenticated]


class ArticleViewSet(viewsets.ModelViewSet):

    queryset = Article.objects.all().order_by('-created_at')
    serializer_class = ArticleSerializer
    filterset_class = ArticleFilter
    search_fields = ['title']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        qs = super().get_queryset()

        if self.request.query_params.get("public"):
            qs = qs.filter(status='Published', published_at__lte=timezone.now())

        return qs