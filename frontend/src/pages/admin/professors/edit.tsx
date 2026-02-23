import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfessorForm, { type ProfessorFormInitial, type ProfessorFormValues } from "../../../components/professors/ProfessorForm";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import { getAdminProfessor, updateAdminProfessor } from "../../../services/adminProfessor";

export default function EditProfessorPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const [initial, setInitial] = useState<ProfessorFormInitial | null>(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const prof = await getAdminProfessor(Number(id));
        setInitial(prof);
      } catch (e: any) {
        toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal memuat data dosen." });
      }
    })();
  }, [id]);

  if (!initial) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Edit Professor</h1>
        <p className="text-sm text-slate-500">Ubah data dosen.</p>
      </div>

      <ProfessorForm
        initial={initial}
        onCancel={() => nav("/admin/professors")}
        onSubmit={async (values: ProfessorFormValues) => {
          try {
            await updateAdminProfessor(Number(id), values);
            toast({ type: "success", title: "Updated", message: "Data dosen berhasil diperbarui." });
            nav("/admin/professors");
          } catch (e: any) {
            toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal memperbarui data dosen." });
          }
        }}
      />
    </div>
  );
}