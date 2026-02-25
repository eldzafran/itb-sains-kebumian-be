import { Star, Navigation } from "lucide-react";

export default function KontakMap() {
  return (
    <section className="w-full bg-slate-100 py-20">
  <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* LEFT CARD */}
        <div className="p-8">
          <img
            src="/toserba.jpg"
            alt="Labtek XI"
            className="rounded-2xl h-48 w-full object-cover"
          />

          <h2 className="mt-6 text-2xl font-bold">Labtek XI</h2>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-semibold">5.0</span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm text-slate-500">(3)</span>
          </div>

          <p className="mt-2 text-slate-600">Institusi Pendidikan</p>

          <button className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition">
            <Navigation size={18} />
            Rute
          </button>

          <p className="mt-6 text-sm text-slate-600">
            <strong>Alamat Lengkap</strong><br />
            4J65+5RJ, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40116
          </p>
        </div>

        {/* MAP */}
        <div className="relative">
          <iframe
            title="Labtek XI ITB"
            src="https://www.google.com/maps?q=Labtek+XI+ITB&output=embed"
            className="w-full h-full min-h-[500px]"
            loading="lazy"
          />
        </div>

      </div>
    </div>
    </section>
  );
}
