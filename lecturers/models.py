from django.db import models
from django.utils.text import slugify
from django.db.models.signals import pre_save
from django.dispatch import receiver
from courses.models import Course


class LecturerCategory(models.Model):
    name = models.CharField(max_length=255, unique=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


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

    # RELASI MANY TO MANY KE COURSE
    courses = models.ManyToManyField(
        Course,
        through="LecturerCourse",
        related_name="lecturers",
        blank=True
    )

    email = models.EmailField(blank=True, null=True)
    webpage = models.URLField(blank=True, null=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class LecturerCourse(models.Model):
    lecturer = models.ForeignKey(
        Lecturer,
        on_delete=models.CASCADE,
        related_name="lecturer_courses"
    )

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="course_lecturers"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.lecturer.name} - {self.course.course_name}"


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