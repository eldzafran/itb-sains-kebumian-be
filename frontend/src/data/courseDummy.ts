export type BulletItem = {
  id: number;
  text: string;
};

export type MethodRow = {
  metode: string;
  penjelasan: string;
  cpmk: string;
  cpl: string;
};

export type AssessmentRow = {
  komponen: string;
  bentuk: string;
  bobot: string;
  cpl: string;
};

export type Course = {
  id: number;
  code: string;
  sks: string;
  title: string;
  deskripsi: string;
  cpps: BulletItem[];
  cpmk: BulletItem[];
  metode: MethodRow[];
  rps: BulletItem[];
  asesmen: AssessmentRow[];
  etika: string;
};

const baseCourse = (id: number, code: string, title: string): Course => ({
  id,
  code,
  sks: "3 SKS",
  title,
  deskripsi:
    "Pendalaman metode numerik untuk pemodelan proses kebumian, validasi model, serta pengembangan simulasi berbasis data observasi.",

  cpps: [
    { id: 1, text: "CPL-1: Penguasaan konsep/prinsip sains kebumian" },
    { id: 2, text: "CPL-2: Analisis kuantitatif & pemodelan" },
    { id: 3, text: "CPL-3: Riset mandiri bermutu (teks/publikasi)" },
    { id: 4, text: "CPL-4: Komunikasi ilmiah" },
    { id: 5, text: "CPL-5: Etika/profesional dalam riset" },
  ],

  cpmk: [ 
    { id: 1, text: "CPL-1: Penguasaan konsep/prinsip sains kebumian" },
    { id: 2, text: "CPL-2: Analisis kuantitatif & pemodelan" },
    { id: 3, text: "CPL-3: Riset mandiri bermutu (teks/publikasi)" },
    { id: 4, text: "CPL-4: Komunikasi ilmiah" },
    { id: 5, text: "CPL-5: Etika/profesional dalam riset" },
  ],

  metode: [
    {
      metode: "CBL",
      penjelasan: "Analisis stabilitas skema pada kasus adveksi-difusi",
      cpmk: "CPMK-1",
      cpl: "CPL-1",
    },
    {
      metode: "PBL (project-based)",
      penjelasan: "Proyek mini membangun solver 1D/2D + validasi data",
      cpmk: "CPMK-2",
      cpl: "CPL-2, CPL-3",
    },
    {
      metode: "Praktikum/Simulasi",
      penjelasan: "Eksperimen numerik (uji grid/time-step)",
      cpmk: "CPMK-2",
      cpl: "CPL-2",
    },
    {
      metode: "Journal Club & Presentasi",
      penjelasan: "Bedah Artikel & presentasi hasil",
      cpmk: "CPMK-3",
      cpl: "CPL-24, CPL-5",
    },
  ],

  rps: [
    { id: 1, text: "M1: Tinjauan PDE & Skema numerik; uji konsistensi (CBL)" },
    { id: 2, text: "M2-3: Skema eksplit/implisit; stabilitas (Non Neumann)" },
    { id: 3, text: "M4: Difusi/Adveksi 1D;hands-on solver" },
    { id: 4, text: "M5–6: 2D discretization & boundary; validasi" },
    { id: 5, text: "M7: Seminar tengah – presentasi progress proyek" },
    { id: 6, text: "M8–10: Optimasi numerik & verifikasi/validasi (V&V)." },
    { id: 7, text: "M11–12: Assimilasi data/kalibrasi sederhana." },
    { id: 8, text: "M13: Presentasi akhir proyek." },
    { id: 8, text: "M14: Refleksi, umpan balik, tindak lanjut ke tesis/publikasi." },
],

  asesmen: [
    {
      komponen: "Proyek Pemodelan",
      bentuk: "Analisis stabilitas skema pada kasus adveksi-difusi",
      bobot: "45%",
      cpl: "CPL-1",
    },
    {
      komponen: "Studi Kasus (CBL)",
      bentuk: "Evaluasi individu",
      bobot: "10%",
      cpl: "CPL-5",
    },
    {
      komponen: "Presentasi Ilmiah",
      bentuk: "Eksperimen numerik (uji grid/time-step)",
      bobot: "20%",
      cpl: "CPL-2",
    },
    {
      komponen: "Kuis Konsep",
      bentuk: "Bedah Artikel & presentasi hasil",
      bobot: "10%",
      cpl: "CPL-4, CPL-5",
    },
    {
      komponen: "Kuis Konsep",
      bentuk: "Bedah Artikel & presentasi hasil",
      bobot: "10%",
      cpl: "CPL-4, CPL-5",
    },
  ],

  etika:
    "Dilarang plagiarisme dan penggunaan AI tanpa sitasi yang jelas.",
});

export const coursesDummy: Course[] = [
  baseCourse(1, "SA501", "Meteorologi Dinamik Lanjut"),
  baseCourse(2, "SA502", "Klimatologi Tropis"),
  baseCourse(3, "SA503", "Mitigasi Bencana Hidrometeorologi"),
  baseCourse(4, "SA504", "Analisis Data Cuaca"),
  baseCourse(5, "SA505", "Sistem Informasi Geospasial"),
  baseCourse(6, "SA506", "Manajemen Risiko Bencana"),
];