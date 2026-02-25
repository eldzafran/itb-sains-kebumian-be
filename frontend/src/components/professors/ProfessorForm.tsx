import React, { useEffect, useState } from "react";
import WordEditor from "../WordEditor";
import Select from "react-select";

export type ProfessorFormValues = {
  nama_dosen: string;
  nip: string;
  jabatan_fungsional: string;
  kategori_ids: number[];
  course_ids: number[];

  email?: string;
  webpage?: string;

  sinta_id?: string;
  researcher_id?: string;
  scopus_author_id?: string;
  orchid_id?: string;

  research_interest?: string;
  education_history?: string;
  publications?: string;
  research_projects?: string;
  community_service?: string;
  awards?: string;

  fotoUrl?: string;
  fotoFile?: File | null;
};

type Props = {
  existingNips?: string[];
  onCancel: () => void;
  onSubmit: (values: ProfessorFormValues) => void;
};

type Category = { id: number; name: string };
type Course = { id: number; course_name: string };

export default function ProfessorForm({
  existingNips = [],
  onCancel,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<ProfessorFormValues>({
    nama_dosen: "",
    nip: "",
    jabatan_fungsional: "",
    kategori_ids: [],
    course_ids: [],
    email: "",
    webpage: "",
    sinta_id: "",
    researcher_id: "",
    scopus_author_id: "",
    orchid_id: "",
    research_interest: "",
    education_history: "",
    publications: "",
    research_projects: "",
    community_service: "",
    awards: "",
    fotoUrl: "",
    fotoFile: null,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function loadData() {
      try {
        const catRes = await fetch(`${API_BASE}/api/lecturer-categories`);
        const courseRes = await fetch(`${API_BASE}/api/courses`);

        const catData = await catRes.json();
        const courseData = await courseRes.json();

        const extractArray = (data: any) => {
          if (Array.isArray(data)) return data;
          if (Array.isArray(data?.results)) return data.results;
          if (Array.isArray(data?.data)) return data.data;
          if (Array.isArray(data?.data?.results)) return data.data.results;
          return [];
        };

        setCategories(extractArray(catData));
        setCourses(extractArray(courseData));
      } catch (err) {
        console.error("Load error:", err);
      }
    }

    loadData();
  }, []);

  function handleChange(key: keyof ProfessorFormValues, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function stripHtml(html: string) {
    return html.replace(/<[^>]*>?/gm, "");
  }

  function validateEditorLength(value: string) {
    return stripHtml(value).length <= 500;
  }

  function validateEmail(email: string) {
    return email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : true;
  }

  function validateURL(url: string) {
    return url ? /^(https?:\/\/[^\s]+)$/.test(url) : true;
  }

  function handleFile(file?: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("File harus berupa gambar");
    if (file.size > 2 * 1024 * 1024) return alert("Ukuran file maksimal 2MB");

    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    img.onload = () => {
      if (img.width !== img.height)
        return alert("Foto harus rasio 1:1");

      setForm((prev) => ({
        ...prev,
        fotoFile: file,
        fotoUrl: img.src,
      }));
    };

    reader.readAsDataURL(file);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.fotoUrl) return alert("Foto wajib diisi");
    if (!form.nama_dosen) return alert("Nama wajib diisi");
    if (!form.nip) return alert("NIP wajib diisi");
    if (existingNips.includes(form.nip))
      return alert("NIP sudah digunakan (harus unik)");
    if (!form.jabatan_fungsional) return alert("Jabatan wajib diisi");
    if (!form.kategori_ids.length)
      return alert("Minimal pilih 1 kategori");

    if (!validateEmail(form.email || ""))
      return alert("Format email tidak valid");

    if (!validateURL(form.webpage || ""))
      return alert("Format URL tidak valid");

    const editors = [
      form.research_interest,
      form.education_history,
      form.publications,
      form.research_projects,
      form.community_service,
      form.awards,
    ];

    for (const field of editors) {
      if (field && !validateEditorLength(field))
        return alert("Maksimal 500 karakter (tanpa HTML)");
    }

    onSubmit(form);
  }

  return (
    <form onSubmit={submit} className="max-w-6xl mx-auto">

      {/* ================= INFORMASI DASAR ================= */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-12 mb-24">

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900">
            Informasi Dasar Dosen
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Identitas utama dan metadata dosen.
          </p>
        </div>

        {/* FOTO */}
        <div className="mb-10">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Foto Profil *
          </label>

          <div className="flex items-center gap-6">
            <div className="w-40 h-40 rounded-xl border bg-slate-100 flex items-center justify-center overflow-hidden">
              {form.fotoUrl ? (
                <img src={form.fotoUrl} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm text-slate-400">Preview</span>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files?.[0])}
              className="text-sm"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Nama Lengkap *" value={form.nama_dosen} onChange={(v)=>handleChange("nama_dosen",v)} />
          <Input label="NIP *" value={form.nip} onChange={(v)=>handleChange("nip",v)} />
          <Input label="Jabatan *" value={form.jabatan_fungsional} onChange={(v)=>handleChange("jabatan_fungsional",v)} />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Kategori *
            </label>
            <Select
              isMulti
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
              value={categories
                .filter((cat) => form.kategori_ids.includes(cat.id))
                .map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                }))
              }
              onChange={(selected) =>
                setForm({
                  ...form,
                  kategori_ids: selected
                    ? selected.map((item) => item.value)
                    : [],
                })
              }
            />
          </div>

          <Input label="Email" value={form.email} onChange={(v)=>handleChange("email",v)} />
          <Input label="Webpage" value={form.webpage} onChange={(v)=>handleChange("webpage",v)} />
          <Input label="SINTA ID" value={form.sinta_id} onChange={(v)=>handleChange("sinta_id",v)} />
          <Input label="Researcher ID" value={form.researcher_id} onChange={(v)=>handleChange("researcher_id",v)} />
          <Input label="Scopus Author ID" value={form.scopus_author_id} onChange={(v)=>handleChange("scopus_author_id",v)} />
          <Input label="ORCID ID" value={form.orchid_id} onChange={(v)=>handleChange("orchid_id",v)} />
        </div>
      </div>


      {/* ================= INFORMASI AKADEMIK ================= */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-12">

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900">
            Informasi Akademik
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Data pengajaran dan rekam jejak akademik.
          </p>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Mata Kuliah yang Diajar
          </label>
          <Select
            isMulti
            options={courses.map((course) => ({
              value: course.id,
              label: course.course_name,
            }))}
            value={courses
              .filter((course) => form.course_ids.includes(course.id))
              .map((course) => ({
                value: course.id,
                label: course.course_name,
              }))
            }
            onChange={(selected) =>
              setForm({
                ...form,
                course_ids: selected
                  ? selected.map((item) => item.value)
                  : [],
              })
            }
          />
        </div>

        <div className="mb-8">
          <WordEditor
            label="Research Interest"
            value={form.research_interest || ""}
            onChange={(val) => handleChange("research_interest", val)}
          />
        </div>

        <div className="mb-8">
          <WordEditor
            label="Riwayat Pendidikan"
            value={form.education_history || ""}
            onChange={(val) => handleChange("education_history", val)}
          />
        </div>

        <div className="mb-8">
          <WordEditor
            label="Publikasi"
            value={form.publications || ""}
            onChange={(val) => handleChange("publications", val)}
          />
        </div>

        <div className="mb-8">
          <WordEditor
            label="Proyek Penelitian"
            value={form.research_projects || ""}
            onChange={(val) => handleChange("research_projects", val)}
          />
        </div>

        <div className="mb-8">
          <WordEditor
            label="Pengabdian kepada Masyarakat"
            value={form.community_service || ""}
            onChange={(val) => handleChange("community_service", val)}
          />
        </div>

        <div className="mb-8">
          <WordEditor
            label="Award / Penghargaan"
            value={form.awards || ""}
            onChange={(val) => handleChange("awards", val)}
          />
        </div>
      </div>

      {/* BUTTON DI LUAR CARD */}
      <div className="flex justify-end gap-4 mt-16">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-xl border border-slate-300"
        >
          Batal
        </button>

        <button
          type="submit"
          className="px-8 py-3 rounded-xl bg-blue-600 text-white shadow"
        >
          Simpan
        </button>
      </div>

    </form>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}