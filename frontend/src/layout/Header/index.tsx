export default function Header() {
  return (
    <header
      className="border-b border-slate-200"
      style={{
        background: "linear-gradient(90deg, #121A2F 0%, #172758 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 sm:px-6 lg:px-8">

        {/* Logo + Text */}
        <div className="flex items-center space-x-3 mx-auto">
          <img src="/logo.png" alt="ITB Logo" className="w-12 h-12" />

          <div className="flex flex-col leading-tight text-center ">
            <span className="text-white text-sm font-semibold">
              Institut Teknologi Bandung
            </span>
            <span className="text-blue-200 text-xs">
              Fakultas Ilmu dan Teknologi Kebumian
            </span>
          </div>
        </div>

        {/* Language Switch */}
        <button className="
          flex items-center gap-2 px-3 py-1 
          border border-white rounded-full 
          text-white text-sm font-medium 
          hover:bg-white/10 transition
        ">
          <div className="w-6 h-6 rounded-full overflow-hidden shadow">
            <img src="/flag.png" alt="ID Flag" className="w-full h-full object-cover" />
          </div>
          <span>ID</span>
        </button>

      </div>
    </header>
  );
}
