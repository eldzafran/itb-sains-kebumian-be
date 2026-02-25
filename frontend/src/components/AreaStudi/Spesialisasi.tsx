export default function Spesialisasi() {
  return (
    <section
      className="w-full py-24 px-6 text-white"
      style={{
        background:
          "linear-gradient(135deg, #0f1c3d 0%, #1b2c55 40%, #162949 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Spesialisasi
          </h2>

          <p className="mt-4 text-2xl md:text-3xl font-light bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            / Magister
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl border border-white/20 hover:border-white/50 transition-all duration-300">
            <span className="inline-block px-5 py-1.5 mb-6 text-xs rounded-full border border-white/30 text-white/70">
              / Magister
            </span>

            <h3 className="text-2xl md:text-3xl font-light leading-snug mb-4">
              Perubahan Iklim <br />
              dan Transisi Energi
            </h3>

            <button className="text-sm text-white/70 hover:text-white transition">
              Pelajari Kurikulum →
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl border border-white/20 hover:border-white/50 transition-all duration-300">
            <span className="inline-block px-5 py-1.5 mb-6 text-xs rounded-full border border-white/30 text-white/70">
              / Magister
            </span>

            <h3 className="text-2xl md:text-3xl font-light leading-snug mb-4">
              Mitigasi <br />
              Bencana Kebumian
            </h3>

            <button className="text-sm text-white/70 hover:text-white transition">
              Pelajari Kurikulum →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
