from rest_framework import serializers
from django.db import transaction
from PIL import Image
from .models import Lecturer, LecturerCategory, LecturerCourse


# ====================== SERIALIZER CATEGORY ======================
class LecturerCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LecturerCategory
        fields = "__all__"


# ====================== SERIALIZER LECTURER ======================
class LecturerSerializer(serializers.ModelSerializer):
    # Field ManyToMany untuk multi-select kategori
    categories = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=LecturerCategory.objects.all(),
        required=False
    )

    # Field ManyToMany Course (via LecturerCourse)
    course_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )
    courses = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Lecturer
        fields = "__all__"

    # GET courses untuk response
    def get_courses(self, obj):
        return [
            {
                "id": lc.course.id,
                "course_name": lc.course.course_name,
                "course_code": lc.course.course_code,
            }
            for lc in obj.lecturer_courses.select_related('course').all()
        ]

    # VALIDASI FOTO
    def validate_photo(self, value):
        if not hasattr(value, 'size'):
            return value
        if value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError("Ukuran foto maksimal 2MB.")
        img = Image.open(value)
        if img.width != img.height:
            raise serializers.ValidationError("Rasio foto harus 1:1.")
        return value

    # HANDLE MULTI-SELECT FORM DATA
    def to_internal_value(self, data):
        data = data.copy()
        # categories bisa dikirim sebagai list dari formData
        if "categories" in data:
            try:
                data["categories"] = [int(x) for x in data.getlist("categories")]
            except AttributeError:
                val = data.get("categories")
                if isinstance(val, str):
                    data["categories"] = [int(val)]
        # course_ids juga bisa dikirim sebagai list dari formData
        if "course_ids" in data:
            try:
                data["course_ids"] = [int(x) for x in data.getlist("course_ids")]
            except AttributeError:
                val = data.get("course_ids")
                if isinstance(val, str):
                    data["course_ids"] = [int(val)]
        return super().to_internal_value(data)

    # CREATE
    def create(self, validated_data):
        categories = validated_data.pop("categories", [])
        course_ids = validated_data.pop("course_ids", [])
        with transaction.atomic():
            lecturer = Lecturer.objects.create(**validated_data)
            if categories:
                lecturer.categories.set(categories)
            for cid in course_ids:
                LecturerCourse.objects.create(lecturer=lecturer, course_id=cid)
        return lecturer

    # UPDATE
    def update(self, instance, validated_data):
        categories = validated_data.pop("categories", None)
        course_ids = validated_data.pop("course_ids", None)
        with transaction.atomic():
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()
            if categories is not None:
                instance.categories.set(categories)
            if course_ids is not None:
                instance.lecturer_courses.all().delete()
                for cid in course_ids:
                    LecturerCourse.objects.create(lecturer=instance, course_id=cid)
        return instance