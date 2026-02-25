import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "../../../components/articles/ArticleForm";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import { getArticle, updateArticle } from "../../../services/adminArticle";
import type { Props, ApiArticle } from "../../../types/articles";

// Utility untuk membuat slug sederhana jika slug dari API kosong
function slugifyLite(text: string) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Mengambil tipe data initial dari Props ArticleForm
type ArticleFormInitial = NonNullable<Props["initial"]>;

export default function EditArticlePage() {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const articleId = Number(id);
  const validId = useMemo(() => Number.isFinite(articleId), [articleId]);

  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState<ArticleFormInitial | null>(null);

  useEffect(() => {
    if (!validId) return;

    const loadArticle = async () => {
      try {
        setLoading(true);
        const a: ApiArticle = await getArticle(articleId);

        const categoryIds = Array.isArray(a.categories)
          ? a.categories.map((c: any) => (typeof c === "object" ? c.id : c))
          : [];

        setInitial({
          id: a.id,
          title: a.title,
          slug: a.slug || slugifyLite(a.title),
          content: a.content,
          status: a.status, // "Draft" | "Published"
          thumbnail: a.thumbnail, // Path dari server
          categories: categoryIds,
          files: a.files || [],
        });
      } catch (error: any) {
        console.error("Fetch error:", error);
        toast({
          type: "error",
          title: "Error",
          message: "Gagal mengambil data artikel",
        });
        setInitial(null);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [articleId, validId, toast]);

  // Handle submit ke service updateArticle
  const handleSubmit = async (values: any) => {
    try {
      await updateArticle(articleId, {
        title: values.title,
        slug: values.slug,
        content: values.content,
        status: values.status,
        categories: values.categories, 
        thumbnailFile: values.thumbnailFile,
        files: values.files,
        created_by: values.created_by,
      });

      toast({
        type: "success",
        title: "Berhasil",
        message: "Artikel telah diperbarui",
      });

      nav("/admin/articles");
    } catch (e: any) {
      toast({
        type: "error",
        title: "Gagal Update",
        message: e?.message || "Terjadi kesalahan saat menyimpan",
      });
    }
  };

  if (!validId) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-xl border border-red-200">
        ID Artikel tidak valid.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-10 flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Memuat data artikel...</p>
      </div>
    );
  }

  if (!initial) {
    return (
      <div className="p-6 bg-white border rounded-xl text-center">
        <p className="text-gray-500">Artikel tidak ditemukan atau telah dihapus.</p>
        <button 
          onClick={() => nav("/admin/articles")}
          className="mt-4 text-blue-600 font-semibold"
        >
          Kembali ke Daftar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Edit Artikel</h1>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          initial.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
        }`}>
          Status Saat Ini: {initial.status}
        </span>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <ArticleForm
          initial={initial}
          onCancel={() => nav("/admin/articles")}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}