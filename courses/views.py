from rest_framework import generics
from .models import Course
from .serializers import CourseSerializer


class CourseListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        queryset = Course.objects.all().order_by("course_name")

        program = self.request.query_params.get("program")
        study_option = self.request.query_params.get("study_option")
        specialization = self.request.query_params.get("specialization")

        # Filter wajib program + study_option
        if program and study_option:
            queryset = queryset.filter(
                program=program,
                study_option=study_option
            )

            # Jika ada spesialisasi tambahkan filter
            if specialization:
                queryset = queryset.filter(
                    specialization=specialization
                )

        return queryset


class CourseRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer