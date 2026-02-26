import { useEffect, useState, useMemo } from "react";
import WordEditor from "../../components/WordEditor";
import { getCourseMetadata } from "../../services/adminCourse";
import type { MetaDataType, choice } from "../../types/course";

type MethodType = { method: string; implementation: string; cpmk: string; cpl: string };
type AssessmentType = { component: string; rubric: string; weight: number; cpl: string };

interface CourseFormProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function CourseForm({ onCancel, onSubmit, initialData }: CourseFormProps) {
  const [program, setProgram] = useState("");
  const [study_option, setStudyOption] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [course_code, setCourseCode] = useState("");
  const [course_name, setCourseName] = useState("");
  const [sks, setSks] = useState(3);

  const [description, setDescription] = useState("");
  const [cpps, setCpps] = useState("");
  const [cpmk, setCpmk] = useState("");
  const [weekly_plan, setWeeklyPlan] = useState("");
  const [ethics_note, setEthicsNote] = useState("");

  const [metaData, setMetaData] = useState<MetaDataType>({
    programs: [],
    study_options: [],
    specializations: []
  });

  const [methods, setMethods] = useState<MethodType[]>([
    { method: "", implementation: "", cpmk: "", cpl: "" }
  ]);

  const [assessments, setAssessments] = useState<AssessmentType[]>([
    { component: "", rubric: "", weight: 0, cpl: "" }
  ]);

  const field = "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm";
  const label = "block text-sm font-semibold text-slate-700 mb-1";

  /* ================= METADATA ================= */

  useEffect(() => {
    getCourseMetadata().then(setMetaData).catch(console.error);
  }, []);

  /* ================= EDIT MODE ================= */

  useEffect(() => {
    if (!initialData) return;

    setProgram(initialData.program ?? "");
    setStudyOption(initialData.study_option ?? "");
    setSpecialization(initialData.specialization ?? "");
    setCourseCode(initialData.course_code ?? "");
    setCourseName(initialData.course_name ?? "");
    setSks(initialData.sks ?? 3);

    setDescription(initialData.description ?? "");
    setCpps(initialData.cpps ?? "");
    setCpmk(initialData.cpmk ?? "");
    setWeeklyPlan(initialData.weekly_plan ?? "");
    setEthicsNote(initialData.ethics_note ?? "");

    if (initialData.methods?.length) setMethods(initialData.methods);
    if (initialData.assessments?.length) setAssessments(initialData.assessments);
  }, [initialData]);

  /* ================= CONDITIONAL RULE ================= */

  useEffect(() => {
    if (program === "S3") {
      setStudyOption("KEBUMIAN");
      setSpecialization("");
    }

    if (program === "S2" && study_option === "KEBUMIAN") {
      setStudyOption("");
    }
  }, [program]);

  /* ================= FILTER OPTIONS ================= */

  const filteredStudyOptions = useMemo(() => {
    if (program === "S3") {
      return metaData.study_options.filter(o => o.value === "KEBUMIAN");
    }
    return metaData.study_options.filter(o => o.value !== "KEBUMIAN");
  }, [metaData.study_options, program]);

  const showSpecialization = program === "S2";

  /* ================= METHODS ================= */

  const addMethod = () => {
    if (methods.length < 10)
      setMethods([...methods, { method: "", implementation: "", cpmk: "", cpl: "" }]);
  };

  const removeMethod = (i: number) =>
    setMethods(methods.filter((_, idx) => idx !== i));

  /* ================= ASSESSMENTS ================= */

  const addAssessment = () => {
    if (assessments.length < 10)
      setAssessments([...assessments, { component: "", rubric: "", weight: 0, cpl: "" }]);
  };

  const removeAssessment = (i: number) =>
    setAssessments(assessments.filter((_, idx) => idx !== i));


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const totalWeight = assessments.reduce((s, a) => s + Number(a.weight), 0);
    if (totalWeight > 100) return alert("Total bobot asesmen melebihi 100%");

