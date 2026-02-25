
import Artikel from "../../components/Informasi/Artikel.js";
import SectionHeader from "../../components/ui/SectionHeader.js";
import Layout from "../../layout/index.jsx";
import JoinSection from "../../components/ui/SectionFooter.js";


export default function ArtikelPage() {
  return (
    <Layout>
      <SectionHeader title="Informasi" />
      <Artikel />
      <JoinSection />
    </Layout>
  );
}