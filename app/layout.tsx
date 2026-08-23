import type { Metadata, Viewport } from "next";
import "./globals.css";
import CursorEffect from "@/components/CursorEffect";
import ScrollProgress from "@/components/ui/ScrollProgress";
import {
  AUTHOR,
  SAME_AS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  VERIFICATION,
} from "@/lib/site";
import {
  jsonLdScript,
  organizationSchema,
  personSchema,
  photoSchema,
  serviceSchema,
  websiteSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR.name, url: SITE_URL }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ["/og.jpg"],
    creator: AUTHOR.twitter,
  },
  manifest: "/manifest.webmanifest",
  /* Tokens come from the build env, so they are never committed. An empty
     string makes Next omit the tag rather than emit a broken one. */
  verification: {
    ...(VERIFICATION.google ? { google: VERIFICATION.google } : {}),
    ...(VERIFICATION.bing ? { other: { "msvalidate.01": VERIFICATION.bing } } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/**
 * The identity graph — emitted on every page, because these statements are
 * true everywhere on the site.
 *
 * The @id cross-references are what let a crawler (and an LLM) understand
 * these as one entity rather than several unrelated documents. Every node is
 * built from `lib/seo.ts`, so /about and the case studies point at the same
 * person object instead of describing a near-duplicate of it.
 *
 * Page-level nodes (ProfilePage, FAQPage, BreadcrumbList, CreativeWork) belong
 * to individual pages and live there — a FAQPage in particular is only
 * eligible where its answers are visibly rendered, which is /about alone.
 */
const jsonLd = jsonLdScript([
  personSchema(),
  photoSchema(),
  organizationSchema(),
  websiteSchema(),
  serviceSchema(),
]);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* rel="me" is the machine-readable half of identity verification.
            It only pays off once each profile links back here — see
            SEO-PLAYBOOK.md, step 3. */}
        {SAME_AS.map((url) => (
          <link key={url} rel="me" href={url} />
        ))}
      </head>
      <body className="antialiased bg-black text-white" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-10000 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-black"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <CursorEffect />
        {/* PageLoader is deliberately NOT here any more.
            In the App Router the root layout mounts fresh on every *direct*
            hit, so a loader at this level ran its 2.5s boot sequence over
            /about and /works too — i.e. precisely the pages a search visitor
            lands on, who then stares at a black overlay before seeing a word.
            It now lives in app/page.tsx, where the brand moment belongs. */}
        {children}
      </body>
    </html>
  );
}
