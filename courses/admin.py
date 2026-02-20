from django.contrib import admin
from .models import Course, Curriculum, LearningMethod, Assessment

class LearningMethodInline(admin.TabularInline):
    model = LearningMethod
    extra = 1

class AssessmentInline(admin.TabularInline):
    model = Assessment
    extra = 1

@admin.register(Curriculum)
class CurriculumAdmin(admin.ModelAdmin):
    list_display = ('year', 'semester')

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('course_code', 'course_name', 'program', 'sks', 'curriculum')
    search_fields = ('course_code', 'course_name')
    list_filter = ('program', 'curriculum')
    inlines = [LearningMethodInline, AssessmentInline]

@admin.register(LearningMethod)
class LearningMethodAdmin(admin.ModelAdmin):
    list_display = ('course', 'method', 'implementation')

@admin.register(Assessment)
class AssessmentAdmin(admin.ModelAdmin):
    list_display = ('course', 'component', 'weight')