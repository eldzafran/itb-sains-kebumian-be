import { useState } from "react"; // Tambahkan useState
import { Link } from "react-router-dom";
import type { ApiArticle } from "../../types/articles";
import { Trash2, CalendarDays } from "lucide-react";
import { deleteArticle } from "../../services/adminArticle";
import ConfirmModal from "../../components/ConfirmModal"; // Import Modal Anda

function getPlainText(html?: string) {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function buildImageUrl(path?: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, ""); 
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

interface Props {
  article: ApiArticle;
  onDelete?: (id: string) => void;
}

export default function ArticleCard({ article, onDelete }: Props) {
  // --- STATE UNTUK MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const title = getPlainText(article.title);
  const excerpt = getPlainText(article.content).slice(0, 140);
  const imageUrl = buildImageUrl(article.thumbnail);
  
  const categoryName = article.categories && article.categories.length > 0 
    ? article.categories[0].name 
    : "Uncategorized";

  const isPublished = article.status === "Published";

  // --- FUNGSI EKSEKUSI HAPUS ---
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteArticle(article.id);
      setIsModalOpen(false);  
      onDelete?.(String(article.id)); // Beritahu parent untuk hapus dari list UI
    } catch (e: any) {
      alert(e?.message ?? "Gagal hapus artikel");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-blue-100 hover:border-blue-300 hover:shadow-lg transition overflow-hidden flex flex-col h-full relative">
      
      {/* Link ke Detail/Edit */}
      <Link to={`/admin/articles/edit/${article.id}`} className="block">
        <div className="h-48 overflow-hidden bg-gray-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
              No Image
            </div>
          )}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4 flex items-center gap-3 flex-wrap">
          <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
            {categoryName}
          </span>
          <span className={`text-sm px-3 py-1 rounded-full ${
            isPublished ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
          }`}>
            {isPublished ? "Published" : "Draft"}
          </span>
        </div>

        <h3 className="text-lg font-bold mb-3 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{excerpt}</p>

        <div className="flex items-center gap-2 mb-4">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">
            {new Date(article.updated_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="mt-auto flex justify-between items-center border-t pt-3">
          <Link
            to={`/admin/articles/edit/${article.id}`}
            className="flex-1 text-center px-4 py-2 rounded-lg bg-blue-100 text-blue-600 font-semibold hover:bg-blue-200 transition"
          >
            Edit
          </Link>

          {/* Tombol Hapus: Sekarang hanya membuka state Modal */}
          <button
            type="button"
            className="ml-3 px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
            onClick={() => setIsModalOpen(true)}
          >
            <Trash2 className={`w-5 h-5 ${isDeleting ? "animate-pulse" : ""}`} />
          </button>
        </div>
      </div>

      {/* --- RENDER MODAL DI SINI --- */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="Hapus Artikel"
        message={`Apakah Anda yakin ingin menghapus artikel "${title}"?`}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}