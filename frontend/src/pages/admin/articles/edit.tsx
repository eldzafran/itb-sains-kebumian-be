import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "../../../components/articles/ArticleForm";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import { getArticle, updateArticle } from "../../../services/adminArticle";
import type { Props } from "../../../types/articles";

type ArticleFormInitial = NonNullable<Props["initial"]>;
type ArticleFormValues = Parameters<Props["onSubmit"]>[0];

function slugifyLite(text: string) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

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

    (async () => {
      try {
        const a = await getArticle(articleId);

        setInitial({
          id: a.id,
          title: a.title,
          slug: a.slug ?? slugifyLite(a.title),
          content: a.content,
          status: a.status ?? "Draft",
          thumbnail: a.thumbnail ?? "",
          categories: Array.isArray(a.categories)
            ? a.categories.map((c: any) => c.id)
            : [],
        });
      } catch {
        setInitial(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [articleId, validId]);

  if (!validId) {
    return <div className="bg-white border rounded-xl p-6">Invalid ID</div>;
  }

  if (loading) return <div className="p-6">Loading...</div>;

  if (!initial) {
    return (
      <div className="bg-white border rounded-xl p-6">
        Artikel tidak ditemukan
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Edit Article</h1>

      <ArticleForm
        initial={initial}
        onCancel={() => nav("/admin/articles")}
        onSubmit={async (values: ArticleFormValues) => {
          try {
            await updateArticle(articleId, {
              title: values.title,
              slug: values.slug,
              content: values.content,
              status: values.status,
              category_id: values.categories?.[0] ?? null,
              thumbnailFile: values.thumbnailFile ?? undefined,
            });

            toast({
              type: "success",
              title: "Updated",
              message: "Artikel berhasil diupdate",
            });

            nav("/admin/articles");
          } catch (e: any) {
            toast({
              type: "error",
              title: "Failed",
              message: e?.message ?? "Gagal update",
            });
          }
        }}
      />
    </div>
  );
}