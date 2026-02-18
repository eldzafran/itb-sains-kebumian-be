from django.db import models


class LecturerCategory(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Lecturer(models.Model):
    slug = models.SlugField(unique=True)
    photo_url = models.URLField(blank=True, null=True)
    name = models.CharField(max_length=255)
    nip_nopeng = models.CharField(max_length=100)
    email = models.EmailField()
    webpage = models.URLField(blank=True, null=True)

    sinta_id = models.CharField(max_length=100, blank=True, null=True)
    researcher_id = models.CharField(max_length=100, blank=True, null=True)
    scopus_author_id = models.CharField(max_length=100, blank=True, null=True)
    orcid_id = models.CharField(max_length=100, blank=True, null=True)

    position = models.CharField(max_length=255, blank=True, null=True)
    research_interest = models.TextField(blank=True, null=True)
    education_history = models.TextField(blank=True, null=True)
    publications = models.TextField(blank=True, null=True)
    projects = models.TextField(blank=True, null=True)
    community_service = models.TextField(blank=True, null=True)
    awards = models.TextField(blank=True, null=True)

    is_active = models.BooleanField(default=True)

    category = models.ForeignKey(
        LecturerCategory,
        on_delete=models.SET_NULL,
        null=True,
        related_name='lecturers'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class LecturerCourse(models.Model):
    lecturer = models.ForeignKey(
        Lecturer,
        on_delete=models.CASCADE,
        related_name='lecturer_courses'
    )
    course_id = models.IntegerField()  # nanti bisa diganti FK ke table courses
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.lecturer.name} - {self.course_id}"
