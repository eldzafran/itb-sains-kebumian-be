export default function Organisasi() {
  const Card = ({ name, role, image }) => (
    <div className="bg-white rounded-3xl shadow-md p-8 w-full hover:shadow-xl transition">
      <img
        src={image}
        alt={name}
        className="w-full h-72 object-cover rounded-2xl mb-6"
      />
      <h3 className="text-xl font-semibold text-slate-900">{name}</h3>
      <p className="text-base text-slate-500">{role}</p>
    </div>
  );

  return (
    <section
      className="w-full py-28 px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* ===== Title ===== */}
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold text-slate-900">
            Struktur Organisasi
          </h2>
          <p className="text-slate-600 mt-4">
            Informasi mengenai struktur, fungsi, dan tanggung jawab di Prodi Sains Kebumian
          </p>
        </div>

        {/* ===== Dekan ===== */}
        <div className="mb-24">
          <h3 className="text-3xl font-semibold text-slate-900">
            Dekan
          </h3>
          <div className="w-full h-[2px] bg-slate-900 mt-4 mb-14"></div>

          <div className="grid md:grid-cols-2 gap-16">
            <Card name="Hugh Davies" role="Rector" image="/person.jpg" />
            <Card name="Hugh Davies" role="Rector" image="/person.jpg" />
          </div>
        </div>

        {/* ===== Senat ===== */}
        <div>
          <h3 className="text-3xl font-semibold text-slate-900">
            Senat
          </h3>
  
          <div className="w-full h-[2px] bg-slate-900 mt-4 mb-14"></div>

          <div className="grid md:grid-cols-2 gap-16">
            <Card name="Hugh Davies" role="Rector" image="/person.jpg" />
            <Card name="Hugh Davies" role="Rector" image="/person.jpg" />
          </div>
        </div>

      </div>
    </section>
  );
}
