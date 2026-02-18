from rest_framework import serializers
from .models import Lecturer, LecturerCategory, LecturerCourse


class LecturerCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LecturerCategory
        fields = '__all__'


class LecturerSerializer(serializers.ModelSerializer):
    category = LecturerCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=LecturerCategory.objects.all(),
        source='category',
        write_only=True
    )

    class Meta:
        model = Lecturer
        fields = '__all__'


class LecturerCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = LecturerCourse
        fields = '__all__'
