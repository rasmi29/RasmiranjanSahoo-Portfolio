import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/sections/ContactSection";
import { AUTHOR, SITE_URL } from "@/lib/site";
import { ID, breadcrumbSchema, jsonLdScript } from "@/lib/seo";

/*
 * A real /contact URL. "Contact" is one of the most common sitelinks Google
 * shows under a name result — but only when it is a separate page. The
 * homepage's #contact block is a fragment, which Google never lists.
 */

const TITLE = "Contact Rasmiranjan Sahoo — Full-Stack Developer in Bhubaneswar";
const DESCRIPTION =
  "Get in touch with Rasmiranjan Sahoo (Rasmi), full-stack and React Native developer in Bhubaneswar, India. Projects, roles and collaborations — replies within 24 hours.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/contact`,
    title: TITLE,
    description: DESCRIPTION,
  },
};

const jsonLd = jsonLdScript([
  {
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact#page`,
    url: `${SITE_URL}/contact`,
    name: TITLE,
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.person },
    mainEntity: {
      "@id": ID.person,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: AUTHOR.email,
        availableLanguage: ["English", "Hindi", "Odia"],
      },
    },
  },
  breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Contact", url: `${SITE_URL}/contact` },
  ]),
]);

export default function ContactPage() {
  return (
    <main id="main" className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <nav
        aria-label="Breadcrumb"
        className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/5 bg-black/60 backdrop-blur-md"
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="group flex items-center gap-2 font-mono text-sm text-neutral-400 transition-colors hover:text-white"
          >
            <svg aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back home
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400">Contact</span>
        </div>
      </nav>

      <ContactSection standalone />
    </main>
  );
}
