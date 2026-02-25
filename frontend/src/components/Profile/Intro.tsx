export default function Intro() {
  return (
    <section className="w-full py-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Title Center */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-4">
            Tentang Program Studi
          </h2>

          <span className="inline-block bg-slate-200 text-slate-600 text-sm px-4 py-1 rounded-full">
            Sejak 2015
          </span>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/es.jpg"
              alt="Program Study"
              className="w-full max-w-md rounded-3xl shadow-lg"
            />
          </div>

          {/* Text */}
          <div className="text-slate-600 leading-relaxed space-y-6">
            <p>
              Program Studi Sains Kebumian merupakan program pendidikan tinggi
              yang menggabungkan berbagai disiplin ilmu untuk memahami planet
              Bumi sebagai sebuah sistem yang terintegrasi.
            </p>

            <p>
              Program ini menggabungkan ilmu atmosfer, oseanografi, geologi,
              biologi, dan ilmu komputer untuk memberikan pemahaman holistik
              tentang bagaimana komponen-komponen sistem bumi berinteraksi satu
              sama lain.
            </p>

            <p>
              Didirikan pada tahun 2015, program studi ini hadir dari kebutuhan
              mendesak akan ahli yang mampu memahami dan mengatasi tantangan
              lingkungan global seperti perubahan iklim, degradasi ekosistem,
              dan bencana alam.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
