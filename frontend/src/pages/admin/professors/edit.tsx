import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfessorForm, { type ProfessorFormValues } from "../../../components/professors/ProfessorForm";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import { getAdminProfessor, updateAdminProfessor } from "../../../services/adminProfessor";

export default function EditProfessorPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [initialData, setInitialData] = useState<ProfessorFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await getAdminProfessor(Number(id));
        const mapped: ProfessorFormValues = {
          nama_dosen: res.name || "",
          nip: res.nip || "",
          jabatan_fungsional: res.position || "",
          email: res.email || "",
          webpage: res.webpage || "",
          sinta_id: res.sinta_id || "",
          researcher_id: res.researcher_id || "",
          scopus_author_id: res.scopus_author_id || "",
          orcid_id: res.orcid_id || "",
          research_interest: res.research_interest || "",
          education_history: res.education_history || "",
          publications: res.publications || "",
          research_projects: res.research_projects || "",
          community_service: res.community_service || "",
          awards: res.awards || "",
          fotoUrl: res.photo || "",
          kategori_ids: res.category_id ? [res.category_id] : [],
          course_ids: Array.isArray(res.courses) ? res.courses.map((c: any) => c.id) : [],
          fotoFile: null,
          is_active: res.is_active ?? true,
        };
        setInitialData(mapped);
      } catch (e) {
        toast({ type: "error", title: "Error", message: "Gagal ambil data" });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading || !initialData) return <div className="p-20 text-center">Loading data dosen...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Profil Dosen</h1>
      <ProfessorForm
        key={initialData.nip}
        initial={initialData}
        onCancel={() => nav("/admin/professors")}
        onSubmit={async (values) => {
          try {
            await updateAdminProfessor(Number(id), values);
            toast({ type: "success", title: "Sukses", message: "Data diupdate!" });
            nav("/admin/professors");
          } catch (e) {
            console.error("Update error:", e);
            toast({ type: "error", title: "Gagal", message: "Gagal update" });
          }
        }}
      />
    </div>
  );
}