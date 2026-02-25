export default function KuesionerAlumni() {
  return (
    <section
      className="w-full py-26"
      style={{
        background: "linear-gradient(180deg, #F2DAE7 0%, #CFF4D9 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="flex justify-center">
          <img src="/bumi.png" alt="Intro Illustration" className="w-full max-w-sm rounded-2xl shadow-md mb-12 mt-12" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Kuesioner Alumni</h2>

          <p className="text-slate-700 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus massa. Donec quam felis, ultricies nec,
            pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
          </p>

          <button
            className="
              inline-flex items-center gap-3
              px-8 py-3
              rounded-full
              font-semibold
              text-slate-900
              border-2 border-[#0A1737]
              shadow-sm
              transition
            "
            style={{
              background: "linear-gradient(90deg, #D9F6DE 0%, #C7E7F7 100%)",
            }}
          >
            Isi Kuesioner Sekarang!
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
