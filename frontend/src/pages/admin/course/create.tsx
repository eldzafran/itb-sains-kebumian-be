import { useNavigate } from "react-router-dom";
import CourseForm from "../../../components/course/CourseForm";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import { createCourse } from "../../../services/adminCourse"; // service API kamu

export default function CreateCoursePage() {
  const nav = useNavigate();
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Create Course</h1>
        <p className="text-sm text-slate-500">Buat mata kuliah baru.</p>
      </div>

      <CourseForm
        onCancel={() => nav("/admin/courses")}
        onSubmit={async (data) => {
          try {
            await createCourse(data);
            toast({ type: "success", title: "Created", message: "Mata kuliah berhasil dibuat." });
            nav("/admin/courses");
          } catch (e: any) {
            toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal membuat mata kuliah." });
          }
        }}
      />
    </div>
  );
}