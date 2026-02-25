import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { apiListDosens, apiListFakultas } from "../../services/userLecturer";
import type { ApiDosen } from "../../temp/types/dosen";

export default function Dosen() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [dosens, setDosens] = useState<ApiDosen[]>([]);
  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] = useState("Semua");
  const [fakultasList, setFakultasList] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const PAGE_SIZE = 8;

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const res = await apiListDosens({
        page,
        ...(q && { q }),
        ...(activeTag !== "Semua" && { fakultas: activeTag }),
      });
      setDosens(res.results);
      setTotalPages(Math.ceil(res.count / PAGE_SIZE));
      setCurrentPage(page);
      window.scrollTo({ top: 500, behavior: "smooth" });
    } catch (e: any) {
      setErr(e?.message || "Gagal fetch dosen");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
    apiListFakultas().then(setFakultasList);
  }, []);

  useEffect(() => {
    fetchData(1);
  }, [q, activeTag]);

  const TAGS = ["Semua", ...fakultasList];

  return (
    <section className="w-full bg-[#F4F6F9] font-poppins">
      {/* Search + Filter */}
      <section className="max-w-[1440px] w-full h-auto md:h-[150px] pt-[24px] md:pt-[48px] px-4 md:px-[100px] mx-auto">
        <div className="max-w-[1240px] w-full h-auto md:h-[86px] mx-auto flex flex-col gap-[16px]">
          <div className="w-full md:w-[1239px] h-auto md:h-[50px] flex flex-col md:flex-row md:items-center">
            {/* Search */}
            <div className="relative w-full md:w-[421.625px] h-[49.6px]">
              <Search
                size={20}
                className="absolute left-[16px] top-[14.8px] text-slate-400"
              />
              <input
                type="text"
                placeholder="Cari dosen..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full h-full pl-[48px] pr-[16px] py-[12px] rounded-[10px] border border-[0.8px] border-slate-300 bg-white focus:outline-none"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap md:flex-nowrap w-full md:w-[591px] h-auto md:h-[48px] mt-4 md:mt-0 md:ml-[16.38px] gap-[12px]">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`h-[48px] px-[20px] rounded-[20px] text-sm transition whitespace-nowrap
                    ${
                      activeTag === tag
                        ? "bg-[#155DFC] text-white"
                        : "border border-slate-300 text-slate-700 bg-white"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-slate-500">
            Halaman {currentPage} dari {totalPages}
          </p>
        </div>
      </section>

      {/* Grid Dosen */}
      <div className="max-w-[1239px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[24px] gap-x-[24px] px-4 md:px-0 pb-16">
        {dosens.map((d) => (
          <Link key={d.id} to={`/dosen/${d.id}`}>
            <div className="w-full md:w-[230px] h-[421px] mx-auto">
              <div className="relative w-full h-[289px] rounded-[20px] overflow-hidden">
                <img
                  src={
                    d.foto_dosen
                      ? `${import.meta.env.VITE_API_BASE_URL}${d.foto_dosen}`
                      : "/people.jpg"
                  }
                  alt={d.nama_dosen}
                  className="w-full h-full object-cover"
                />
                {/* Overlay fakultas */}
                <div className="absolute bottom-[20px] left-[20px] bg-[#0C1637] text-white text-[12px] font-medium rounded-full px-4 py-2">
                  {d.fakultas}
                </div>
              </div>
              <div className="mt-[16px]">
                <h3 className="text-[20px] text-[#0C1637]">{d.nama_dosen}</h3>
                <p className="text-[16px] text-slate-500">{d.pekerjaan}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-[1239px] w-full mx-auto flex justify-center items-center gap-[12px] flex-wrap px-4 md:px-0 pb-24">
          <button
            onClick={() => currentPage > 1 && fetchData(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-[48px] h-[48px] rounded-full border border-slate-300 disabled:opacity-30"
          >
            ←
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => fetchData(page)}
                className={`w-[40px] h-[40px] rounded-full text-sm
                  ${
                    currentPage === page
                      ? "bg-[#0C1637] text-white"
                      : "bg-[#E9EEF5] text-slate-700"
                  }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() =>
              currentPage < totalPages && fetchData(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className="w-[48px] h-[48px] rounded-full border border-slate-300 disabled:opacity-30"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
}