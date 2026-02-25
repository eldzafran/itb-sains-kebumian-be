import Layout from "../../layout/index";
import Hero from "../../components/Home/Hero";
import ButtonMenuAkademik from "../../components/Akademik/ButtonsMenu";
import CTA from "../../components/Home/Cta";

export default function Informasi() {
  return (
    <Layout>
      <Hero page="informasi" />
      <ButtonMenuAkademik />
      <CTA />
    </Layout>
  );
}
