import Layout from "../../layout/index";
import Hero from "../../components/AreaStudi/SainsKebumian/HeroSainsKebumian";
import Matkul from "../../components/Matkul/Matkul";
import Spesialisasi from "../../components/AreaStudi/Spesialisasi";

export default function Akademik() {
  return (
    <Layout>
      <Hero page="akademik" />  
      <Spesialisasi/>
      <Matkul/>
    </Layout>
  );
}
