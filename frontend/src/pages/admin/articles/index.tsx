import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses, deleteCourse } from "../../../services/adminCourse";
import { SquarePen, Trash2, Search, ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";
import ConfirmModal from "../../../components/ConfirmModal";

export default function AdminCoursesPage() {
  // --- STATES ---
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]); // Menggunakan any agar fleksibel dengan field _display dari Django
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{ id: number | string; name: string } | null>(null);

  // --- API CALL ---
  async function load(page: number = 1, keyword: string = search) {
    setErr("");
    setLoading(true);
    try {
      const res = await getCourses({ page, search: keyword });
      // Django Rest Framework biasanya mengembalikan { count, next, previous, results }
      setItems(res?.results || []);
      setCount(res?.count || 0);
      setCurrentPage(page);
    } catch (e: any) {
      setErr(e?.message ?? "Gagal mengambil data dari server");
    } finally {
      setLoading(false);
    }
  }

  // Load awal
  useEffect(() => {
    load(1, "");
  }, []);

  // Debounce Search
  useEffect(() => {
    const t = setTimeout(() => {
      if (search !== "") load(1, search);
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  // Handle Delete
  async function handleConfirmDelete() {
    if (!selectedCourse) return;
    try {
      await deleteCourse(Number(selectedCourse.id));
      setIsDeleteModalOpen(false);
      setSelectedCourse(null);
      load(currentPage, search);
    } catch (e: any) {
      alert(e?.message ?? "Gagal menghapus data");
    }
  }

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manajemen Mata Kuliah</h1>
          <p className="text-slate-500 text-sm">Kelola data kurikulum dan capaian pembelajaran</p>
        </div>
        <Link 
          to="/admin/course/create" 
          className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
        >
          + Tambah Mata Kuliah
        </Link>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-6 relative group">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          placeholder="Cari berdasarkan kode atau nama mata kuliah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white rounded-2xl border border-slate-200 px-4 py-3 pl-12 pr-12 text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all shadow-sm"
        />
        {search && (
          <button onClick={() => {setSearch(""); load(1, "");}} className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {err && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm flex items-center gap-3">
          <span className="font-bold">Error:</span> {err}
        </div>
      )}

      {/* TABLE SECTION */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
            <p className="text-slate-500 animate-pulse">Menghubungkan ke database...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">Data tidak ditemukan</p>
            <button onClick={() => {setSearch(""); load(1, "");}} className="text-blue-600 text-sm hover:underline mt-2">Bersihkan filter</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 font-semibold text-slate-700 w-32">Kode</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">Nama Mata Kuliah</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">Program / Opsi / Spesialisasi</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-center">SKS</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {items.map((m) => (
                  <tr key={m.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-5">
                      <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">
                        {m.course_code}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-semibold text-slate-900">{m.course_name}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1.5">
                        {/* MENGGUNAKAN FIELD _DISPLAY LANGSUNG DARI DJANGO */}
                        <span className={`w-fit px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          m.program === "S3" ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {m.program_display}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-bold text-xs">
                        {m.sks} SKS
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          to={`/admin/course/edit/${m.id}`} 
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <SquarePen className="w-5 h-5" />
                        </Link>
                        <button 
                          onClick={() => { setSelectedCourse({ id: m.id, name: m.course_name }); setIsDeleteModalOpen(true); }}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Hapus"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {!loading && items.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-500">
            Menampilkan <span className="font-bold text-slate-900">{items.length}</span> dari <span className="font-bold text-slate-900">{count}</span> data
          </p>
          <div className="flex items-center gap-3">
            <button 
              disabled={currentPage === 1} 
              onClick={() => load(currentPage - 1)}
              className="p-2 border border-slate-200 rounded-xl hover:bg-white disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => load(i + 1)}
                  className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                    currentPage === i + 1 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'bg-white border border-slate-200 text-slate-500 hover:border-blue-400'
                  }`}
                >
                  {i + 1}
                </button>
              )).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))}
            </div>

            <button 
              disabled={currentPage === totalPages} 
              onClick={() => load(currentPage + 1)}
              className="p-2 border border-slate-200 rounded-xl hover:bg-white disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      )}

      {/* MODAL */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Hapus Mata Kuliah"
        message={`Apakah Anda yakin ingin menghapus "${selectedCourse?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}