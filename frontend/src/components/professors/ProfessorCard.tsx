import { useState } from "react";
import { Link } from "react-router-dom";
import type { ApiProfessor } from "../../services/adminProfessor";
import { Trash2 } from "lucide-react";
import ConfirmModal from "../ConfirmModal";

interface Props {
  professor: ApiProfessor;
  onDelete?: (id: number) => void;
}

function buildImageUrl(path?: string) {
  if (!path) return "/default-avatar.png";
  if (path.startsWith("http")) return path;
  const base = import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "");
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

export default function ProfessorCard({ professor, onDelete }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const imageUrl = buildImageUrl(professor.photo);
  const badges: { label: string; color: string }[] = [];

  if (professor.position) badges.push({ label: professor.position, color: "bg-gray-900 text-white" });
  
  if (professor.categories && Array.isArray(professor.categories)) {
    professor.categories.forEach((c: any) =>
      badges.push({ label: c.name, color: "bg-blue-100 text-blue-700" })
    );
  }

  const handleConfirmDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    try {
      await onDelete(professor.id);
      setIsModalOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-blue-100 hover:border-blue-300 hover:shadow-lg transition overflow-hidden flex flex-col h-full relative">
      <Link to={`/admin/professors/edit/${professor.id}`} className="block">
        <div className="h-48 overflow-hidden bg-gray-100">
          <img src={imageUrl} alt={professor.name} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          {badges.map((b, i) => (
            <span key={i} className={`text-xs font-medium px-3 py-1 rounded-full ${b.color}`}>
              {b.label}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold mb-1 line-clamp-2">{professor.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-1">NIP: {professor.nip || "-"}</p>

        <div className="mt-auto flex justify-between items-center border-t pt-3">
          <Link to={`/admin/professors/edit/${professor.id}`} className="flex-1 text-center px-4 py-2 rounded-lg bg-blue-100 text-blue-600 font-semibold hover:bg-blue-200 transition">Edit</Link>
          <button type="button" className="ml-3 px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition" onClick={() => setIsModalOpen(true)}>
            <Trash2 className={`w-5 h-5 ${isDeleting ? "animate-pulse" : ""}`} />
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Hapus Dosen"
        message={`Apakah Anda yakin ingin menghapus dosen "${professor.name}"?`}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}