import React, { useState } from "react";
export type ProfessorFormValues = {
  nama_dosen: string;
  nidn: string;
  email?: string;
  fakultas: string;
  program_studi: string;
  penelitian: string;
  sinta_id?: string;
  researcher_id?: string;
  scopus_author_id?: string;
  orchid_id?: string;
  webpage?: string;
  pendidikan_s1?: string;
  pendidikan_s2?: string;
  pendidikan_s3?: string;
  pekerjaan?: string;
  research_interest?: string;
  mata_kuliah_diampu?: string;
  publikasi?: string;
  project?: string;
  pengabdian_masyarakat?: string;
  award?: string;
  fotoUrl?: string;
  fotoFile?: File | null;
};

export type ProfessorFormInitial = ProfessorFormValues & {
  id?: number;
  updatedAt?: string;
};

type Props = {
  initial?: ProfessorFormInitial | null;
  onCancel: () => void;
  onSubmit: (values: ProfessorFormValues) => void;
};

export default function ProfessorForm({ initial, onCancel, onSubmit }: Props) {
  const [form, setForm] = useState<ProfessorFormValues>({
    nama_dosen: initial?.nama_dosen ?? "",
    nidn: initial?.nidn ?? "",
    email: initial?.email ?? "",
    fakultas: initial?.fakultas ?? "",
    program_studi: initial?.program_studi ?? "",
    penelitian: initial?.penelitian ?? "",
    sinta_id: initial?.sinta_id ?? "",
    researcher_id: initial?.researcher_id ?? "",
    scopus_author_id: initial?.scopus_author_id ?? "",
    orchid_id: initial?.orchid_id ?? "",
    webpage: initial?.webpage ?? "",
    pendidikan_s1: initial?.pendidikan_s1 ?? "",
    pendidikan_s2: initial?.pendidikan_s2 ?? "",
    pendidikan_s3: initial?.pendidikan_s3 ?? "",
    pekerjaan: initial?.pekerjaan ?? "",
    research_interest: initial?.research_interest ?? "",
    mata_kuliah_diampu: initial?.mata_kuliah_diampu ?? "",
    publikasi: initial?.publikasi ?? "",
    project: initial?.project ?? "",
    pengabdian_masyarakat: initial?.pengabdian_masyarakat ?? "",
    award: initial?.award ?? "",
    fotoUrl: initial?.fotoUrl ?? "",
    fotoFile: null,
  });

  const field =
    "w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-300 focus:ring-4 focus:ring-primary-100";
  const label = "block text-sm font-semibold text-slate-700 mb-1";

  function handleChange(key: keyof ProfessorFormValues, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFile(file?: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    setForm((prev) => ({ ...prev, fotoFile: file }));

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, fotoUrl: String(reader.result || "") }));
    };
    reader.readAsDataURL(file);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

return (
  <form
    onSubmit={submit}
    className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200 space-y-8"
  >
    {/* TITLE */}
    <div>
      <h2 className="text-xl font-semibold text-slate-900">
        {initial ? "Edit Dosen" : "Tambah Dosen Baru"}
      </h2>
    </div>

    {/* FOTO PROFIL */}
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Foto Profil
      </label>

      <div className="flex flex-col gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="block w-full text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white"
        />

        <p className="text-xs text-slate-500">
          Format: JPG, PNG. Maksimal 5MB. Rekomendasi rasio 1:1 (600x600px)
        </p>
      </div>

      {form.fotoUrl && (
        <div className="mt-4 w-40 aspect-square rounded-xl overflow-hidden border">
          <img
            src={form.fotoUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>

    {/* GRID FORM */}
    <div className="grid gap-6 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Nama Lengkap
        </label>
        <input
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
          value={form.nama_dosen}
          onChange={(e) => handleChange("nama_dosen", e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          NIP / NIDN
        </label>
        <input
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
          value={form.nidn}
          onChange={(e) => handleChange("nidn", e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Jabatan Fungsional
        </label>
        <input
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
          placeholder="Contoh: Profesor, Lektor Kepala"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Email
        </label>
        <input
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Webpage
        </label>
        <input
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
          placeholder="https://example.com/profile"
          value={form.webpage}
          onChange={(e) => handleChange("webpage", e.target.value)}
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Bidang Penelitian
        </label>
        <textarea
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm h-24"
          placeholder="Machine Learning, Artificial Intelligence..."
          value={form.research_interest}
          onChange={(e) =>
            handleChange("research_interest", e.target.value)
          }
        />
      </div>
    </div>

    {/* DIVIDER */}
    <hr className="border-slate-200" />

    {/* IDENTITAS RISET */}
    <div>
      <h3 className="text-base font-semibold text-slate-900 mb-6">
        Identitas Riset & Akademik
      </h3>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Google Scholar ID
          </label>
          <input
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
            value={form.sinta_id}
            onChange={(e) => handleChange("sinta_id", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Scopus ID
          </label>
          <input
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
            value={form.scopus_author_id}
            onChange={(e) =>
              handleChange("scopus_author_id", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            ORCID
          </label>
          <input
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
            value={form.orchid_id}
            onChange={(e) => handleChange("orchid_id", e.target.value)}
          />
        </div>
      </div>
    </div>

    {/* ACTION BUTTONS */}
    <div className="flex justify-end gap-3 pt-4">
      <button
        type="button"
        onClick={onCancel}
        className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
      >
        Batal
      </button>

      <button
        type="submit"
        className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
      >
        Simpan
      </button>
    </div>
  </form>
);
}