import CardMenu from "../ui/CardMenu.js";

export default function QuickMenu() {
  return (
    <section className="py-28 bg-slate-100">
      {/* Judul */}
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
          Jelajahi Studi Sains Kebumian ITB
        </h2>

        <p className="text-lg text-slate-600 leading-relaxed text-left">
          Program Studi Sains Kebumian ITB menyelenggarakan pendidikan
          pascasarjana berbasis riset untuk menjawab tantangan kebumian,
          lingkungan, dan keberlanjutan di tingkat nasional maupun global.
        </p>
      </div>

      {/* Grid 2x2 */}
      <div className="relative mt-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2">
        
        {/* Garis Horizontal */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-300"></div>

        {/* Garis Vertical */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-slate-300"></div>

        {/* CARD 1 */}
        <div className="p-12">
          <div className="relative w-14 h-14 mb-6">
            <div className="absolute inset-0 rounded-full border border-blue-400/60"></div>
            <div className="absolute inset-2 rounded-full border border-red-400/50"></div>
            <div className="absolute inset-4 rounded-full border border-slate-400/40"></div>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Program Magister (S2)
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed">
            Program Magister Sains Kebumian menekankan penguatan keilmuan,
            analisis, dan riset terapan dengan dukungan dosen berpengalaman
            serta fasilitas penelitian yang memadai.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="p-12">
          <div className="relative w-14 h-14 mb-6">
            <div className="absolute inset-0 rounded-full border border-blue-400/60"></div>
            <div className="absolute inset-2 rounded-full border border-red-400/50"></div>
            <div className="absolute inset-4 rounded-full border border-slate-400/40"></div>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Program Doktoral (S3)
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed">
            Program Doktoral Sains Kebumian berfokus pada riset mendalam dan
            kontribusi ilmiah orisinal melalui kolaborasi riset dan publikasi
            bereputasi.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="p-12">
          <div className="relative w-14 h-14 mb-6">
            <div className="absolute inset-0 rounded-full border border-blue-400/60"></div>
            <div className="absolute inset-2 rounded-full border border-red-400/50"></div>
            <div className="absolute inset-4 rounded-full border border-slate-400/40"></div>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Program Unggulan
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed">
            Program strategis seperti PISM, MBR, DBR, dan Kerma yang dirancang untuk memperkuat kompetensi dan daya saing mahasiswa
          </p>
        </div>

        {/* CARD 4 */}
        <div className="p-12">
          <div className="relative w-14 h-14 mb-6">
            <div className="absolute inset-0 rounded-full border border-blue-400/60"></div>
            <div className="absolute inset-2 rounded-full border border-red-400/50"></div>
            <div className="absolute inset-4 rounded-full border border-slate-400/40"></div>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Beasiswa
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed">
            Berbagai skema bantuan pendidikan dan pendanaan riset tersedia untuk mendukung keberlanjutan studi mahasiswa
          </p>
        </div>

      </div>
    </section>
  );
}
