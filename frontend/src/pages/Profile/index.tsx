import FasilitasKampus from "../../components/Profile/FasilitasKampus";
import Intro from "../../components/Profile/Intro";
import Organisasi from "../../components/Profile/Organisasi";
// import ProgramOptions from "../../components/Profile/ProgramOptions";
// import StaffAdministrasi from "../../components/Profile/StaffAdministrasi";
import VisiMisi from "../../components/Profile/VisiMisi";
import SectionHeader from "../../components/ui/SectionHeader";
import Layout from "../../layout/index";
import Tujuan from "../../components/Profile/Tujuan";

export default function Profile() {
  return (
    <Layout>
      <SectionHeader title="Profil" />
      <Intro />
      <Tujuan />
      <VisiMisi />
      <Organisasi />
      <FasilitasKampus />
    </Layout>
  );
}
