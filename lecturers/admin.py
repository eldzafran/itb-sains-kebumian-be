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
    list_display = ('name', 'nip', 'category', 'is_active')
    fieldsets = (
        ('Informasi Dasar', {
            'fields': (
                'photo', 'name', 'nip', 'slug', 'position', 
                'category', 'categories', 
                'email', 'webpage', 'sinta_id', 'researcher_id', 
                'scopus_author_id', 'orcid_id'
            )
        }),
        ('Informasi Akademik', {
            'fields': ('research_interest', 'education_history', 'publications', 'research_projects', 'community_service', 'awards')
        }),
    )

@admin.register(LecturerCourse)
class LecturerCourseAdmin(admin.ModelAdmin):
    list_display = ('lecturer', 'course', 'created_at')
    list_filter = ('course',)   