import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Languages from "@/components/Languages";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Experience />
      <Languages />
      <Contact />
    </Layout>
  );
}
