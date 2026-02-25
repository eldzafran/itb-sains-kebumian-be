import Dosen from "../../components/Dosen/Dosen";
import SectionHeader from "../../components/ui/SectionHeader";
import Layout from "../../layout/index.jsx";

export default function DosenPage() {
  return <Layout>
    <SectionHeader title={<span>Akademisi <span style={{background: "linear-gradient(90deg, #00D3F2 0%, #29BBF9 50%, #7C86FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>Dosen</span></span>} />
    <Dosen />
  </Layout>;
}
