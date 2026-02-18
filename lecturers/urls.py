from rest_framework.routers import DefaultRouter
from .views import LecturerViewSet, LecturerCategoryViewSet, LecturerCourseViewSet

router = DefaultRouter()
router.register(r'lecturer-categories', LecturerCategoryViewSet)
router.register(r'lecturers', LecturerViewSet)
router.register(r'lecturer-courses', LecturerCourseViewSet)

urlpatterns = router.urls
