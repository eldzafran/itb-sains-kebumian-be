export default function VisiMisi() {
  return (
    <section className="w-full py-28 px-6 bg-slate-100">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-bold text-slate-900 mb-4">
          Visi & Misi
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Arah dan tujuan kami dalam mengembangkan pendidikan sains bumi
          berkualitas tinggi
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        
        {/* CARD VISI */}
        <div className="bg-white rounded-3xl shadow-xl p-10 text-left hover:shadow-2xl transition">
          
          {/* Icon */}
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-100 mb-6">
            <span className="text-purple-600 text-xl">👁️</span>
          </div>

          <h3 className="text-2xl font-semibold text-slate-900 mb-4">
            Visi
          </h3>

          <p className="text-slate-600 leading-relaxed">
            Program Studi Sains Kebumian menjadi program Pendidikan tinggi yang unggul, terpandang, mampu memberikan kontribusi pada pembangunan yang berkelanjutan. 
            Menjadi bagian dari solusi permasalahan Kebumian, dan secara proaktif menjawab tantangan yang berkembang di Masyarakat,
            serta mampu berkompetisi secara nasional dan regional. Sehingga mampu menjadi salah satu pusat pengembangan, 
            dan informasi di bidang tersebut di Indonesia dan Kawasan regional ASEAN dan internasional.
          </p>
        </div>

        {/* CARD MISI */}
        <div className="bg-white rounded-3xl shadow-xl p-10 text-left hover:shadow-2xl transition">
          
          {/* Icon */}
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 mb-6">
            <span className="text-green-600 text-xl">🎯</span>
          </div>

          <h3 className="text-2xl font-semibold text-slate-900 mb-6">
            Misi
          </h3>

          <ul className="space-y-4 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✔</span>
              Meningkatkan kualitas pendidikan yang menghasilkan lulusan
              yang mampu bekerja secara mandiri dan adaptif terhadap
              perkembangan IPTEK Kebumian.
            </li>

            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✔</span>
              Melaksanakan penelitian dan menghasilkan karya ilmiah yang
              handal dan kompetitif dalam bidang Sains Kebumian.
            </li>

            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✔</span>
              Mengembangkan peran ilmu oseanografi, sains atmosfer,
              interaksi sistem bumi dalam pembangunan nasional
              berkelanjutan.
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
