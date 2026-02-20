from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, ArticleCategoryViewSet

router = DefaultRouter()
router.register('articles', ArticleViewSet, basename='articles')
router.register('article-categories', ArticleCategoryViewSet, basename='categories')

urlpatterns = router.urls