import { useEffect, useState } from "react";
import { fetchCategories } from "../../services/adminArticle";
import type { ApiCategory, Props } from "../../types/articles";

import WordEditor from "../../components/WordEditor";
import ThumbnailCrop from "../../components/ThumbnailCrop";

function getPlainText(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function slugify(text: string) {
  return (text || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ArticleForm({
  initial,
  onCancel,
  onSubmit,
}: Props) {
  // Inisialisasi state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState<"Draft" | "Published">("Draft");
  const [publishedAt, setPublishedAt] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [rawFile, setRawFile] = useState<File | null>(null);

  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [categoriesSelected, setCategoriesSelected] = useState<number[]>([]);

  // Gunakan nama 'files' agar sinkron dengan Serializer Django kamu
  const [files, setFiles] = useState<{ file_name: string; file_url: string }[]>([]);

  const field = "w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none";

  useEffect(() => {
    if (initial) {
      setTitle(initial.title ?? "");
      setContent(initial.content ?? "");
      setSlug(initial.slug ?? "");
      setStatus(initial.status ?? "Draft");
      setThumbnailUrl(initial.thumbnail ?? "");
      
      const mappedCats = initial.categories?.map((c: any) => (typeof c === 'number' ? c : c.id)) ?? [];
      setCategoriesSelected(mappedCats);
      if (initial.files) setFiles(initial.files);

      if (initial.published_at) {
        setPublishedAt(initial.published_at.split('T')[0]);
      }
    }
  }, [initial]);

  useEffect(() => {
    (async () => {
      const list = await fetchCategories();
      setCategories(list);

      // Default category jika buat baru
      if (!initial && !categoriesSelected.length && list.length) {
        setCategoriesSelected([list[0].id]);
      }
    })();
  }, [initial]);

  // --- 3. AUTO SLUG (Hanya saat Create) ---
  useEffect(() => {
    if (!initial) {
      const plain = getPlainText(title);
      setSlug(slugify(plain));
    }
  }, [title, initial]);

  function handleFile(file?: File | null) {
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      alert("Thumbnail max 3MB");
      return;
    }
    setRawFile(file); 
  }

  // --- LOGIKA TAMBAH DOKUMEN ---
  function addDoc() {
    setFiles((p) => [...p, { file_name: "", file_url: "" }]);
  }

  function updateDoc(i: number, key: string, val: string) {
    const copy = [...files];
    copy[i] = { ...copy[i], [key]: val };
    setFiles(copy);
  }

  function removeDoc(i: number) {
    setFiles((p) => p.filter((_, x) => x !== i));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!thumbnailFile && !thumbnailUrl) {
      alert("Thumbnail wajib");
      return;
    }

    onSubmit({
      title,
      slug,
      content,
      status,
      categories: categoriesSelected,
      thumbnailFile,
      published_at: publishedAt || null,
      files: files, // Dikirim ke service sebagai 'files'
    } as any);
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <section className="space-y-4">
        <h2 className="font-semibold text-lg">Artikel</h2>

        <WordEditor
          label="Judul Artikel"
          value={title}
          onChange={(val: string) => {
            const text = getPlainText(val);
            if (text.length <= 200) setTitle(val);
          }}
        />

        <WordEditor
          label="Konten Artikel"
          value={content}
          onChange={setContent}
        />

        <div>
          <label className="text-sm font-semibold">Thumbnail</label><br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              className="mt-3 rounded-2xl aspect-[16/9] w-64 object-cover border"
            />
          )}
        </div>

        <div>
          <label className="text-sm font-semibold">Kategori</label>
          <select
            className={field}
            value={categoriesSelected[0] ?? ""}
            onChange={(e) =>
              setCategoriesSelected(e.target.value ? [Number(e.target.value)] : [])
            }
          >
            <option value="">Pilih Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-lg">Pengaturan Publikasi</h2>
        <select
          className={field}
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>

        <input
          type="date"
          className={field}
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
        />
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">Link Dokumen</h2>
          <button 
            type="button" 
            onClick={addDoc}
            className="text-blue-600 text-sm font-semibold hover:underline"
          >
            + Tambah Dokumen
          </button>
        </div>

        {files.map((d, i) => (
          <div key={i} className="flex gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <input
              className={field}
              placeholder="Nama Dokumen"
              value={d.file_name ?? ""}
              onChange={(e) => updateDoc(i, "file_name", e.target.value)}
            />
            <input
              className={field}
              placeholder="Link Dokumen (URL)"
              value={d.file_url ?? ""}
              onChange={(e) => updateDoc(i, "file_url", e.target.value)}
            />
            <button 
              type="button" 
              onClick={() => removeDoc(i)}
              className="px-2 text-red-500 font-bold"
            >
              ✕
            </button>
          </div>
        ))}
      </section>

      <div className="flex gap-3 pt-4">
        <button 
          type="button" 
          onClick={onCancel}
          className="px-6 py-2 border rounded-xl hover:bg-slate-50"
        >
          Batal
        </button>
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
        >
          Simpan Artikel
        </button>
      </div>

      {rawFile && (
        <ThumbnailCrop
          file={rawFile}
          onCancel={() => setRawFile(null)}
          onDone={(file) => {
            setThumbnailFile(file);
            setRawFile(null);
            const reader = new FileReader();
            reader.onload = () => setThumbnailUrl(String(reader.result));
            reader.readAsDataURL(file);
          }}
        />
      )}
    </form>
  );
}