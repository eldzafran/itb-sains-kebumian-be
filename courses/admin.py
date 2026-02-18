# from django.contrib import admin
# from .models import Curriculum, Course, LearningMethod, Assessment


# # ===== Inline Learning Method =====
# class LearningMethodInline(admin.TabularInline):
#     model = LearningMethod
#     extra = 1


# # ===== Inline Assessment =====
# class AssessmentInline(admin.TabularInline):
#     model = Assessment
#     extra = 1


# # ===== Course Admin =====
# @admin.register(Course)
# class CourseAdmin(admin.ModelAdmin):

#     list_display = (
#         "course_code",
#         "course_name",
#         "program",
#         "sks",
#         "curriculum",
#     )

#     search_fields = (
#         "course_code",
#         "course_name",
#     )

#     list_filter = (
#         "program",
#         "curriculum",
#     )

#     inlines = [
#         LearningMethodInline,
#         AssessmentInline
#     ]


# # ===== Curriculum =====
# @admin.register(Curriculum)
# class CurriculumAdmin(admin.ModelAdmin):
#     list_display = ("year", "semester")


# # ===== Register Others =====
# admin.site.register(LearningMethod)
# admin.site.register(Assessment)
