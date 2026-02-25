import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses, deleteCourse } from "../../../services/adminCourse";
import type { Course } from "../../../types/course";
import { SquarePen, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import ConfirmModal from "../../../components/ConfirmModal"; // Import modal kustom Anda

export default function AdminCoursesPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Course[]>([]);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // --- STATE UNTUK KONFIRMASI HAPUS ---
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{ id: number | string; name: string } | null>(null);

  async function load(page: number = 1) {
    setErr("");
    setLoading(true);
    try {
      const res = await getCourses({ page, search }) as any;
      
      const data = res?.results || [];
      const totalCount = res?.count || 0;
      
      setItems(data);
      setCount(totalCount);
      setCurrentPage(page);
    } catch (e: any) {
      setErr(e?.message ?? "Gagal load mata kuliah");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(1);
  }, [search]);

  // Fungsi untuk membuka modal konfirmasi
  function triggerDelete(id: number | string, name: string) {
    setSelectedCourse({ id, name });
    setIsDeleteModalOpen(true);
  }

  // Fungsi eksekusi hapus setelah konfirmasi "Ya"
  async function handleConfirmDelete() {
    if (!selectedCourse) return;
    
    setLoading(true);
    try {
      await deleteCourse(Number(selectedCourse.id));
      setIsDeleteModalOpen(false);
      setSelectedCourse(null);
      load(currentPage);
    } catch (e: any) {
      alert(e?.message ?? "Gagal hapus");
      setLoading(false);
    }
  }

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-black">Mata Kuliah</h1>
          <p className="text-black/60 text-sm">Total: {count} data</p>
        </div>
        <Link to="/admin/course/create" className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 text-center">
          + Create New
        </Link>
      </div>

      <div className="mb-4 relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Cari kode atau nama mata kuliah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 pl-9 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {err && <div className="text-red-500 mb-4 text-sm">{err}</div>}

      {loading && items.length === 0 ? (
        <div className="flex items-center justify-center p-10 text-black/70 italic animate-pulse">
          Menghubungkan ke server...
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-black/70 text-center">
          Tidak ditemukan data mata kuliah.
        </div>
      ) : (
        <>
          <div className="hidden md:block rounded-xl border bg-white overflow-hidden shadow-sm">
             <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold text-slate-700">Kode</th>
                    <th className="text-left p-4 font-semibold text-slate-700">Nama Mata Kuliah</th>
                    <th className="text-left p-4 font-semibold text-slate-700">SKS</th>
                    <th className="text-left p-4 font-semibold text-slate-700">Program</th>
                    <th className="text-right p-4 font-semibold text-slate-700">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {items.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-mono text-blue-600 font-medium">{m.course_code}</td>
                      <td className="p-4 text-black font-medium">{m.course_name}</td>
                      <td className="p-4 text-slate-600">{m.sks} SKS</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${m.program === 'S3 Doktoral' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {m.program}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1">
                        <Link to={`/admin/course/edit/${m.id}`} className="inline-flex items-center justify-center w-9 h-9 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <SquarePen className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => triggerDelete(m.id!, m.course_name)} 
                          className="inline-flex items-center justify-center w-9 h-9 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              Menampilkan halaman <span className="font-semibold text-slate-900">{currentPage}</span> dari <span className="font-semibold text-slate-900">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1 || loading}
                onClick={() => load(currentPage - 1)}
                className="p-2 border rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => load(i + 1)}
                    className={`w-9 h-9 text-sm rounded-lg transition-colors ${currentPage === i + 1 ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 text-slate-600'}`}
                  >
                    {i + 1}
                  </button>
                )).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))}
              </div>

              <button
                disabled={currentPage === totalPages || loading}
                onClick={() => load(currentPage + 1)}
                className="p-2 border rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* --- MODAL KONFIRMASI HAPUS --- */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Hapus Mata Kuliah"
        message={`Apakah Anda yakin ingin menghapus mata kuliah "${selectedCourse?.name}"? Data yang sudah dihapus tidak dapat dipulihkan.`}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setSelectedCourse(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}