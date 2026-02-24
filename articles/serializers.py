import json
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
        qs = ArticleCategory.objects.filter(name=value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("Nama kategori tidak boleh duplikat.")
        return value

class ArticleSerializer(serializers.ModelSerializer):
    files = ArticleFileSerializer(many=True, read_only=True)
    categories = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=ArticleCategory.objects.all()
    )

    class Meta:
        model = Article
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['categories'] = ArticleCategorySerializer(instance.categories.all(), many=True).data
        return representation

    def to_internal_value(self, data):
        resource_data = data.copy()
        files_json = resource_data.get('files_json')
        
        if files_json:
            try:
                self.context['files_from_json'] = json.loads(files_json)
            except (json.JSONDecodeError, TypeError):
                self.context['files_from_json'] = []
        
        return super().to_internal_value(resource_data)

    def validate(self, attrs):
        status = attrs.get('status')
        published_at = attrs.get('published_at')
        if status == 'Published' and not published_at:
            attrs['published_at'] = timezone.now()
        return attrs

    def validate_thumbnail(self, value):
        if isinstance(value, str):
            return value
            
        if value.size > 3 * 1024 * 1024:
            raise serializers.ValidationError("Maksimal 3MB.")
        
        img = Image.open(value)
        width, height = img.size
        if round(width / height, 2) != round(16 / 9, 2):
            raise serializers.ValidationError("Rasio harus 16:9.")
        return value

    def create(self, validated_data):
        categories = validated_data.pop('categories', [])
        
        files_data = self.context.get('files_from_json', [])

        user = self.context['request'].user
        validated_data['created_by'] = user

        article = Article.objects.create(**validated_data)
        article.categories.set(categories)

        for file in files_data:
            ArticleFile.objects.create(
                article=article, 
                file_name=file.get('file_name'), 
                file_url=file.get('file_url')
            )

        return article

    def update(self, instance, validated_data):
        categories = validated_data.pop('categories', None)
        files_data = self.context.get('files_from_json', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if categories is not None:
            instance.categories.set(categories)

        instance.save()

        if files_data is not None:
            instance.files.all().delete()
            for file in files_data:
                ArticleFile.objects.create(
                    article=instance, 
                    file_name=file.get('file_name'), 
                    file_url=file.get('file_url')
                )

        return instance