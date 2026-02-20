from rest_framework.routers import DefaultRouter
from .views import LecturerViewSet, LecturerCategoryViewSet

router = DefaultRouter()
router.register(r'lecturers', LecturerViewSet)
router.register(r'lecturer-categories', LecturerCategoryViewSet)

urlpatterns = router.urls