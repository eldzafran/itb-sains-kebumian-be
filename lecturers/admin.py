from django.contrib import admin
from .models import Lecturer, LecturerCategory, LecturerCourse

# Menampilkan mata kuliah langsung di halaman edit Dosen
class LecturerCourseInline(admin.TabularInline):
    model = LecturerCourse
    extra = 1
    autocomplete_fields = ['course'] # Membutuhkan search_fields di CourseAdmin

@admin.register(LecturerCategory)
class LecturerCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)

@admin.register(Lecturer)
class LecturerAdmin(admin.ModelAdmin):
    list_display = ('name', 'nip', 'position', 'is_active')
    search_fields = ('name', 'nip')
    list_filter = ('is_active', 'categories')
    # Automatis isi slug berdasarkan nama
    prepopulated_fields = {"slug": ("name",)} 
    inlines = [LecturerCourseInline]
    filter_horizontal = ('categories',) 

@admin.register(LecturerCourse)
class LecturerCourseAdmin(admin.ModelAdmin):
    list_display = ('lecturer', 'course', 'created_at')
    list_filter = ('course',)