import ProgramOptions from "../../components/Profile/ProgramOptions";
import PublikasiPrestasi from "../../components/PublikasiPrestasi/PublikasiPrestasi";
import SectionHeader from "../../components/ui/SectionHeader";
import Layout from "../../layout/index";

export default function PublikasiAndPrestasi() {
  return (
    <Layout>
      <SectionHeader title="Publikasi dan Prestasi" />
      <PublikasiPrestasi />
      <ProgramOptions />
    </Layout>
  );
}
