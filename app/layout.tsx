import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import PageLoader from "@/components/PageLoader";
import CursorEffect from "@/components/CursorEffect";
import ScrollProgress from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: "Rasmiranjan Sahoo | Best Freelance Web & App Developer in Odisha, India",
  description: "Expert Freelance Fullstack Developer in Odisha, India. Specializing in Web Development, App Development (React Native), and Gen AI solutions. Hire the best freelancer for scalable digital products.",
  keywords: [
    "Best Freelancer in Odisha", 
    "Top Web Developer in India", 
    "App Development Odisha", 
    "AI Developer India", 
    "Fullstack Developer Odisha", 
    "Freelance React Developer", 
    "Next.js Expert India", 
    "Rasmiranjan Sahoo Portfolio",
    "Generative AI Freelancer India",
    "Mobile App Developer Odisha"
  ],
  authors: [{ name: "Rasmiranjan Sahoo" }],
  icons: {
    icon: "/image.png",
  },
  openGraph: {
    title: "Rasmiranjan Sahoo | Top-Rated Freelancer in Web, App & AI",
    description: "Building production-ready web and mobile applications with a focus on Gen AI. Based in Odisha, India.",
    type: "website",
    url: "https://rasmiranjan.me",
    images: [
      {
        url: "/rasmi.jpg",
        width: 1200,
        height: 630,
        alt: "Rasmiranjan Sahoo Portfolio",
      },
    ],
    siteName: "Rasmiranjan Sahoo Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rasmiranjan Sahoo | Freelance Web & App Developer",
    description: "Expert digital solutions in Web, App, and AI based in Odisha, India.",
    images: ["/rasmi.jpg"],
    creator: "@rasmiranjan29",
  }
};

const siteUrl = "https://rasmiranjan.me";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Rasmiranjan Sahoo",
  "url": siteUrl,
  "logo": `${siteUrl}/image.png`,
  "image": `${siteUrl}/rasmi.jpg`,
  "description": "Best Freelance Web and App Developer in Odisha, India. Expertise in React, Next.js, React Native, and Generative AI.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bhubaneswar",
    "addressRegion": "Odisha",
    "addressCountry": "India"
  },
  "serviceType": [
    "Web Development",
    "Mobile App Development",
    "AI Solution Development",
    "Fullstack Freelancing"
  ],
  "sameAs": [
    "https://github.com/rasmi29",
    "https://linkedin.com/in/rasmiranjansahoo702"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {/* Structured Data */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />
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
