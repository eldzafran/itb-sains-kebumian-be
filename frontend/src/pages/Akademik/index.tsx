import Layout from "../../layout/index.jsx";
import Hero from "../../components/Home/Hero.js";
import ButtonMenuAkademik from "../../components/Akademik/ButtonsMenu.js";
import CTA from "../../components/Home/Cta.jsx";

export default function Akademik() {
  return (
    <Layout>
      <Hero page="akademik" />
      <ButtonMenuAkademik/>
      <CTA/>
    </Layout>
  );
}
