import KontakDetail from "../../components/KontakKami/KontakDetail";
import KontakMap from "../../components/KontakKami/KontakMap";
import ContactForm from "../../components/KontakKami/ContactForm";
import CTA from "../../components/Home/Cta";
import SectionHeader from "../../components/ui/SectionHeader";
import Layout from "../../layout/index";

export default function KontakKami() {
  return (
    <Layout>
      <SectionHeader title="Kontak Kami" />
      <ContactForm />
      <KontakMap />
      <CTA />
    </Layout>
  );
}
