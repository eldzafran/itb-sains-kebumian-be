from django import forms
from .models import Course


class CourseForm(forms.ModelForm):

    class Meta:
        model = Course
        fields = '__all__'

    def clean(self):
        cleaned = super().clean()

        program = cleaned.get("program")
        specialization = cleaned.get("specialization")
        field_option = cleaned.get("field_option")  # opsi keilmuan

        # Jika program S2 maka spesialisasi wajib
        if program == "S2" and not specialization:
            self.add_error("specialization", "Kolom ini wajib diisi untuk Program S2.")

        # Jika program S3 tapi spesialisasi diisi (opsional)
        if program == "S3" and specialization:
            self.add_error("specialization", "Spesialisasi hanya untuk Program S2.")

        # Opsi keilmuan Sains Kebumian hanya untuk S3
        if field_option == "SAINS_KEBUMIAN" and program != "S3":
            self.add_error("field_option", "Sains Kebumian hanya tersedia untuk Program S3.")

        return cleaned