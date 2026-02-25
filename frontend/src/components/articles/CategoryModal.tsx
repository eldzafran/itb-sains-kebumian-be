import { useEffect, useState } from "react";
import type { ApiCategory } from "../../types/articles";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/adminArticle";
import { slugify } from "../../utils/slugify";
import type { Props } from "../../types/articles";
import { Trash2, Pencil } from "lucide-react";
import ConfirmModal from "../ConfirmModal"; // Import ConfirmModal Anda

export default function CategoryModal({ onCancel }: Props) {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);

  // --- STATE UNTUK KONFIRMASI HAPUS ---
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{ id: number; name: string } | null>(null);

  async function load() {
    const data = await fetchCategories();
    setCategories(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd() {
    if (!newCategory.trim()) return;

    setLoading(true);
    try {
      await createCategory({
        name: newCategory,
        slug: slugify(newCategory),
      });
      setNewCategory("");
      await load();
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(id: number) {
    if (!editName.trim()) return;

    setLoading(true);
    try {
      await updateCategory(id, {
        name: editName,
        slug: slugify(editName),
      });
      setEditId(null);
      await load();
    } finally {
      setLoading(false);
    }
  }

  // --- LOGIK KONFIRMASI HAPUS ---
  const triggerDelete = (id: number, name: string) => {
    setCategoryToDelete({ id, name });
    setIsDeleteModalOpen(true);
  };

  async function handleConfirmDelete() {
    if (!categoryToDelete) return;

    setLoading(true);
    try {
      await deleteCategory(categoryToDelete.id);
      await load();
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] flex flex-col relative">
        <h2 className="text-lg font-bold mb-4">Manage Categories</h2>
        
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 mb-4 outline-none focus:border-blue-500"
        />

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border rounded-lg px-3 py-2 flex-1 outline-none focus:border-blue-500"
          />
          <button
            disabled={loading}
            onClick={handleAdd}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Add
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 border rounded-lg p-3">
          {categories
            .filter((c) =>
              c.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                {editId === c.id ? (
                  <input
                    autoFocus
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border rounded px-2 py-1 flex-1 mr-2 outline-none border-blue-400"
                  />
                ) : (
                  <span className="font-medium">{c.name}</span>
                )}

                <div className="flex gap-2">
                  {editId === c.id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(c.id)}
                        className="text-green-600 text-sm font-bold"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="text-gray-600 text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditId(c.id);
                          setEditName(c.name);
                        }}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => triggerDelete(c.id, c.name)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>

        <div className="mt-4 text-right">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200 transition"
          >
            Close
          </button>
        </div>
      </div>

      {/* --- MODAL KONFIRMASI --- */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Hapus Kategori"
        message={`Apakah Anda yakin ingin menghapus kategori "${categoryToDelete?.name}"? Tindakan ini mungkin mempengaruhi artikel yang menggunakan kategori ini.`}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}