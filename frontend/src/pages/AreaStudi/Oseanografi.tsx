import Layout from "../../layout/index";
import Hero from "../../components/AreaStudi/Oseanografi/HeroOseanografi";
import Spesialisasi from "../../components/AreaStudi/Spesialisasi";
import Matkul from "../../components/Matkul/Matkul";

export default function Akademik() {
  return (
    <Layout>
      <Hero page="akademik" />
      <Spesialisasi/>
      <Matkul/>
    </Layout>
  );
}
