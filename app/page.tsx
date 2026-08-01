import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import WorksSection from "@/components/sections/WorksSection";
import AboutSection from "@/components/sections/AboutSection";

/*
 * Everything below the fold is code-split. These are all client components
 * that were previously loaded eagerly on first paint even though a visitor
 * has to scroll several viewport heights to reach any of them.
 */
const ParallaxSection = dynamic(() => import("@/components/sections/ParallaxSection"));
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"));
const CertificatesParallax = dynamic(() => import("@/components/sections/CertificatesParallax"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));

export default function Home() {
  return (
    <>
      <Header />

      <main id="main">
        <HeroSection />
        <WorksSection />
        <AboutSection />

        <ParallaxSection
          heading="Building the Future"
          subheading="Philosophy"
          quote="Great software is not just about code—it's about solving real problems with elegant solutions."
        />

        <SkillsSection />
        <CertificatesParallax />

        <ParallaxSection
          heading="Crafting Digital Experiences"
          subheading="Vision"
          quote="Every line of code is an opportunity to create something that matters."
        />

        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
