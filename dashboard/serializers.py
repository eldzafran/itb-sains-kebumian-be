from rest_framework import serializers


class DashboardOverviewSerializer(serializers.Serializer):
    total_articles = serializers.IntegerField()
    total_published_articles = serializers.IntegerField()

    total_courses = serializers.IntegerField()

    total_lecturers = serializers.IntegerField()
    total_active_lecturers = serializers.IntegerField()

    latest_articles = serializers.ListField()
    latest_courses = serializers.ListField()
    latest_lecturers = serializers.ListField()