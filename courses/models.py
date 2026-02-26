from django.db import models
from django.core.exceptions import ValidationError
class Course(models.Model):

    PROGRAM_CHOICES = (
        ('S2', 'S2 Magister'),
        ('S3', 'S3 Doktoral'),
    )

    STUDY_OPTION_CHOICES = (
        ('ATMOSFER', 'Sains Atmosfer'),
        ('OSEANOGRAFI', 'Oseanografi dan Interaksi Sistem Bumi'),
        ('INTERAKSI', 'Interaksi Sistem Bumi'),
        ('KEBUMIAN', 'Sains Kebumian'),
    )

    SPECIALIZATION_CHOICES = (
        ('IKLIM', 'Perubahan Iklim dan Transisi Energi'),
        ('BENCANA', 'Mitigasi Bencana Kebumian'),
    )

    program = models.CharField(
        max_length=2,
        choices=PROGRAM_CHOICES
    )

    study_option = models.CharField(
        max_length=20,
        choices=STUDY_OPTION_CHOICES
    )

    specialization = models.CharField(
        max_length=20,
        choices=SPECIALIZATION_CHOICES,
        blank=True,
        null=True,
    )

    course_code = models.CharField(max_length=20, unique=True)
    course_name = models.CharField(max_length=200)

    sks = models.PositiveIntegerField()
    description = models.CharField(max_length=200)

    cpps = models.CharField(max_length=500, blank=True, null=True)
    cpmk = models.CharField(max_length=500, blank=True, null=True)
    weekly_plan = models.CharField(max_length=500, blank=True, null=True)
    ethics_note = models.CharField(max_length=200, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        if self.program == 'S3' and self.specialization:
            raise ValidationError({
                'specialization': 'Spesialisasi hanya untuk Program S2.'
            })

        if self.study_option == 'KEBUMIAN' and self.program != 'S3':
            raise ValidationError({
                'study_option': 'Sains Kebumian hanya tersedia untuk Program S3.'
            })

    def __str__(self):
        return self.course_name


class LearningMethod(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="methods"
    )

    method = models.CharField(max_length=200)
    implementation = models.CharField(max_length=200)

    cpmk = models.CharField(max_length=200)
    cpl = models.CharField(max_length=200)


class Assessment(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="assessments"
    )

    component = models.CharField(max_length=200)
    rubric = models.TextField()

    weight = models.PositiveIntegerField()
    cpl = models.CharField(max_length=200)