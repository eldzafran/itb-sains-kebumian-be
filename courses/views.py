from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from .models import Course
from .serializers import CourseSerializer

class CourseListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        # Mulai dengan semua data
        queryset = Course.objects.all().order_by("course_name")

        # Ambil parameter dari URL
        program = self.request.query_params.get("program")
        study_option = self.request.query_params.get("study_option")
        specialization = self.request.query_params.get("specialization")
        search = self.request.query_params.get("search")

        # Logika Filter Dinamis
        if program:
            queryset = queryset.filter(program=program)
        
        if study_option:
            queryset = queryset.filter(study_option=study_option)

        # Logika Penting: Menangani Spesialisasi Kosong
        # Jika parameter specialization dikirim (misal: ?specialization=IKLIM)
        if specialization:
            queryset = queryset.filter(specialization=specialization)
        
        # JIKA program S2 dipilih tapi specialization TIDAK dikirim di URL,
        # biasanya User ingin melihat MK Umum (yang tidak punya spesialisasi)
        elif program == 'S2':
             queryset = queryset.filter(Q(specialization__isnull=True) | Q(specialization=''))

        if search:
            queryset = queryset.filter(
                Q(course_code__icontains=search) |
                Q(course_name__icontains=search)
            )

        return queryset

class CourseRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseMetadataView(APIView):
    def get(self, request):
        return Response({
            "programs": [{"value": k, "label": v} for k, v in Course.PROGRAM_CHOICES],
            "study_options": [{"value": k, "label": v} for k, v in Course.STUDY_OPTION_CHOICES],
            "specializations": [{"value": k, "label": v} for k, v in Course.SPECIALIZATION_CHOICES],
        })