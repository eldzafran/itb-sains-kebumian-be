from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/courses/', include('courses.urls')),
    path("api/users/", include("users.urls")),
    path('api/', include('lecturers.urls')),
    path('api/', include('articles.urls')),
    path('api/', include('dashboard.urls')),
    path('api/auth/', include('users.urls')),
    path('api-auth/', include('rest_framework.urls')), 
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)   