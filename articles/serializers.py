from django.utils.text import slugify
from PIL import Image
from rest_framework import serializers
from django.utils import timezone
from .models import Article, ArticleCategory, ArticleFile


class ArticleFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleFile
        fields = ['id', 'file_name', 'file_url']


class ArticleCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleCategory
        fields = '__all__'

    def validate_name(self, value):
        if ArticleCategory.objects.filter(name=value).exists():
            raise serializers.ValidationError("Nama kategori tidak boleh duplikat.")
        return value

    def validate_slug(self, value):
        value = slugify(value)

        qs = ArticleCategory.objects.filter(slug=value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)

        if qs.exists():
            raise serializers.ValidationError("Slug sudah digunakan.")

        return value


class ArticleSerializer(serializers.ModelSerializer):

    files = ArticleFileSerializer(many=True, required=False)
    categories = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=ArticleCategory.objects.all()
    )

    class Meta:
        model = Article
        fields = '__all__'

    def validate(self, attrs):
        status = attrs.get('status')
        published_at = attrs.get('published_at')

        if status == 'Published' and not published_at:
            attrs['published_at'] = timezone.now()

        return attrs
    
    def validate_thumbnail(self, value):
        if value.size > 3 * 1024 * 1024:
            raise serializers.ValidationError(
                "Rasio harus 16:9 dan maksimal 3MB."
            )

        img = Image.open(value)
        width, height = img.size

        if round(width / height, 2) != round(16 / 9, 2):
            raise serializers.ValidationError(
                "Rasio harus 16:9 dan maksimal 3MB."
            )

        return value
    
    def validate_slug(self, value):
        value = slugify(value)

        qs = Article.objects.filter(slug=value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)

        if qs.exists():
            raise serializers.ValidationError("Slug sudah digunakan.")

        return value

    def create(self, validated_data):
        files_data = validated_data.pop('files', [])
        categories = validated_data.pop('categories')

        user = self.context['request'].user
        if not validated_data.get('created_by'):
            validated_data['created_by'] = user

        article = Article.objects.create(**validated_data)
        article.categories.set(categories)

        for file in files_data:
            ArticleFile.objects.create(article=article, **file)

        return article

    def update(self, instance, validated_data):
        files_data = validated_data.pop('files', None)
        categories = validated_data.pop('categories', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if categories:
            instance.categories.set(categories)

        instance.save()

        if files_data is not None:
            instance.files.all().delete()
            for file in files_data:
                ArticleFile.objects.create(article=instance, **file)

        return instance