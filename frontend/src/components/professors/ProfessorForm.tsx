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
  orcid_id?: string; 

  research_interest?: string;
  education_history?: string;
  publications?: string;
  research_projects?: string;
  community_service?: string;
  awards?: string;

  fotoUrl?: string;
  fotoFile?: File | null;
  is_active?: boolean; 
};

type Props = {
  initial?: ProfessorFormValues;
  existingNips?: string[];
  onCancel: () => void;
  onSubmit: (values: ProfessorFormValues) => void;
};

type Category = { id: number; name: string };
type Course = { id: number; course_name: string };

export default function ProfessorForm({
  initial,
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
    orcid_id: "",
    research_interest: "",
    education_history: "",
    publications: "",
    research_projects: "",
    community_service: "",
    awards: "",
    fotoUrl: "",
    fotoFile: null,
    is_active: true,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (initial) {
      setForm((prev) => ({
        ...prev,
        ...initial,
        // Pastikan mapping field dari backend (jika namanya beda) masuk ke sini
        kategori_ids: Array.isArray(initial.kategori_ids) ? initial.kategori_ids : [],
        course_ids: Array.isArray(initial.course_ids) ? initial.course_ids : [],
      }));
    }
  }, [initial]);

  useEffect(() => {
    async function loadData() {
      try {
        const catRes = await fetch(`${API_BASE}/api/lecturer-categories/`);
        const courseRes = await fetch(`${API_BASE}/api/courses/`);

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
  }, [API_BASE]);

  function handleChange(key: keyof ProfessorFormValues, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFile(file?: File | null) {
    if (!file) return;
    // Validasi sederhana di client (Optional tapi bagus untuk UX)
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file maksimal 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, fotoFile: file, fotoUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={submit} className="max-w-6xl mx-auto">
      {/* ================= INFORMASI DASAR ================= */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-12 mb-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Informasi Dasar Dosen</h2>
          <p className="text-sm text-slate-500 mt-2">Identitas utama dan metadata dosen.</p>
        </div>

        <div className="mb-10">
          <label className="block text-sm font-semibold text-slate-700 mb-3">Foto Profil * (Rasio 1:1, Max 2MB)</label>
          <div className="flex items-center gap-6">
            <div className="w-40 h-40 rounded-xl border bg-slate-100 flex items-center justify-center overflow-hidden border-dashed border-slate-300">
              {form.fotoUrl ? (
                <img src={form.fotoUrl} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <span className="text-sm text-slate-400">Preview</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input 
                type="file" 
                accept="image/*" 
                className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => handleFile(e.target.files?.[0])} 
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Nama Lengkap *" value={form.nama_dosen} onChange={(v)=>handleChange("nama_dosen",v)} />
          <Input label="NIP * (Harus Unik)" value={form.nip} onChange={(v)=>handleChange("nip",v)} />
          <Input label="Jabatan *" value={form.jabatan_fungsional} onChange={(v)=>handleChange("jabatan_fungsional",v)} />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Kategori *</label>
            <Select
              isMulti
              placeholder="Pilih Kategori..."
              options={categories.map((cat) => ({ value: cat.id, label: cat.name }))}
              value={categories
                .filter((cat) => form.kategori_ids?.includes(cat.id))
                .map((cat) => ({ value: cat.id, label: cat.name }))
              }
              onChange={(selected) => handleChange("kategori_ids", selected ? selected.map((item) => item.value) : [])}
            />
          </div>

          <Input label="Email" value={form.email} onChange={(v)=>handleChange("email",v)} />
          <Input label="Webpage (URL)" value={form.webpage} onChange={(v)=>handleChange("webpage",v)} />
          <Input label="SINTA ID" value={form.sinta_id} onChange={(v)=>handleChange("sinta_id",v)} />
          <Input label="Scopus Author ID" value={form.scopus_author_id} onChange={(v)=>handleChange("scopus_author_id",v)} />
          <Input label="Researcher ID" value={form.researcher_id} onChange={(v)=>handleChange("researcher_id",v)} />
          <Input label="ORCID ID" value={form.orcid_id} onChange={(v)=>handleChange("orcid_id",v)} />
        </div>
      </div>

      {/* ================= INFORMASI AKADEMIK ================= */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Informasi Akademik</h2>
          <p className="text-sm text-slate-500 mt-2">Maksimal 500 karakter per bagian.</p>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-700 mb-1">Mata Kuliah yang Diajar</label>
          <Select
            isMulti
            placeholder="Pilih Mata Kuliah..."
            options={courses.map((course) => ({ value: course.id, label: course.course_name }))}
            value={courses
              .filter((course) => form.course_ids?.includes(course.id))
              .map((course) => ({ value: course.id, label: course.course_name }))
            }
            onChange={(selected) => handleChange("course_ids", selected ? selected.map((item) => item.value) : [])}
          />
        </div>

        <div className="space-y-8">
          <WordEditor label="Research Interest" value={form.research_interest || ""} onChange={(val) => handleChange("research_interest", val)} />
          <WordEditor label="Riwayat Pendidikan" value={form.education_history || ""} onChange={(val) => handleChange("education_history", val)} />
          <WordEditor label="Publikasi" value={form.publications || ""} onChange={(val) => handleChange("publications", val)} />
          <WordEditor label="Proyek Penelitian" value={form.research_projects || ""} onChange={(val) => handleChange("research_projects", val)} />
          <WordEditor label="Pengabdian kepada Masyarakat" value={form.community_service || ""} onChange={(val) => handleChange("community_service", val)} />
          <WordEditor label="Award / Penghargaan" value={form.awards || ""} onChange={(val) => handleChange("awards", val)} />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-16 pb-10">
        <button type="button" onClick={onCancel} className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 transition">Batal</button>
        <button type="submit" className="px-8 py-3 rounded-xl bg-blue-600 text-white shadow hover:bg-blue-700 font-semibold transition">Simpan Data Dosen</button>
      </div>
    </form>
  );
}

function Input({ label, value, onChange }: { label: string; value?: string; onChange: (val: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        type="text"
        className="w-full border border-slate-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}