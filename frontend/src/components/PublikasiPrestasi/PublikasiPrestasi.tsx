import { GraduationCap } from "lucide-react";
import DataDirectory from "../ui/DataDirectory";

export default function PublikasiPrestasi() {
  return (
    <DataDirectory
      title="Mahasiswa dan Alumni"
      subtitle="Temukan informasi mengenai publikasi dan prestasi sivitas akademika Fakultas Ilmu dan Teknologi Kebumian."
      badgeText="Tabel Prestasi dan Publikasi"
      searchPlaceholder="Pencarian Mahasiswa ... (Nama/NIM)"
      icon={GraduationCap}
      categories={[
        { key: "prestasi-magister", label: "Prestasi Mhs Magister" },
        { key: "prestasi-mhs-doktoral", label: "Prestasi Mhs Doktoral" },
        { key: "prestasi-mhs--magister", label: "Prestasi Mhs Magister" },
        { key: "publikasi-mhs-magister", label: "Publikasi Mhs Magister" },
      ]}
      columns={[
        { label: "Nama Mahasiswa", key: "nama", span: 3 },
        { label: "Jenis Prestasi", key: "jenisPrestasi", span: 3 },
        { label: "Kegiatan Waktu dan Tempat", key: "kegiatan", span: 3 },
        { label: "Tingkat", key: "tingkat", span: 2 },
      ]}
      data={Array.from({ length: 10 }).map((_, i) => ({
        nama: ["Tengku Afrinita", "Afrinita", "Widiyatmoko"][i % 3],
        jenisPrestasi: "Juara 1 Lomba Nasional",
        kegiatan: "Seminar Geosains 2024 – Bandung",
        tingkat: "Nasional",
      }))}
    />
  );
}
