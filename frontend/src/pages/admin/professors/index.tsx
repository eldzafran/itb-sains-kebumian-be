// pages/admin/professors/index.tsx
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import type { ApiProfessor, ApiLecturerCategory } from "../../../services/adminProfessor";
import {
  fetchProfessors,
  deleteAdminProfessor,
  fetchLecturerCategories,
  createLecturerCategory,
  deleteLecturerCategory,
} from "../../../services/adminProfessor";

import ProfessorCard from "../../../components/professors/ProfessorCard";
import ProfessorCategoryModal from "../../../components/professors/CategoryModal";

export default function AdminProfessorsPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ApiProfessor[]>([]);
  const [categories, setCategories] = useState<ApiLecturerCategory[]>([]);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // --- Load professors & categories
  async function load() {
    setErr("");
    setLoading(true);
    try {
      const res = await fetchProfessors();
      const dataDosen = res?.dosens || res?.data?.results || res?.results || (Array.isArray(res) ? res : []);
      setItems(dataDosen);

      const catRes = await fetchLecturerCategories();
      setCategories(catRes ?? []);
    } catch (e: any) {
      setErr(e?.message ?? "Gagal load dosen");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // --- Delete professor logic ---
  async function onDelete(id: number) {
    if (!window.confirm("Hapus data dosen ini?")) return;
    try {
      await deleteAdminProfessor(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e: any) {
      alert(e?.message ?? "Gagal hapus");
    }
  }

  // --- Filter + pagination (tidak diubah) ---
  const filteredItems = useMemo(() => {
    return items.filter((d) => {
      const matchSearch =
        (d.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (d.nip || "").toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        categoryFilter === null ||
        (d as any).categories?.some((c: any) => c.id === categoryFilter);

      return matchSearch && matchCategory;
    });
  }, [items, search, categoryFilter]);

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
          <h1 className="text-2xl font-bold">Lecturers</h1>
          <p className="text-black/60">Manage your professors</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowCategoryModal(true)}
            className="px-4 py-2 rounded-xl border bg-white text-blue-700 hover:bg-blue-50"
          >
            Manage Categories
          </button>

          <Link
            to="/admin/professors/create"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            + Create
          </Link>
        </div>
      </div>

      {/* FILTER */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search lecturers..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="border rounded-lg px-3 py-2 flex-1"
        />

        <select
          value={categoryFilter ?? ""}
          onChange={(e) => { setCategoryFilter(e.target.value ? Number(e.target.value) : null); setPage(1); }}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {err && <div className="text-red-500 mb-4">{err}</div>}

      {/* CONTENT */}
      {loading ? (
        <div>Loading...</div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-xl border bg-white p-6">
          Belum ada data dosen.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedItems.map((prof) => (
            <ProfessorCard key={prof.id} professor={prof} onDelete={onDelete} />
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg transition ${
                page === p ? "bg-blue-600 text-white" : "bg-white border text-gray-600"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* CATEGORY MODAL */}
      {showCategoryModal && (
        <ProfessorCategoryModal
          onCancel={() => setShowCategoryModal(false)}
          categories={categories}
          setCategories={setCategories}
          createCategory={createLecturerCategory}
          deleteCategory={deleteLecturerCategory}
        />
      )}
    </div>
  );
}