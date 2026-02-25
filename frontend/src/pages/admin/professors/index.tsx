import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchProfessors,
  deleteAdminProfessor,
  type ApiProfessor,
} from "../../../services/adminProfessor";

export default function AdminProfessorsPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ApiProfessor[]>([]);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6; // batas per halaman

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const res = await fetchProfessors();
      setItems(res.dosens ?? []);
    } catch (e: any) {
      setErr(e?.message ?? "Gagal load dosen");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id: number) {
    const ok = window.confirm("Hapus data dosen ini?");
    if (!ok) return;
    try {
      await deleteAdminProfessor(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e: any) {
      alert(e?.message ?? "Gagal hapus");
    }
  }

  const filteredItems = useMemo(() => {
    return items.filter(
      (d) =>
        d.nama_dosen?.toLowerCase().includes(search.toLowerCase()) ||
        d.nidn?.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, page]);

  const totalPages = Math.ceil(filteredItems.length / pageSize);

  return (
    <div className="p-8 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Dosen</h1>
          <p className="text-gray-500">
            Kelola data dosen, publikasi, dan aktivitas penelitian
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/admin/categories"
            className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition"
          >
            Kelola Kategori
          </Link>
          <Link
            to="/admin/professors/create"
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            + Tambah Dosen
          </Link>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari nama dosen atau NIDN..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* ERROR */}
      {err && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {err}
        </div>
      )}

      {/* CARD GRID */}
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-gray-500 shadow">
          Belum ada data dosen.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-2xl shadow border p-6 hover:shadow-md transition"
              >
                {/* FOTO + NAMA */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={d.foto_url ?? "/default-avatar.png"}
                    alt={d.nama_dosen}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {d.nama_dosen}
                    </h2>
                    <p className="text-sm text-gray-500">{d.jabatan}</p>
                  </div>
                </div>

                {/* INFO */}
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p>NIDN: {d.nidn}</p>
                  <p>📧 {d.email}</p>
                </div>

                {/* BADGES */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                    {d.kategori}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2">
                  <Link
                    to={`/admin/professors/detail/${d.id}`}
                    className="text-green-600 hover:bg-green-50 p-2 rounded-lg"
                  >
                    👁
                  </Link>
                  <Link
                    to={`/admin/professors/edit/${d.id}`}
                    className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg"
                  >
                    ✏️
                  </Link>
                  <button
                    onClick={() => onDelete(d.id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                    type="button"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-2 p-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded ${
                  page === p
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
