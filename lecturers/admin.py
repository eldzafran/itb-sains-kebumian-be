from django.contrib import admin
from .models import Lecturer, LecturerCategory, LecturerCourse

class LecturerCourseInline(admin.TabularInline):
    model = LecturerCourse
    extra = 1
    autocomplete_fields = ['course'] 

@admin.register(LecturerCategory)
class LecturerCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)

@admin.register(Lecturer)
class LecturerAdmin(admin.ModelAdmin):
    list_display = ('name', 'nip', 'position', 'is_active')
    search_fields = ('name', 'nip')
    list_filter = ('is_active', 'categories')
    prepopulated_fields = {"slug": ("name",)} 
    inlines = [LecturerCourseInline]
    filter_horizontal = ('categories',) 

@admin.register(LecturerCourse)
class LecturerCourseAdmin(admin.ModelAdmin):
    list_display = ('lecturer', 'course', 'created_at')
    list_filter = ('course',)