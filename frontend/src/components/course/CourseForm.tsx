import { useEffect, useState, type SubmitEvent } from "react";
import WordEditor from "../../components/WordEditor";

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
  const [errors, setErrors] = useState<{ study_option?: string; specialization?: string; }>({});
  const [ethics_note, setEthicsNote] = useState("");

  const [methods, setMethods] = useState<MethodType[]>([{ method: "", implementation: "", cpmk: "", cpl: "" }]);
  const [assessments, setAssessments] = useState<AssessmentType[]>([{ component: "", rubric: "", weight: 0, cpl: "" }]);

  const field = "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm";
  const label = "block text-sm font-semibold text-slate-700 mb-1";

  function addMethod() { setMethods([...methods, { method: "", implementation: "", cpmk: "", cpl: "" }]); }
  function removeMethod(i: number) { setMethods(methods.filter((_, idx) => idx !== i)); }
  function addAssessment() { if (assessments.length >= 10) return; setAssessments([...assessments, { component: "", rubric: "", weight: 0, cpl: "" }]); }
  function removeAssessment(i: number) { setAssessments(assessments.filter((_, idx) => idx !== i)); }

    useEffect(() => {
    if (!initialData) return;
    setProgram(initialData?.program ?? "");
    setStudyOption(initialData?.study_option ?? "");
    setSpecialization(initialData?.specialization ?? "");
    setCourseCode(initialData?.course_code ?? "");
    setCourseName(initialData?.course_name ?? "");
    setSks(initialData?.sks ?? 3);
    setDescription(initialData?.description ?? "");
    setCpps(initialData?.cpps ?? "");
    setCpmk(initialData?.cpmk ?? "");
    setWeeklyPlan(initialData?.weekly_plan ?? "");
    setEthicsNote(initialData?.ethics_note ?? "");

    setMethods(
      Array.isArray(initialData?.methods) && initialData.methods.length > 0
        ? initialData.methods
        : [{ method: "", implementation: "", cpmk: "", cpl: "" }]
    );

    setAssessments(
      Array.isArray(initialData?.assessments) && initialData.assessments.length > 0
        ? initialData.assessments
        : [{ component: "", rubric: "", weight: 0, cpl: "" }]
    );
}, [initialData]);

useEffect(() => {
  if (program === "S3 Doktoral") {
    setStudyOption("sains_kebumian"); 
  } else if (program === "S2 Magister") {
    setStudyOption(""); 
  }
}, [program]);

