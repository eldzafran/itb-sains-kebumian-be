import { http } from "../lib/http";

export type ApiCourse = {
  id: number;
  informasi_dasar: {
    program: string;
    opsiKeilmuan: string;
    spesialisasi: string;
    kodeMK: string;
    namaMK: string;
    sks: number;
  };
  deskripsi: string;
  capaian_pembelajaran: {
    cpps: string;
    cpmk: string;
    rps: string;
    etika: string;
  };
  learning_methods: {
    metode: string;
    implementasi: string;
    cpmk: string;
    cpl: string;
  }[];
  assessments: {
    komponen: string;
    rubrik: string;
    bobot: number;
    cpl: string;
  }[];
  created_at: string;
};

// ✅ Fetch all courses
export async function fetchAdminCourses() {
  return http<{ courses: ApiCourse[] }>("/api/courses/");
}

// ✅ Get single course
export async function getAdminCourse(id: number): Promise<ApiCourse> {
  const res = await http<{ course: ApiCourse }>(`/api/courses/${id}/`);
  return res.course;
}

// ✅ Delete course
export async function deleteCourse(id: number) {
  return http<{ message: string }>(`/api/courses/${id}/delete/`, { method: "DELETE" });
}

export type CoursePayload = {
  informasi_dasar: {
    program: string;
    opsiKeilmuan: string;
    spesialisasi: string;
    kodeMK: string;
    namaMK: string;
    sks: number;
  };
  deskripsi: string;
  capaian_pembelajaran: {
    cpps: string;
    cpmk: string;
    rps: string;
    etika: string;
  };
  learning_methods: {
    metode: string;
    implementasi: string;
    cpmk: string;
    cpl: string;
  }[];
  assessments: {
    komponen: string;
    rubrik: string;
    bobot: number;
    cpl: string;
  }[];
};

function buildFormData(p: CoursePayload) {
  const fd = new FormData();

  fd.append("program", p.informasi_dasar.program);
  fd.append("opsiKeilmuan", p.informasi_dasar.opsiKeilmuan);
  fd.append("spesialisasi", p.informasi_dasar.spesialisasi);
  fd.append("kodeMK", p.informasi_dasar.kodeMK);
  fd.append("namaMK", p.informasi_dasar.namaMK);
  fd.append("sks", String(p.informasi_dasar.sks));

  fd.append("deskripsi", p.deskripsi);

  fd.append("cpps", p.capaian_pembelajaran.cpps);
  fd.append("cpmk", p.capaian_pembelajaran.cpmk);
  fd.append("rps", p.capaian_pembelajaran.rps);
  fd.append("etika", p.capaian_pembelajaran.etika);

  for (const m of p.learning_methods) {
    fd.append("learning_methods[]metode", m.metode);
    fd.append("learning_methods[]implementasi", m.implementasi);
    fd.append("learning_methods[]cpmk", m.cpmk);
    fd.append("learning_methods[]cpl", m.cpl);
  }

  for (const a of p.assessments) {
    fd.append("assessments[]komponen", a.komponen);
    fd.append("assessments[]rubrik", a.rubrik);
    fd.append("assessments[]bobot", String(a.bobot));
    fd.append("assessments[]cpl", a.cpl);
  }

  return fd;
}

// ✅ Create course
export async function createCourse(payload: CoursePayload) {
  return http<{ message: string; course: ApiCourse }>("/api/courses/", {
    method: "POST",
    body: buildFormData(payload),
  });
}

// ✅ Update course
export async function updateCourse(id: number, payload: CoursePayload) {
  return http<{ message: string; course: ApiCourse }>(`/api/courses/${id}/`, {
    method: "POST",
    body: buildFormData(payload),
  });
}