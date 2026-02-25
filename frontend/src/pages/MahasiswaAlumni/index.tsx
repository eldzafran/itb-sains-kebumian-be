import CTA from "../../components/Home/Cta";
import KuesionerAlumni from "../../components/MahasiswaAlumni/KuesionerAlumni";
import MahasiswaAlumni from "../../components/MahasiswaAlumni/MahasiswaAlumni";
import SectionHeader from "../../components/ui/SectionHeader";
import Layout from "../../layout/index";

export default function MahasiswaAndAlumni() {
  return (
    <Layout>
        <SectionHeader title="Mahasiswa dan Alumni" />
        <MahasiswaAlumni/>
        <KuesionerAlumni/>
        <CTA/>

    </Layout>
  );
}
