from django.contrib import admin
from .models import LecturerCategory, Lecturer, LecturerCourse


@admin.register(LecturerCategory)
class LecturerCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at')
    search_fields = ('name',)


@admin.register(Lecturer)
class LecturerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'nip', 'position', 'is_active')
    list_filter = ('is_active', 'categories')
    search_fields = ('name', 'nip')


@admin.register(LecturerCourse)
class LecturerCourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'lecturer', 'course_id', 'created_at')