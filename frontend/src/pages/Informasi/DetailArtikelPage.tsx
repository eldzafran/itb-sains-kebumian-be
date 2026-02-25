import Layout from "../../layout/index";
import DetailArtikel from "../../components/Informasi/DetailArtikel";
import RelatedArtikel from "../../components/Informasi/RelatedArtikel";
import JoinSection from "../../components/ui/SectionFooter.js";

export default function DetailArtikelPage() {
  return (
    <Layout>
      <DetailArtikel />
      <RelatedArtikel />
      <JoinSection />
    </Layout>
  );
}
