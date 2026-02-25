
import SectionHeader from "../../components/ui/SectionHeader.js";
import Layout from "../../layout/index.jsx";
import JoinSection from "../../components/ui/SectionFooter.js";
import CourseAccordionSection from "../../components/Matkul/Matkul";


export default function KurikulumMitigasiPage() {
  return (
    <Layout>
          <SectionHeader title={<span>Kurikulum Spesialisasi <span style={{background: "linear-gradient(90deg, #00D3F2 0%, #29BBF9 50%, #7C86FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>Mitigasi Bencana Kebumian</span></span>} />  
      <CourseAccordionSection />
      <JoinSection />
    </Layout>
  );
}