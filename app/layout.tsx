import type { Metadata, Viewport } from "next";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import CursorEffect from "@/components/CursorEffect";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

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
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/**
 * One consolidated entity graph. The @id cross-references are what let a
 * crawler (and an LLM) understand these as one entity rather than three
 * unrelated documents.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR.name,
      url: SITE_URL,
      image: `${SITE_URL}/rasmi.webp`,
      jobTitle: AUTHOR.jobTitle,
      email: `mailto:${AUTHOR.email}`,
      description: SITE_DESCRIPTION,
      knowsAbout: [
        "React",
        "Next.js",
        "React Native",
        "Expo",
        "Node.js",
        "TypeScript",
        "M-Pesa Integration",
        "E-commerce Architecture",
        "Multi-vendor Marketplaces",
        "Generative AI",
        "LangChain",
        "Firebase",
        "AWS",
      ],
      sameAs: [AUTHOR.github, AUTHOR.linkedin],
      address: {
        "@type": "PostalAddress",
        addressLocality: AUTHOR.locality,
        addressRegion: AUTHOR.region,
        addressCountry: AUTHOR.country,
      },
    },
    {
      // Service (not the discouraged generic ProfessionalService), with
      // areaServed instead of a storefront address so reach isn't capped local.
      "@type": "Service",
      "@id": `${SITE_URL}/#service`,
      name: "Freelance Web, Mobile and AI Development",
      provider: { "@id": `${SITE_URL}/#person` },
      serviceType: "Web and Mobile Application Development",
      areaServed: { "@type": "Place", name: "Worldwide" },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${SITE_URL}/#contact`,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Development Services",
        itemListElement: [
          "Web Application Development",
          "Mobile App Development (React Native)",
          "E-commerce & Marketplace Development",
          "Generative AI Integration",
        ].map((n) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: n },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${SITE_NAME} — Portfolio`,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased bg-black text-white" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-10000 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-black"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <CursorEffect />
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
