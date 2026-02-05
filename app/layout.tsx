import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import PageLoader from "@/components/PageLoader";
import CursorEffect from "@/components/CursorEffect";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Rasmiranjan Sahoo | Fullstack Developer",
  description: "Rasmiranjan Sahoo - Fullstack Developer specializing in React, Next.js, Node.js, and scalable web applications. Building modern digital experiences.",
  keywords: ["Fullstack Developer", "React", "Next.js", "Node.js", "Web Developer", "Rasmiranjan Sahoo"],
  authors: [{ name: "Rasmiranjan Sahoo" }],
  icons: {
    icon: "/image.png",
  },
  openGraph: {
    title: "Rasmiranjan Sahoo | Fullstack Developer",
    description: "Fullstack Developer crafting modern digital experiences",
    type: "website",
    url: "https://inirupampal.com",
    images: [
      {
        url: "https://inirupampal.com/apple-og-image.png",
        width: 1200,
        height: 630,
        alt: "Rasmiranjan Sahoo Pal Portfolio",
      },
    ],
    siteName: "Rasmiranjan Sahoo Pal Portfolio",
  },
};

const siteUrl = "https://inirupampal.com";
const siteName = "Rasmiranjan Sahool Portfolio";
const siteDescription = metadata.description as string;
const siteImage = `${siteUrl}/apple-og-image.png`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rasmiranjan Sahoo",
  "url": siteUrl,
  "sameAs": [
    "https://github.com/rasmi29",
    "https://linkedin.com/in/rasmiranjansahoo702"
  ],
  "jobTitle": "Fullstack Developer",
  "description": siteDescription
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title as string}</title>
        <meta name="description" content={siteDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={metadata.title as string} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:site_name" content={siteName} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title as string} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={siteImage} />
        <meta name="twitter:site" content="@rasmiranjan29" />

        {/* Favicon and Manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <body>
        <ThemeProvider>
          <ScrollProgress />
          <CursorEffect />
          <PageLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
