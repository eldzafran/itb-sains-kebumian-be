import { useEffect, useState } from "react";
import { fetchCategories } from "../../services/adminArticle";
import type { ApiCategory, Props } from "../../types/articles";
import { UploadCloud, Plus, FileText, Edit3, Trash2, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

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
    if (files.length < 5) {
      setFiles((p) => [...p, { file_name: "", file_url: "" }]);
    }
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
    <form onSubmit={submit} className="max-w-6xl mx-auto space-y-6 pb-20">
      
      {/* 1. KONTEN UTAMA (FULL WIDTH) */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="font-bold text-xl text-slate-800 border-b pb-4">Konten Artikel</h2>
        <WordEditor
          label="Judul Artikel*" 
          value={title}
          onChange={(val: string) => {
            const text = getPlainText(val);
            if (text.length <= 200) setTitle(val);
          }}
        />
        <div className="space-y-2">
          <WordEditor label="Konten Utama*" value={content} onChange={setContent} />
        </div>
      </section>

      {/* 2. PENGATURAN & THUMBNAIL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <h2 className="font-bold text-lg text-slate-800 border-b pb-4">Publikasi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Status</label>
              <select className={field} value={status} onChange={(e) => setStatus(e.target.value as any)}>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Kategori*</label>
              <select className={field} value={categoriesSelected[0] ?? ""} onChange={(e) => setCategoriesSelected(e.target.value ? [Number(e.target.value)] : [])}>
                <option value="">Pilih Kategori</option>
                {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Tanggal Publikasi</label>
              <input type="date" className={field} value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
            </div>
          </div>
        </div>

        {/* THUMBNAIL (ASPECT 16:9) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-bold text-lg text-slate-800 border-b pb-4">Thumbnail*</h2>
          <div className="relative group cursor-pointer border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden hover:border-blue-400 transition-all aspect-video flex items-center justify-center bg-slate-50">
            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleFile(e.target.files?.[0])} />
            {thumbnailUrl ? (
              <img src={thumbnailUrl} className="w-full h-full object-cover" alt="Preview" />
            ) : (
              <div className="text-center p-4">
                <UploadCloud className="mx-auto text-slate-400 mb-2" size={32} />
                <p className="text-xs text-slate-500 font-medium">Upload Image</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. SECTION DOKUMEN (LIMIT 5) */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg text-slate-800">Lampiran Dokumen</h2>
            <p className="text-sm text-slate-400">Maksimal 5 dokumen pendukung ({files.length}/5)</p>
          </div>
          
          {/* Tombol akan hilang jika sudah 5 */}
          {files.length < 5 && (
            <button type="button" onClick={addDoc} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-md shadow-blue-100">
              <Plus size={18} /> Tambah Link
            </button>
          )}
        </div>

        <div className="space-y-3">
          {files.map((d, i) => (
            <div key={i} className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-blue-200 hover:bg-white hover:shadow-sm transition-all">
              <div className="p-3 rounded-xl bg-white border border-slate-100 text-blue-600 shadow-sm">
                <FileText size={24} />
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                {/* Field Nama Dokumen Tanpa Icon */}
                <input 
                  className={field} 
                  placeholder="Nama Dokumen (Contoh: Panduan Pendaftaran)" 
                  value={d.file_name} 
                  onChange={(e) => updateDoc(i, "file_name", e.target.value)} 
                />
                
                {/* Field URL dengan Icon Link */}
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-2.5 text-slate-400" size={16} />
                  <input 
                    className={`${field} pl-10`} 
                    placeholder="URL (https://...)" 
                    value={d.file_url} 
                    onChange={(e) => updateDoc(i, "file_url", e.target.value)} 
                  />
                </div>
              </div>

              <button type="button" onClick={() => removeDoc(i)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          {files.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30">
              <FileText className="mx-auto text-slate-200 mb-2" size={40} />
              <p className="text-slate-400 text-sm italic">Belum ada dokumen yang dilampirkan.</p>
            </div>
          )}
        </div>
      </section>

      <div className="flex justify-end gap-3 pt-6 border-t">
        <button type="button" onClick={onCancel} className="px-8 py-3 bg-white text-slate-600 font-bold border border-slate-200 rounded-xl hover:bg-slate-50 transition">
          Batal
        </button>
        <button type="submit" className="px-12 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition active:scale-[0.98]">
          Simpan Artikel
        </button>
      </div>

      {/* CROPPER MODAL */}
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