import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseForm from "../../../components/course/CourseForm";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import { getAdminCourse, updateCourse } from "../../../services/adminCourse"; // service API kamu

export default function EditCoursePage() {
  const nav = useNavigate();
  const { id } = useParams(); // ambil ID dari URL
  const { toast } = useToast();

  const [initialData, setInitialData] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const course = await getAdminCourse(Number(id));
        setInitialData(course);
      } catch (e: any) {
        toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal memuat data mata kuliah." });
      }
    })();
  }, [id]);

  if (!initialData) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Edit Course</h1>
        <p className="text-sm text-slate-500">Ubah data mata kuliah.</p>
      </div>

      <CourseForm
        onCancel={() => nav("/admin/courses")}
        onSubmit={async (data) => {
          try {
            await updateCourse(Number(id), data);
            toast({ type: "success", title: "Updated", message: "Mata kuliah berhasil diperbarui." });
            nav("/admin/courses");
          } catch (e: any) {
            toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal memperbarui mata kuliah." });
          }
        }}
      />
    </div>
  );
}