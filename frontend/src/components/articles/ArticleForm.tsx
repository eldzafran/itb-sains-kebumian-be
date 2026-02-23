import { useEffect, useState } from "react";
import { fetchCategories } from "../../services/adminArticle";
import type { ApiCategory, Props } from "../../types/articles";


function slugifyLite(text: string) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}


export default function ArticleForm({ initial, onCancel, onSubmit }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [content, setContent] = useState(initial?.content ?? "");

  const [status, setStatus] = useState<"Draft" | "Published">(
    initial?.status ?? "Draft"
  );

  const [thumbnailUrl, setThumbnailUrl] = useState(initial?.thumbnail ?? "");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [categoriesSelected, setCategoriesSelected] = useState<number[]>(
    initial?.categories ?? []
  );

  const field =
    "w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none focus:ring-4 focus:ring-primary-100";
  const label = "block text-sm font-semibold text-slate-700 mb-1";

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchCategories();
        setCategories(list);

        if (!categoriesSelected.length && list.length) {
          setCategoriesSelected([list[0].id]);
        }
      } catch {
        setCategories([]);
      }
    })();
  }, []);

  useEffect(() => {
    if (!initial) setSlug(slugifyLite(title));
  }, [title]);


  function handleFile(file?: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    setThumbnailFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailUrl(String(reader.result || ""));
    };
    reader.readAsDataURL(file);
  }


  function submit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      title,
      slug,
      content,
      status,
      categories: categoriesSelected,
      thumbnailFile,
    });
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <div className="text-xs text-slate-500">Form</div>
        <h2 className="text-lg font-semibold">
          {initial ? "Edit Article" : "Create Article"}
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label}>Title</label>
          <input
            className={field}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Slug</label>
          <input
            className={field}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Thumbnail</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />

          {thumbnailUrl && (
            <div className="mt-3 overflow-hidden rounded-3xl border">
              <div className="aspect-[16/9]">
                <img
                  src={thumbnailUrl}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Content</label>
          <textarea
            className={field + " h-60"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label className={label}>Category</label>
          <select
            className={field}
            value={categoriesSelected[0] ?? ""}
            onChange={(e) =>
              setCategoriesSelected(e.target.value ? [Number(e.target.value)] : [])
            }
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Status</label>
          <select
            className={field}
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-2xl border px-4 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-2xl bg-primary-600 text-white px-4 py-2"
        >
          Save
        </button>
      </div>
    </form>
  );
}