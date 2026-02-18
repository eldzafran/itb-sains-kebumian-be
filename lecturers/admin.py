from django.contrib import admin
from .models import LecturerCategory, Lecturer, LecturerCourse


@admin.register(LecturerCategory)
class LecturerCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'created_at')
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Lecturer)
class LecturerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'position', 'is_active')
    list_filter = ('is_active', 'category')
    search_fields = ('name', 'email', 'nip_nopeng')
    prepopulated_fields = {"slug": ("name",)}


@admin.register(LecturerCourse)
class LecturerCourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'lecturer', 'course_id', 'created_at')
