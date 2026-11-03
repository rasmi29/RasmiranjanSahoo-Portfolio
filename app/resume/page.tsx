import type { Metadata } from "next";
import Link from "next/link";
import { RESUME, SITE_URL } from "@/lib/site";
import { breadcrumbSchema, jsonLdScript } from "@/lib/seo";
import ResumeContent from "@/components/resume/ResumeContent";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Footer from "@/components/Footer";

/*
 * The resume as a real page. Every "Resume" button links here, so a visitor
 * without JavaScript, a middle-click, or a shared link still lands somewhere
 * useful — with JavaScript, a plain click opens the same content as an
 * overlay instead (components/resume/ResumeViewer.tsx).
 */

const TITLE = "Resume — Rasmiranjan Sahoo, Full-Stack & React Native Developer";
const DESCRIPTION =
  "View or download the one-page resume of Rasmiranjan Sahoo: 17 websites and 8 apps shipped, lead developer on five client platforms at Gravitones, founder of Rathaworks.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/resume" },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/resume`,
    title: TITLE,
    description: DESCRIPTION,
  },
};

const jsonLd = jsonLdScript([
  breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Resume", url: `${SITE_URL}/resume` },
  ]),
]);

export default function ResumePage() {
  return (
    <>
      <main id="main" className="relative min-h-screen overflow-hidden bg-black text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
        <GrainOverlay />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-0 h-144 w-144 rounded-full bg-emerald-500/15 blur-[130px]"
        />

        <nav
          aria-label="Breadcrumb"
          className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/5 bg-black/60 backdrop-blur-md"
        >
          <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
            <Link
              href="/"
              className="group flex items-center gap-2 font-mono text-sm text-neutral-400 transition-colors hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back home
            </Link>
            <a
              href={RESUME.pdf}
              download={RESUME.fileName}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 transition-colors hover:text-emerald-400"
            >
              PDF · {RESUME.pdfKB} KB
            </a>
          </div>
        </nav>

        <div className="relative z-30 pt-32 pb-32 md:pb-24">
          <ResumeContent mode="page" />
        </div>
      </main>
      <Footer />
    </>
  );
}