function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: { study_option?: string; specialization?: string } = {};

   if (program === "S2 Magister" && !study_option) {
    newErrors.study_option = "Opsi Keilmuan wajib dipilih.";
  }

  if (program === "S2 Magister" && !specialization) {
    newErrors.specialization = "Spesialisasi wajib dipilih.";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    alert("Harap lengkapi semua pilihan untuk program S2.");
    return;
  }

    const totalWeight = assessments.reduce((sum: number, a: AssessmentType) => sum + Number(a.weight), 0);
    if (totalWeight > 100) { alert("Total bobot asesmen tidak boleh melebihi 100%"); return; }

    const payload = {
      program,
      study_option,
      specialization,
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
    };

    onSubmit(payload);
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <h2 className="text-xl font-bold">Create Course</h2>

      <section className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="font-semibold border-b pb-2">Informasi Dasar</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Program<span className="text-red-500">*</span></label>
            <select className={field} value={program} onChange={e => setProgram(e.target.value)}>
              <option value="">— Pilih Program —</option>
              <option value="S2 Magister">S2 Magister</option>
              <option value="S3 Doktoral">S3 Doktoral</option>
            </select>
          </div>
          {program === "S2 Magister" && (
            <div>
              <label className={label}>Opsi Keilmuan<span className="text-red-500">*</span></label>
              <select className={field} value={study_option} onChange={e => setStudyOption(e.target.value)}>
                <option value="">— Pilih Opsi —</option>
                <option value="Sains Atmosfer">Sains Atmosfer</option>
                <option value="Oseanografi">Oseanografi</option>
                <option value="Interaksi Sistem Bumi">Interaksi Sistem Bumi</option>
              </select>
            </div>
          )}
          {program === "S3 Doktoral" && (
            <div>
              <label className={label}>Opsi Keilmuan<span className="text-red-500">*</span></label>
              <select 
                className={field} 
                value={study_option}
                onChange={e => setStudyOption(e.target.value)}
              >
                <option value="Sains Kebumian">Sains Kebumian</option>
              </select>
              <p className="text-xs text-blue-600 mt-1">* Otomatis terpilih untuk program S3</p>
            </div>
          )}
          {program === "S2 Magister" && (
            <div>
              <label className={label}>Spesialisasi<span className="text-slate-500 text-xs">(opsional)</span></label>
              <select className={field} value={specialization} onChange={e => setSpecialization(e.target.value)}>
                <option value="">— Pilih Spesialisasi —</option>
                <option value="Perubahan Iklim & Transisi Energi">Perubahan Iklim & Transisi Energi</option>
                <option value="Mitigasi Bencana Kebumian">Mitigasi Bencana Kebumian</option>
              </select>
            </div>
          )}

          <div>
            <label className={label}>Kode MK<span className="text-red-500">*</span></label>
            <input className={field} value={course_code} onChange={e => setCourseCode(e.target.value)} maxLength={20} />
          </div>
          <div>
            <label className={label}>Nama MK<span className="text-red-500">*</span></label>
            <input className={field} value={course_name} onChange={e => setCourseName(e.target.value)} maxLength={200} />
          </div>
          <div>
            <label className={label}>SKS<span className="text-red-500">*</span></label>
            <input type="number" className={field} value={sks} onChange={e => setSks(Number(e.target.value))} min={1} />
          </div>
        </div>
      </section>

      {/* Deskripsi */}
      <section className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="font-semibold border-b pb-2">Deskripsi Singkat<span className="text-red-500">*</span></h3>
        <WordEditor label="Deskripsi" value={description} onChange={setDescription} />
      </section>

      {/* Capaian */}
      <section className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="font-semibold border-b pb-2">Capaian Pembelajaran<span className="text-red-500">*</span></h3>
        <WordEditor label="CPPS" value={cpps} onChange={setCpps} />
        <WordEditor label="CPMK" value={cpmk} onChange={setCpmk} />
        <WordEditor label="Rencana Mingguan" value={weekly_plan} onChange={setWeeklyPlan} />
        <WordEditor label="Etika Akademik" value={ethics_note} onChange={setEthicsNote} />
      </section>

      {/* Methods */}
      <section className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="font-semibold border-b pb-2">Metode Pembelajaran<span className="text-red-500">*</span></h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-left">
              <th>Metode</th><th>Implementasi</th><th>CPMK</th><th>CPL</th><th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {methods.map((m,i)=>(
              <tr key={i}>
                <td><input className={field} value={m.method} onChange={e=>{const arr=[...methods];arr[i].method=e.target.value;setMethods(arr)}}/></td>
                <td><input className={field} value={m.implementation} onChange={e=>{const arr=[...methods];arr[i].implementation=e.target.value;setMethods(arr)}}/></td>
                <td><input className={field} value={m.cpmk} onChange={e=>{const arr=[...methods];arr[i].cpmk=e.target.value;setMethods(arr)}}/></td>
                <td><input className={field} value={m.cpl} onChange={e=>{const arr=[...methods];arr[i].cpl=e.target.value;setMethods(arr)}}/></td>
                <td><button type="button" onClick={()=>removeMethod(i)} className="text-red-600">Hapus</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={addMethod} className="bg-blue-600 text-white px-3 py-1 rounded">+ Tambah Metode</button>
      </section>

      {/* Assessments */}
      <section className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="font-semibold border-b pb-2">Asesmen<span className="text-red-500">*</span></h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-left">
              <th>Komponen</th><th>Rubrik</th><th>Bobot</th><th>CPL</th><th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((a,i)=>(
              <tr key={i}>
                <td><input className={field} value={a.component} onChange={e=>{const arr=[...assessments];arr[i].component=e.target.value;setAssessments(arr)}}/></td>
                <td><input className={field} value={a.rubric} onChange={e=>{const arr=[...assessments];arr[i].rubric=e.target.value;setAssessments(arr)}}/></td>
                <td><input type="number" className={field} value={a.weight} onChange={e=>{const arr=[...assessments];arr[i].weight=Number(e.target.value);setAssessments(arr)}}/></td>
                <td><input className={field} value={a.cpl} onChange={e=>{const arr=[...assessments];arr[i].cpl=e.target.value;setAssessments(arr)}}/></td>
                <td><button type="button" onClick={()=>removeAssessment(i)} className="text-red-600">Hapus</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={addAssessment} className="bg-blue-600 text-white px-3 py-1 rounded">+ Tambah Asesmen</button>
      </section>

      <div className="flex gap-2">
        <button type="button" onClick={onCancel} className="border px-4 py-2 rounded-xl">Cancel</button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl">Save</button>
      </div>
    </form>
  );
}