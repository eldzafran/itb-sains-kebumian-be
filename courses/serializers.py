from rest_framework import serializers
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
    
    class Meta:
        model = Course
        fields = "__all__"

    def create(self, validated_data):
        methods_data = validated_data.pop('methods', [])
        assessments_data = validated_data.pop('assessments', [])

        course = Course.objects.create(**validated_data)
        
        for m in methods_data:
            LearningMethod.objects.create(course=course, **m)
        for a in assessments_data:
            Assessment.objects.create(course=course, **a)
            
        return course

    def update(self, instance, validated_data):
        methods_data = validated_data.pop('methods', None)
        assessments_data = validated_data.pop('assessments', None)

        instance = super().update(instance, validated_data)

        if methods_data is not None:
            instance.methods.all().delete()
            for m in methods_data:
                LearningMethod.objects.create(course=instance, **m)

        if assessments_data is not None:
            instance.assessments.all().delete()
            for a in assessments_data:
                Assessment.objects.create(course=instance, **a)

        return instance
