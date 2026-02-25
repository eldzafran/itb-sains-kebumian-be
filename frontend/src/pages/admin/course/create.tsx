import { useState } from "react"; // Tambahkan useState
import { useNavigate } from "react-router-dom";
import CourseForm from "../../../components/course/CourseForm";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import { createCourse } from "../../../services/adminCourse";

export default function CreateCoursePage() {
  const nav = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      
      await createCourse(data);
      
      toast({ 
        type: "success", 
        title: "Success", 
        message: "Mata kuliah berhasil dibuat." 
      });
      
      nav("/admin/course", { replace: true });
    } catch (e: any) {
      toast({ 
        type: "error", 
        title: "Failed", 
        message: e?.message ?? "Gagal membuat mata kuliah." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Create Course</h1>
        <p className="text-sm text-slate-500">Isi formulir di bawah untuk menambahkan mata kuliah baru ke sistem.</p>
      </div>

      <div className={isSubmitting ? "opacity-50 pointer-events-none transition-opacity" : ""}>
        <CourseForm
          onCancel={() => nav("/admin/course")}
          onSubmit={handleSubmit}
        />
      </div>

      {isSubmitting && (
        <div className="fixed inset-0 bg-white/20 flex items-center justify-center z-50">
          <div className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg animate-bounce">
            Saving data...
          </div>
        </div>
      )}
    </div>
  );
}