import { useNavigate } from "react-router-dom";
import ArticleForm from "../../../components/articles/ArticleForm";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import { createArticle } from "../../../services/adminArticle";

export default function CreateArticlePage() {
  const nav = useNavigate();
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Create Article
        </h1>
        <p className="text-sm text-slate-500">Buat artikel baru.</p>
      </div>

      <ArticleForm
        onCancel={() => nav("/admin/articles")}
        onSubmit={async (values) => {
          try {
            await createArticle(values);

            toast({
              type: "success",
              title: "Created",
              message: "Artikel berhasil dibuat.",
            });

            nav("/admin/articles");
          } catch (e: any) {
            toast({
              type: "error",
              title: "Failed",
              message: e?.message ?? "Gagal membuat artikel.",
            });
          }
        }}
      />
    </div>
  );
}