    onSubmit({
      program,
      study_option,
      specialization: specialization || null,
      course_code,
      course_name,
      sks,
      description,
      cpps,
      cpmk,
      weekly_plan,
      ethics_note,
      methods,
      assessments
    });
  };

  /* ================= UI ================= */

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold">Course Form</h2>

      {/* BASIC */}
      <section className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="font-semibold border-b pb-2">Informasi Dasar</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Program</label>
            <select className={field} value={program} onChange={e => setProgram(e.target.value)}>
              <option value="">— Pilih Program —</option>
              {metaData.programs.map((p: choice) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          {/* STUDY OPTION */}
          <div>
            <label className={label}>Opsi Keilmuan</label>
            <select
              className={field}
              value={study_option}
              onChange={e => setStudyOption(e.target.value)} disabled={program === "S3"}
              required
            >
              <option value="">— Pilih Opsi —</option>
              {filteredStudyOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* SPECIALIZATION CONDITIONAL */}
          {showSpecialization && (
            <div>
              <label className={label}>Spesialisasi</label>
              <select
                className={field}
                value={specialization}
                onChange={e => setSpecialization(e.target.value)}
              >
                <option value="">— Pilih Spesialisasi —</option>
                {metaData.specializations.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className={label}>Kode MK</label>
            <input className={field} value={course_code} onChange={e => setCourseCode(e.target.value)} required />
          </div>

          <div>
            <label className={label}>Nama MK</label>
            <input className={field} value={course_name} onChange={e => setCourseName(e.target.value)} required />
          </div>

          <div>
            <label className={label}>SKS</label>
            <input type="number" className={field} value={sks} onChange={e => setSks(Number(e.target.value))} />
          </div>
        </div>
      </section>

      {/* DESKRIPSI */}
      <section className="bg-white p-6 rounded-xl shadow space-y-4">
        <WordEditor label="Deskripsi" value={description} onChange={setDescription} />
        <WordEditor label="CPPS" value={cpps} onChange={setCpps} />
        <WordEditor label="CPMK" value={cpmk} onChange={setCpmk} />
        <WordEditor label="Rencana Mingguan" value={weekly_plan} onChange={setWeeklyPlan} />
        <WordEditor label="Etika Akademik" value={ethics_note} onChange={setEthicsNote} />
      </section>

{/* Methods */}
      <section className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="font-semibold border-b pb-2">Metode Pembelajaran</h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-left">
              <th className="p-2 border">Metode</th>
              <th className="p-2 border">Implementasi (Max 200)</th>
              <th className="p-2 border">CPMK</th>
              <th className="p-2 border">CPL</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {methods.map((m, i) => (
              <tr key={i}>
                <td className="p-1 border"><input className="w-full outline-none" value={m.method} onChange={e => { const a = [...methods]; a[i].method = e.target.value; setMethods(a); }} /></td>
                <td className="p-1 border"><input className="w-full outline-none" maxLength={200} value={m.implementation} onChange={e => { const a = [...methods]; a[i].implementation = e.target.value; setMethods(a); }} /></td>
                <td className="p-1 border"><input className="w-full outline-none" value={m.cpmk} onChange={e => { const a = [...methods]; a[i].cpmk = e.target.value; setMethods(a); }} /></td>
                <td className="p-1 border"><input className="w-full outline-none" value={m.cpl} onChange={e => { const a = [...methods]; a[i].cpl = e.target.value; setMethods(a); }} /></td>
                <td className="p-1 border text-center"><button type="button" onClick={() => removeMethod(i)} className="text-red-600">Hapus</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" disabled={methods.length >= 10} onClick={addMethod} className="text-blue-600 font-medium disabled:text-slate-400">+ Tambah Metode</button>
      </section>

      {/* Assessments */}
      <section className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="font-semibold border-b pb-2">Asesmen</h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-left">
              <th className="p-2 border">Komponen</th>
              <th className="p-2 border">Rubrik</th>
              <th className="p-2 border">Bobot (%)</th>
              <th className="p-2 border">CPL</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((a, i) => (
              <tr key={i}>
                <td className="p-1 border"><input className="w-full outline-none" value={a.component} onChange={e => { const arr = [...assessments]; arr[i].component = e.target.value; setAssessments(arr); }} /></td>
                <td className="p-1 border"><input className="w-full outline-none" value={a.rubric} onChange={e => { const arr = [...assessments]; arr[i].rubric = e.target.value; setAssessments(arr); }} /></td>
                <td className="p-1 border"><input type="number" className="w-full outline-none" value={a.weight} onChange={e => { const arr = [...assessments]; arr[i].weight = Number(e.target.value); setAssessments(arr); }} /></td>
                <td className="p-1 border"><input className="w-full outline-none" value={a.cpl} onChange={e => { const arr = [...assessments]; arr[i].cpl = e.target.value; setAssessments(arr); }} /></td>
                <td className="p-1 border text-center"><button type="button" onClick={() => removeAssessment(i)} className="text-red-600">Hapus</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" disabled={assessments.length >= 10} onClick={addAssessment} className="text-blue-600 font-medium disabled:text-slate-400">+ Tambah Asesmen</button>
      </section>

      <div className="flex gap-2">
        <button type="button" onClick={onCancel} className="border px-4 py-2 rounded-xl">Cancel</button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl">Save</button>
      </div>
    </form>
  );
}