import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseForm from "../../../components/course/CourseForm";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import { getCourseById, updateCourse } from "../../../services/adminCourse";

export default function EditCoursePage() {
  const nav = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const [initialData, setInitialData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadCourse() {
      if (!id) return;
      try {
        setLoading(true);
        // Pastikan ID dikonversi ke Number jika backend mengharapkan integer
        const course = await getCourseById(Number(id)); 
        setInitialData(course);
      } catch (e: any) {
        toast({ 
          type: "error", 
          title: "Error", 
          message: "Data mata kuliah tidak ditemukan atau gagal dimuat." 
        });
        nav("/admin/course"); // Redirect kembali ke list
      } finally {
        setLoading(false);
      }
    }
    loadCourse();
  }, [id, nav, toast]);

  const handleSubmit = async (formData: any) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await updateCourse(Number(id), formData);
      toast({ 
        type: "success", 
        title: "Success", 
        message: "Perubahan berhasil disimpan." 
      });
      nav("/admin/course"); // Kembali ke index
    } catch (e: any) {
      toast({ 
        type: "error", 
        title: "Update Failed", 
        message: e?.message ?? "Gagal memperbarui data." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 animate-pulse">Memuat data kurikulum...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      <div className="border-b pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Mata Kuliah</h1>
          <p className="text-sm text-slate-500">
            Mengubah data: <span className="font-semibold text-blue-600">{initialData?.course_code} - {initialData?.course_name}</span>
          </p>
        </div>
        <button 
          onClick={() => nav("/admin/course")}
          className="text-sm text-slate-500 hover:text-slate-800 underline"
        >
          Kembali ke Daftar
        </button>
      </div>

      <div className={isSubmitting ? "opacity-50 pointer-events-none transition-opacity" : ""}>
        <CourseForm
          initialData={initialData}
          onCancel={() => nav("/admin/course")}
          onSubmit={handleSubmit}
        />
      </div>

      {isSubmitting && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-[1px] flex items-center justify-center z-50">
          <div className="bg-white px-8 py-4 rounded-2xl shadow-xl flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="font-medium text-slate-700">Menyimpan perubahan...</span>
          </div>
        </div>
      )}
    </div>
  );
}