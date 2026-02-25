import Layout from "../../layout/index.jsx";
import Hero from "../../components/Home/Hero.js";
import Testimonial from "../../components/Home/Testimonial.js";
import ContactUs from "../../components/Home/ContactUs.js";
import CTA from "../../components/Home/Cta.jsx";
import QuickMenu from "../../components/Home/QuickMenu.js";


export default function Home() {
  return (
    <Layout>
      <Hero />
      <QuickMenu />
      <Testimonial/>
      <ContactUs />
      <CTA/>
    </Layout>
  );
}
