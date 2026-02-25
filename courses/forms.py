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

        if program == "S2" and not specialization:
            self.add_error("specialization", "Kolom ini wajib diisi.")

        return cleaned
