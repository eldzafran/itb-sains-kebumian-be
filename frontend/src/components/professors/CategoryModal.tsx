// components/professors/ProfessorCategoryModal.tsx
import { useEffect, useState } from "react";
import type { ApiLecturerCategory } from "../../services/adminProfessor";
import ConfirmModal from "../ConfirmModal";

interface Props {
  onCancel: () => void;
  categories: ApiLecturerCategory[];
  setCategories: React.Dispatch<React.SetStateAction<ApiLecturerCategory[]>>;
  createCategory: (data: { name: string }) => Promise<ApiLecturerCategory>;
  deleteCategory: (id: number) => Promise<void>;
}

export default function ProfessorCategoryModal({
  onCancel,
  categories,
  setCategories,
  createCategory,
  deleteCategory,
}: Props) {
  const [newCategory, setNewCategory] = useState("");
  const [search, setSearch] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{ id: number; name: string } | null>(null);

  const triggerDelete = (id: number, name: string) => {
    setCategoryToDelete({ id, name });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    await deleteCategory(categoryToDelete.id);
    setCategories(categories.filter((c) => c.id !== categoryToDelete.id));
    setCategoryToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleAdd = async () => {
    if (!newCategory.trim()) return;
    const res = await createCategory({ name: newCategory });
    setCategories([...categories, res]);
    setNewCategory("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
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
            onClick={handleAdd}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 border rounded-lg p-3">
          {categories
            .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
            .map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <span className="font-medium">{c.name}</span>
                <button
                  onClick={() => triggerDelete(c.id, c.name)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  Delete
                </button>
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

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Hapus Kategori"
        message={`Apakah Anda yakin ingin menghapus kategori "${categoryToDelete?.name}"?`}
        onCancel={() => {
          setCategoryToDelete(null);
          setIsDeleteModalOpen(false);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}