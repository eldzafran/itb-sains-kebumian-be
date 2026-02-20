from django.db import models

# Create your models here.
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from PIL import Image
import os

User = get_user_model()


class ArticleCategory(models.Model):
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Article(models.Model):

    STATUS_CHOICES = (
        ('Draft', 'Draft'),
        ('Published', 'Published'),
    )

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    thumbnail = models.ImageField(upload_to='articles/thumbnails/')
    categories = models.ManyToManyField(ArticleCategory, related_name='articles')

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Draft')
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    published_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        if self.thumbnail:
            if self.thumbnail.size > 3 * 1024 * 1024:
                raise ValidationError("Rasio harus 16:9 dan maksimal 3MB.")

            img = Image.open(self.thumbnail)
            width, height = img.size

            if width / height != 16 / 9:
                raise ValidationError("Rasio harus 16:9 dan maksimal 3MB.")

    def __str__(self):
        return self.title


class ArticleFile(models.Model):
    article = models.ForeignKey(
        Article,
        related_name='files',
        on_delete=models.CASCADE
    )
    file_name = models.CharField(max_length=255, null=True, blank=True)
    file_url = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)