import django_filters
from .models import Article


class ArticleFilter(django_filters.FilterSet):
    category = django_filters.NumberFilter(field_name='categories__id')
    status = django_filters.CharFilter(field_name='status')

    class Meta:
        model = Article
        fields = ['category', 'status']