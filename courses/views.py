from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q
from django.core.paginator import Paginator
from django.db import transaction

from .models import Course, LearningMethod, Assessment
from .forms import CourseForm


def course_list(request):

    search = request.GET.get("search", "")

    courses = Course.objects.filter(
        Q(course_code__icontains=search) |
        Q(course_name__icontains=search)
    ).order_by("course_name")

    paginator = Paginator(courses, 10)
    page = request.GET.get("page")

    courses = paginator.get_page(page)

    return render(request, "courses/list.html", {
        "courses": courses,
        "search": search
    })

@transaction.atomic
def course_create(request):

    if request.method == "POST":

        form = CourseForm(request.POST)

        if form.is_valid():

            course = form.save()

            # ===== Learning Methods =====
            methods = request.POST.getlist("method[]")
            implementations = request.POST.getlist("implementation[]")
            cpmks = request.POST.getlist("cpmk_method[]")
            cpls = request.POST.getlist("cpl_method[]")

            for i in range(len(methods)):
                if methods[i]:
                    LearningMethod.objects.create(
                        course=course,
                        method=methods[i],
                        implementation=implementations[i],
                        cpmk=cpmks[i],
                        cpl=cpls[i]
                    )

            # ===== Assessments =====
            components = request.POST.getlist("component[]")
            rubrics = request.POST.getlist("rubric[]")
            weights = request.POST.getlist("weight[]")
            cpl_assess = request.POST.getlist("cpl_assess[]")

            total_weight = sum([int(w) for w in weights if w])

            if total_weight > 100:
                form.add_error(None, "Total bobot asesmen tidak boleh melebihi 100%.")
                return render(request, "courses/create.html", {"form": form})

            for i in range(len(components)):
                if components[i]:
                    Assessment.objects.create(
                        course=course,
                        component=components[i],
                        rubric=rubrics[i],
                        weight=weights[i],
                        cpl=cpl_assess[i]
                    )

            return redirect("course_list")

    else:
        form = CourseForm()

    return render(request, "courses/create.html", {"form": form})

@transaction.atomic
def course_update(request, pk):

    course = get_object_or_404(Course, pk=pk)

    if request.method == "POST":

        form = CourseForm(request.POST, instance=course)

        if form.is_valid():

            course = form.save()

            course.methods.all().delete()
            course.assessments.all().delete()

            # ulang insert seperti create
            # (kode sama seperti di atas)

            return redirect("course_list")

    else:
        form = CourseForm(instance=course)

    return render(request, "courses/edit.html", {
        "form": form,
        "course": course
    })

def course_delete(request, pk):

    course = get_object_or_404(Course, pk=pk)

    if request.method == "POST":
        course.delete()
        return redirect("course_list")

    return render(request, "courses/delete.html", {
        "course": course
    })
