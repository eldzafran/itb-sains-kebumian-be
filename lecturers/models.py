from django.db import models
from django.utils.text import slugify
from django.core.exceptions import ValidationError
from django.db.models.signals import pre_save
from django.dispatch import receiver


# ==============================
# LECTURER CATEGORY
# ==============================
class LecturerCategory(models.Model):
    name = models.CharField(max_length=255, unique=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# ==============================
# LECTURER
# ==============================
class Lecturer(models.Model):
    slug = models.SlugField(unique=True, blank=True)

    photo = models.ImageField(upload_to="lecturers/", null=True, blank=True)

    name = models.CharField(max_length=255)
    nip = models.CharField(max_length=100, unique=True)

    position = models.CharField(max_length=255)

    categories = models.ManyToManyField(
        LecturerCategory,
        related_name="lecturers"
    )

    email = models.EmailField(blank=True, null=True)
    webpage = models.URLField(blank=True, null=True)

    sinta_id = models.CharField(max_length=100, blank=True, null=True)
    researcher_id = models.CharField(max_length=100, blank=True, null=True)
    scopus_author_id = models.CharField(max_length=100, blank=True, null=True)
    orcid_id = models.CharField(max_length=100, blank=True, null=True)

    research_interest = models.TextField(max_length=500, blank=True, null=True)
    education_history = models.TextField(max_length=500, blank=True, null=True)
    publications = models.TextField(max_length=500, blank=True, null=True)
    projects = models.TextField(max_length=500, blank=True, null=True)
    community_service = models.TextField(max_length=500, blank=True, null=True)
    awards = models.TextField(max_length=500, blank=True, null=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# ==============================
# LECTURER COURSE (RELATION)
# ==============================
class LecturerCourse(models.Model):
    lecturer = models.ForeignKey(
        Lecturer,
        on_delete=models.CASCADE,
        related_name="lecturer_courses"
    )

    course_id = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.lecturer.name} - {self.course_id}"


# ==============================
# AUTO SLUG
# ==============================
@receiver(pre_save, sender=Lecturer)
def generate_slug(sender, instance, **kwargs):
    if not instance.slug:
        base_slug = slugify(instance.name)
        slug = base_slug
        counter = 1

        while Lecturer.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1

        instance.slug = slug
