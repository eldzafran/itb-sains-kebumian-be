from rest_framework import serializers
from django.core.exceptions import ValidationError as DjangoValidationError
from .models import Course, LearningMethod, Assessment

class LearningMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningMethod
        exclude = ['course'] 

class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        exclude = ['course']

class CourseSerializer(serializers.ModelSerializer):
    methods = LearningMethodSerializer(many=True, required=False)
    assessments = AssessmentSerializer(many=True, required=False)
    
    # Tambahan field agar React bisa langsung nampilkan label teks yang rapi
    program_display = serializers.ReadOnlyField(source='get_program_display', read_only=True)
    study_option_display = serializers.ReadOnlyField(source='get_study_option_display', read_only=True)
    specialization_display = serializers.ReadOnlyField(source='get_specialization_display', read_only=True)

    class Meta:
        model = Course
        fields = "__all__"

    def create(self, validated_data):
        methods_data = validated_data.pop('methods', [])
        assessments_data = validated_data.pop('assessments', [])

        try:
            # 1. Inisiasi instance
            course = Course(**validated_data)
            # 2. PAKSA jalankan logika clean() yang ada di models.py
            course.full_clean() 
            course.save()
        except DjangoValidationError as e:
            # Lempar error validasi model ke API (biar Admin tau salahnya dimana)
            raise serializers.ValidationError(e.message_dict)
        
        for m in methods_data:
            LearningMethod.objects.create(course=course, **m)
        for a in assessments_data:
            Assessment.objects.create(course=course, **a)
            
        return course

    def update(self, instance, validated_data):
        methods_data = validated_data.pop('methods', None)
        assessments_data = validated_data.pop('assessments', None)

        # Update field utama
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        try:
            # Jalankan validasi model lagi sebelum save
            instance.full_clean()
            instance.save()
        except DjangoValidationError as e:
            raise serializers.ValidationError(e.message_dict)

        # Logika delete & create untuk nested data (Sudah Aman)
        if methods_data is not None:
            instance.methods.all().delete()
            for m in methods_data:
                LearningMethod.objects.create(course=instance, **m)

        if assessments_data is not None:
            instance.assessments.all().delete()
            for a in assessments_data:
                Assessment.objects.create(course=instance, **a)

        return instance