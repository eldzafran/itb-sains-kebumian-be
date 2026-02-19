from rest_framework import serializers
from django.db import transaction
from PIL import Image
from .models import Lecturer, LecturerCategory, LecturerCourse


class LecturerCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LecturerCategory
        fields = "__all__"

    def validate_name(self, value):
        if LecturerCategory.objects.filter(name__iexact=value).exists():
            raise serializers.ValidationError(
                "Nama kategori sudah digunakan."
            )
        return value


class LecturerSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=LecturerCategory.objects.all()
    )

    course_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True
    )

    class Meta:
        model = Lecturer
        fields = "__all__"

    # ======================
    # VALIDASI FOTO
    # ======================
    def validate_photo(self, value):
        if value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError(
                "Ukuran foto maksimal 2MB."
            )

        img = Image.open(value)
        width, height = img.size

        if width != height:
            raise serializers.ValidationError(
                "Rasio foto harus 1:1."
            )

        return value

    # ======================
    # VALIDASI NIP
    # ======================
    def validate_nip(self, value):
        if Lecturer.objects.filter(nip=value).exists():
            raise serializers.ValidationError(
                "NIP sudah terdaftar."
            )
        return value

    # ======================
    # CREATE WITH TRANSACTION
    # ======================
    def create(self, validated_data):
        categories = validated_data.pop("categories")
        course_ids = validated_data.pop("course_ids")

        with transaction.atomic():
            lecturer = Lecturer.objects.create(**validated_data)
            lecturer.categories.set(categories)

            for course_id in course_ids:
                LecturerCourse.objects.create(
                    lecturer=lecturer,
                    course_id=course_id
                )

        return lecturer

    # ======================
    # UPDATE
    # ======================
    def update(self, instance, validated_data):
        categories = validated_data.pop("categories", None)
        course_ids = validated_data.pop("course_ids", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        if categories is not None:
            instance.categories.set(categories)

        if course_ids is not None:
            instance.lecturer_courses.all().delete()
            for course_id in course_ids:
                LecturerCourse.objects.create(
                    lecturer=instance,
                    course_id=course_id
                )

        return instance
