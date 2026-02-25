import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const [informasiOpen, setInformasiOpen] = useState(false);
  const [informasiMobileOpen, setInformasiMobileOpen] = useState(false);

  const [areaOpen, setAreaOpen] = useState(false);
  const [areaMobileOpen, setAreaMobileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const areaDropdownRef = useRef<HTMLDivElement | null>(null);

  const linkClass = (path: string) =>
    pathname === path
      ? "px-4 py-2 rounded-full bg-blue-900 text-white shadow-md"
      : "text-slate-700 hover:text-blue-700";

  const isInformasiActive = () =>
    pathname.startsWith("/informasi");

  const isAreaActive = () =>
    pathname.startsWith("/area-studi");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setInformasiOpen(false);
      }

      if (
        areaDropdownRef.current &&
        !areaDropdownRef.current.contains(event.target as Node)
      ) {
        setAreaOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex justify-center">
      <nav className="w-full max-w-10xl bg-white rounded-b-3xl px-6 py-2 relative">
        <div className="flex justify-between items-center">

          {/* DESKTOP */}
          <div className="hidden md:flex items-center space-x-4 text-sm font-medium mx-auto">

            <Link className={linkClass("/")} to="/">Beranda</Link>
            <Link className={linkClass("/profil")} to="/profil">Profil</Link>

            {/* ================= AREA STUDI ================= */}
            <div className="relative" ref={areaDropdownRef}>
              <button
                className={`flex items-center space-x-1 px-4 py-2 rounded-full ${
                  isAreaActive()
                    ? "bg-blue-900 text-white shadow-md"
                    : "text-slate-700 hover:text-blue-700"
                }`}
                onClick={() => setAreaOpen(!areaOpen)}
                onMouseEnter={() => setAreaOpen(true)}
              >
                <span>Area Studi</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    areaOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {areaOpen && (
                <div
                  className="absolute top-full left-0 mt-0 w-60 bg-white rounded-lg shadow-lg border border-slate-200 z-50 flex flex-col"
                  onMouseEnter={() => setAreaOpen(true)}
                  onMouseLeave={() => setAreaOpen(false)}
                >
                  <Link
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      pathname === "/area-studi/saint-atmosfer"
                        ? "bg-[#172656] text-white font-semibold"
                        : "text-slate-700 hover:bg-[#172656] hover:text-white"
                    }`}
                    to="/area-studi/saint-atmosfer"
                    onClick={() => setAreaOpen(false)}
                  >
                    Saint Atmosfer
                  </Link>

                  <Link
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      pathname === "/area-studi/oseanografi"
                        ? "bg-[#172656] text-white font-semibold"
                        : "text-slate-700 hover:bg-[#172656] hover:text-white"
                    }`}
                    to="/area-studi/oseanografi"
                    onClick={() => setAreaOpen(false)}
                  >
                    Oseanografi
                  </Link>

                  <Link
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      pathname === "/area-studi/interaksi-sistem-bumi"
                        ? "bg-[#172656] text-white font-semibold"
                        : "text-slate-700 hover:bg-[#172656] hover:text-white"
                    }`}
                    to="/area-studi/interaksi-sistem-bumi"
                    onClick={() => setAreaOpen(false)}
                  >
                    Interaksi Sistem Bumi
                  </Link>

                  <Link
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      pathname === "/area-studi/sains-kebumian"
                        ? "bg-[#172656] text-white font-semibold"
                        : "text-slate-700 hover:bg-[#172656] hover:text-white"
                    }`}
                    to="/area-studi/sains-kebumian"
                    onClick={() => setAreaOpen(false)}
                  >
                    Sains Kebumian
                  </Link>
                </div>
              )}
            </div>

            <Link className={linkClass("/mahasiswa-alumni")} to="/mahasiswa-alumni">
              Mahasiswa & Alumni
            </Link>

            <Link className={linkClass("/akademik")} to="/akademik">
              Akademik
            </Link>

            <Link className={linkClass("/dosen")} to="/dosen">
              Akademisi
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                className={`flex items-center space-x-1 px-4 py-2 rounded-full ${
                  isInformasiActive()
                    ? "bg-blue-900 text-white shadow-md"
                    : "text-slate-700 hover:text-blue-700"
                }`}
                onClick={() => setInformasiOpen(!informasiOpen)}
                onMouseEnter={() => setInformasiOpen(true)}
              >
                <span>Informasi</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    informasiOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {informasiOpen && (
                <div
                  className="absolute top-full left-0 mt-0 w-52 bg-white rounded-lg shadow-lg border border-slate-200 z-50 flex flex-col"
                  onMouseEnter={() => setInformasiOpen(true)}
                  onMouseLeave={() => setInformasiOpen(false)}
                >
                  <Link
                    className="block px-4 py-3 rounded-lg text-slate-700 hover:bg-[#172656] hover:text-white"
                    to="/informasi/artikel"
                  >
                    Artikel
                  </Link>

                  <Link
                    className="block px-4 py-3 rounded-lg text-slate-700 hover:bg-[#172656] hover:text-white"
                    to="/informasi/pendaftaran"
                  >
                    Pendaftaran SB
                  </Link>

                  <Link
                    className="block px-4 py-3 rounded-lg text-slate-700 hover:bg-[#172656] hover:text-white"
                    to="/informasi/link-internal"
                  >
                    Link Internal
                  </Link>
                </div>
              )}
            </div>  

            <Link className={linkClass("/publikasi-prestasi")} to="/publikasi-prestasi">
              Publikasi & Prestasi
            </Link>

            <Link className={linkClass("/kontak-kami")} to="/kontak-kami">
              Kontak Kami
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <Menu size={26} className="text-slate-900" />
          </button>
        </div>
      </nav>
    </div>
  );
}
