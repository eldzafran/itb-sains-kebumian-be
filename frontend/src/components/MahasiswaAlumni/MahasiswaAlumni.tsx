import { GraduationCap } from "lucide-react";
import DataDirectory from "../ui/DataDirectory.js";

export default function MahasiswaAlumni() {
  return (
    <DataDirectory
      title="Mahasiswa dan Alumni"
      subtitle="Temukan Informasi mengenai mahasiswa dan alumni Fakultas Ilmu Teknologi dan Kebumian"
      badgeText="Informasi Mahasiswa dan Alumni"
      searchPlaceholder="Pencarian Mahasiswa ... (Nama/NIM)"
      icon={GraduationCap}
      categories={[
        { key: "magister", label: "Mahasiswa Magister" },
        { key: "doktoral", label: "Mahasiswa Doktoral" },
        { key: "alumni-magister", label: "Alumni Magister" },
        { key: "alumni-doktoral", label: "Alumni Doktoral" },
      ]}
      columns={[
        { label: "NIM", key: "nim", span: 3 },
        { label: "Nama", key: "nama", span: 3 },
      ]}
      data={Array.from({ length: 20 }).map((_, i) => ({
        nim: "22416002",
        nama: ["Tengku Afrinita", "Afrinita", "Tengku", "Widiyatmoko"][i % 4],
      }))}
    />
  );
}
