import dynamic from "next/dynamic";
import PageLoader from "@/components/PageLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import WorksSection from "@/components/sections/WorksSection";
import AboutSection from "@/components/sections/AboutSection";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import { jsonLdScript, profilePageSchema } from "@/lib/seo";

/*
 * Everything below the fold is code-split. These are all client components
 * that were previously loaded eagerly on first paint even though a visitor
 * has to scroll several viewport heights to reach any of them.
 */
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"));
const WritingSection = dynamic(() => import("@/components/sections/WritingSection"));
const CertificatesParallax = dynamic(() => import("@/components/sections/CertificatesParallax"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));

/*
 * ProfilePage is Google's dedicated type for "this document is about this
 * person". Declaring it on the homepage is what separates an identity page
 * from a generic website in the eyes of a crawler trying to work out which
 * Rasmiranjan Sahoo this is. The Person it points at is emitted by the layout.
 */
const jsonLd = jsonLdScript([
  profilePageSchema(SITE_URL, `${SITE_NAME} — ${SITE_TAGLINE}`),
]);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      {/* Homepage only — see the note in app/layout.tsx. */}
      <PageLoader />
      <Header />

      <main id="main">
        <HeroSection />
        <WorksSection />
        <AboutSection />
        {/* The two full-screen "philosophy" quote slides that sat here and
            after the certificates were cut: two screens with no information. */}
        <SkillsSection />
        <WritingSection />
        <CertificatesParallax />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
