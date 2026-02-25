import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchProfessors,
  deleteAdminProfessor,
  fetchLecturerCategories,
  createLecturerCategory,
  deleteLecturerCategory,
  type ApiProfessor,
  type ApiLecturerCategory,
} from "../../../services/adminProfessor";

export default function AdminProfessorsPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ApiProfessor[]>([]);
  const [categories, setCategories] = useState<ApiLecturerCategory[]>([]);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

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

  const loadCategories = async () => {
    try {
      const res = await fetchLecturerCategories();
      setCategories(res.data ?? res ?? []);
    } catch {
      setCategories([]);
    }
  };

  useEffect(() => {
    load();
    loadCategories();
  }, []);

  async function onDelete(id: number) {
    if (!window.confirm("Hapus data dosen ini?")) return;
    try {
      await deleteAdminProfessor(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e: any) {
      alert(e?.message ?? "Gagal hapus");
    }
  }

  async function handleCreateCategory() {
    if (!newCategory.trim()) return;

    const res = await createLecturerCategory({
      name: newCategory.trim(),
    });

    const created = res.data;
    setCategories((prev) => [...prev, created]);
    setNewCategory("");
  }

  async function handleDeleteCategory(id: number) {
    if (!window.confirm("Hapus kategori ini?")) return;

    await deleteLecturerCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
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
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Dosen</h1>
          <p className="text-black/60">Kelola data dosen</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowCategoryModal(true)}
            className="px-4 py-2 rounded-xl border bg-white text-blue-700 hover:bg-blue-50"
          >
            Kelola Kategori
          </button>

          <Link
            to="/admin/professors/create"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            + Tambah Dosen
          </Link>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Cari nama dosen atau NIDN..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 flex-1"
        />
      </div>

      {err && (
        <div className="mb-4 rounded-xl border bg-red-50 border-red-200 px-4 py-3 text-sm text-red-700">
          {err}
        </div>
      )}

      {/* CONTENT */}
      {loading ? (
        <div>Loading...</div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-xl border bg-white p-6">Belum ada data dosen.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedItems.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-xl border shadow p-6 hover:shadow-md transition"
            >
              <img
                src={d.foto_url ?? "/default-avatar.png"}
                alt={d.nama_dosen}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h2 className="text-lg font-bold text-gray-900 mb-1">{d.nama_dosen}</h2>
              <p className="text-sm text-gray-600 mb-2">{d.jabatan}</p>

              <p className="text-sm text-gray-600 mb-4">NIDN: {d.nidn}</p>
              <p className="text-sm text-gray-600 mb-4">📧 {d.email}</p>

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
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {filteredItems.length > 0 && (
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
      )}

      {/* MODAL CATEGORY */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Kelola Kategori Dosen
              </h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-gray-400 hover:text-black text-xl"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 mb-6 border">
              <p className="text-sm text-gray-600 mb-3">Tambah Kategori Baru</p>
              <div className="flex gap-3">
                <input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Masukkan nama kategori..."
                  className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleCreateCategory}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl font-medium"
                >
                  Tambah
                </button>
              </div>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {categories.map((c, index) => (
                <div
                  key={c.id ?? `temp-${index}`}
                  className="flex justify-between items-center bg-white border rounded-xl px-4 py-3"
                >
                  <span className="font-medium text-gray-700">{c.name}</span>
                  <button
                    onClick={() => handleDeleteCategory(c.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}