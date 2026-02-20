from rest_framework import serializers
from .models import Course, Curriculum, LearningMethod, Assessment

class CurriculumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curriculum
        fields = "__all__"

class LearningMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningMethod
        fields = "__all__"

class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = "__all__"

class CourseSerializer(serializers.ModelSerializer):
    # Relasi nested
    curriculum_details = CurriculumSerializer(source='curriculum', read_only=True)
    methods = LearningMethodSerializer(many=True, read_only=True)
    assessments = AssessmentSerializer(many=True, read_only=True)
    
    # Menampilkan dosen pengampu
    lecturers = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id', 'curriculum', 'curriculum_details', 'program', 'study_option', 
            'specialization', 'course_code', 'course_name', 'sks', 'description', 
            'cpps', 'cpmk', 'weekly_plan', 'ethics_note', 'methods', 
            'assessments', 'lecturers', 'created_at', 'updated_at'
        ]

    def get_lecturers(self, obj):
        return [
            {
                "id": lect.id,
                "name": lect.name,
                "nip": lect.nip,
                "slug": lect.slug
            } for lect in obj.lecturers.all()
        ]