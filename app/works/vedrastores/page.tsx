"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const webPlatforms = [
  {
    title: "Marketing Platform",
    url: "shop.vedrastores.co.ke",
    liveUrl: "https://shop.vedrastores.co.ke",
    image: "/Projects/Vedrastore/Vedrastore-marketing-banner.png",
    gallery: [
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 124601.png",
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 124749.png",
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 124820.png",
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 124839.png",
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 124903.png",
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 124925.png",
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 124940.png",
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 124957.png",
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 125007.png",
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 125013.png",
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 125021.png",
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 125030.png",
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 125051.png",
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 125138.png",
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 125157.png",
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 125225.png",
      "/Projects/Vedrastore/vedrastore-marketing-ss/Screenshot 2026-05-12 125243.png",
    ],
    description:
      "The public-facing brand engine. A high-performance marketing platform designed for extreme SEO efficiency and conversion optimization.",
    features: [
      "SEO Masterclass",
      "Conversion Optimized",
      "Brand Identity Showcase",
    ],
    color: "bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "Buyer Portal",
    url: "vedrastores.co.ke",
    liveUrl: "https://vedrastores.co.ke",
    image: "/Projects/Vedrastore/vedra-buyer-banner-web.png",
    gallery: [
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 132320.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 132403.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 132459.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 132512.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 132525.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 132533.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 132814.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 132822.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 132836.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 132903.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 132913.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 132920.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 132929.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 132941.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 133112.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 133146.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 133153.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 133253.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 133321.png",
      "/Projects/Vedrastore/buyer-web-ss/Screenshot 2026-05-12 133328.png"
    ],
    description:
      "The flagship customer engine. A full-featured web portal where customers explore products, manage accounts, and track deliveries with real-time precision.",
    features: [
      "Dynamic Product Discovery",
      "Unified Account Hub",
      "Real-time Order Tracking",
      "M-Pesa Checkout Flow",
    ],
    color: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Vendor Dashboard",
    url: "vendor.vedrastores.co.ke",
    liveUrl: "https://vendor.vedrastores.co.ke",
    image: "/Projects/Vedrastore/vendor-banner.png",
    gallery: [
      "/Projects/Vedrastore/Vedra-vendor-ss/Screenshot 2026-05-12 133626.png",
      "/Projects/Vedrastore/Vedra-vendor-ss/Screenshot 2026-05-12 133701.png",
      "/Projects/Vedrastore/Vedra-vendor-ss/Screenshot 2026-05-12 133709.png",
      "/Projects/Vedrastore/Vedra-vendor-ss/Screenshot 2026-05-12 133724.png",
      "/Projects/Vedrastore/Vedra-vendor-ss/Screenshot 2026-05-12 133734.png",
      "/Projects/Vedrastore/Vedra-vendor-ss/Screenshot 2026-05-12 133741.png",
      "/Projects/Vedrastore/Vedra-vendor-ss/Screenshot 2026-05-12 133759.png",
      "/Projects/Vedrastore/Vedra-vendor-ss/Screenshot 2026-05-12 133804.png",
      "/Projects/Vedrastore/Vedra-vendor-ss/Screenshot 2026-05-12 133815.png",
      "/Projects/Vedrastore/Vedra-vendor-ss/Screenshot 2026-05-12 133821.png",
      "/Projects/Vedrastore/Vedra-vendor-ss/Screenshot 2026-05-12 133833.png",
      "/Projects/Vedrastore/Vedra-vendor-ss/Screenshot 2026-05-12 133838.png",
      "/Projects/Vedrastore/Vedra-vendor-ss/Screenshot 2026-05-12 133845.png",
      "/Projects/Vedrastore/Vedra-vendor-ss/Screenshot 2026-05-12 133852.png",
      "/Projects/Vedrastore/Vedra-vendor-ss/Screenshot 2026-05-12 133909.png",
      "/Projects/Vedrastore/Vedra-vendor-ss/Screenshot 2026-05-12 133917.png"
    ],
    description:
      "A comprehensive B2B management ecosystem. Vendors can effortlessly list products, track sales performance, and manage real-time inventory through a high-performance analytics interface.",
    features: [
      "Real-time Sales Analytics",
      "Dynamic Inventory Control",
      "Automated Payout Tracking",
      "Product Performance Insights",
    ],
    color: "bg-purple-500/10 border-purple-500/20",
  },
  {
    title: "Admin Masterpiece",
    url: "admin.vedrastores.co.ke",
    liveUrl: "https://admin.vedrastores.co.ke",
    image: "/Projects/Vedrastore/Admin-banner.png",
    gallery: [
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115145.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115211.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115230.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115239.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115310.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115328.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115346.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115355.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115431.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115448.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115512.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115534.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115545.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115603.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115617.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115640.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115759.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115807.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115831.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115902.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115914.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115924.png",
      "/Projects/Vedrastore/Admin-panel-ss/Screenshot 2026-05-12 115942.png",
    ],
    description:
      "The central control hub built with Shadcn UI and React. Powered by Firebase for real-time data and AWS S3/CloudFront for high-performance asset delivery.",
    features: [
      "M-Pesa Payouts",
      "AWS S3 Storage",
      "Real-time Firebase DB",
      "Shadcn UI Dashboards",
    ],
    color: "bg-red-500/10 border-red-500/20",
  },
];

const mobileApps = [
  {
    title: "Vedrastores App",
    platform: "Android & iOS",
    tech: "React Native & Expo",
    icon: "/Projects/Vedrastore/vedrastore-icon.png",
    image:
      "/Projects/Vedrastore/Buyer-app-screenshots/Screenshot_20260429_161038.jpg.jpeg",
    gallery: [
      "/Projects/Vedrastore/Buyer-app-screenshots/Screenshot_20260429_161108.jpg.jpeg",
      "/Projects/Vedrastore/Buyer-app-screenshots/Screenshot_20260429_161127.jpg.jpeg",
      "/Projects/Vedrastore/Buyer-app-screenshots/Screenshot_20260429_185711.jpg.jpeg",
      "/Projects/Vedrastore/Buyer-app-screenshots/Screenshot_20260429_185742.jpg.jpeg",
      "/Projects/Vedrastore/Buyer-app-screenshots/Screenshot_20260429_185750.jpg.jpeg",
      "/Projects/Vedrastore/Buyer-app-screenshots/Screenshot_20260429_185854.jpg.jpeg",
    ],
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=co.ke.vedrastores.app",
    appStoreUrl: "#",
    description:
      "Built with React Native and Expo. Features M-Pesa integration, Firebase Auth, and AWS CloudFront optimized images.",
  },
  {
    title: "Rider Companion",
    platform: "Android only (APK)",
    tech: "React Native & Expo",
    icon: "/Projects/Vedrastore/vedrastore-rider-icon.png",
    image:
      "/Projects/Vedrastore/Rider-App-Screenshots/Screenshot_20260425_182338.jpg.jpeg",
    gallery: [
      "/Projects/Vedrastore/Rider-App-Screenshots/Screenshot_20260425_182348.jpg.jpeg",
      "/Projects/Vedrastore/Rider-App-Screenshots/Screenshot_20260425_182359.jpg.jpeg",
      "/Projects/Vedrastore/Rider-App-Screenshots/Screenshot_20260425_182453.jpg.jpeg",
      "/Projects/Vedrastore/Rider-App-Screenshots/Screenshot_20260425_182524.jpg.jpeg",
      "/Projects/Vedrastore/Rider-App-Screenshots/Screenshot_20260425_182651.jpg.jpeg",
      "/Projects/Vedrastore/Rider-App-Screenshots/Screenshot_20260425_182737.jpg.jpeg",
      "/Projects/Vedrastore/Rider-App-Screenshots/Screenshot_20260429_161122.jpg.jpeg",
    ],
    playStoreUrl: "#", // Usually APK for riders
    description:
      "The logistics powerhouse built with Expo. Real-time order tracking via Firebase and secure M-Pesa earnings management.",
  },
];

const GrainOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-20">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat brightness-100 contrast-150" />
  </div>
);

const WebPlatformCard = ({
  web,
  i,
}: {
  web: (typeof webPlatforms)[0];
  i: number;
}) => {
  const [showGallery, setShowGallery] = React.useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.offsetWidth * 0.8; // Match the min-w-[80%]
    const newIndex = Math.round(scrollLeft / itemWidth);
    setActiveIndex(newIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col gap-12 relative"
    >
      {/* Background Glow */}
      <div
        className={`absolute -inset-24 bg-gradient-to-br ${i % 2 === 0 ? "from-blue-500/5" : "from-emerald-500/5"} to-transparent rounded-[5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Static Main Banner */}
        <div
          className={`lg:col-span-7 flex flex-col aspect-video rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl ${i % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}
        >
          {/* Browser Bar */}
          <div className="h-8 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center px-4 gap-2 z-20 shrink-0">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
            <div className="ml-4 h-4 flex-1 rounded bg-white/5 px-2 text-[8px] flex items-center text-neutral-400 font-mono">
              {web.url}
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden">
            <Image
                src={web.image}
                alt={web.title}
                fill
                className="object-contain object-top transition-transform duration-700 opacity-100"
            />
          </div>
        </div>

        {/* Content */}
        <div
          className={`lg:col-span-5 ${i % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">
            {web.title}
          </h3>
          <p className="text-neutral-400 font-light text-lg mb-8 leading-relaxed">
            {web.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {web.features.map((f) => (
              <span
                key={f}
                className="text-[10px] uppercase tracking-wider text-neutral-400 border border-white/10 bg-white/5 px-4 py-2 rounded-full hover:border-white/30 transition-colors"
              >
                {f}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href={web.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-emerald-500 transition-all shadow-xl hover:shadow-emerald-500/20"
            >
              Launch Live Site
            </a>
            <button
              onClick={() => setShowGallery(!showGallery)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 border ${showGallery ? "bg-white/10 border-white/20" : "border-white/10 hover:border-white/30"} text-[10px] font-bold uppercase tracking-[0.3em] transition-all group/btn`}
            >
              <span className="relative">
                {showGallery ? "Hide Gallery" : "View Screenshots"}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-300 ${showGallery ? "w-full" : "w-0 group-hover/btn:w-full"}`}
                />
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-500 ${showGallery ? "rotate-180 text-emerald-400" : "text-neutral-500 group-hover/btn:text-white"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Marquee - Specifically for Screenshots */}
      <motion.div
        initial={false}
        animate={{
          height: showGallery ? "auto" : 0,
          opacity: showGallery ? 1 : 0,
        }}
        className="overflow-hidden"
      >
        <div className="mt-8 overflow-hidden group/marquee px-6 py-20">
          <div
            className="animate-marquee flex gap-8"
            style={
              {
                "--duration": `${web.gallery.length * 6}s`,
                animationPlayState: showGallery ? "running" : "paused",
              } as React.CSSProperties
            }
          >
            {/* Double the images for seamless loop */}
            {[...web.gallery, ...web.gallery].map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.3 }}
                className="min-w-[85vw] md:min-w-[55vw] aspect-video relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-xl shrink-0"
              >
                <Image
                  src={img}
                  alt={`${web.title} screenshot ${idx}`}
                  fill
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AppCard = ({ app, i }: { app: (typeof mobileApps)[0]; i: number }) => {
  const [showGallery, setShowGallery] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.offsetWidth * 0.7; // Match the min-w-[70%]
    const newIndex = Math.round(scrollLeft / itemWidth);
    setActiveIndex(newIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col p-8 md:p-12 rounded-[3rem] border border-white/5 bg-neutral-900/40 backdrop-blur-md relative overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0" />

      <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
        {/* Big 1:1 App Icon */}
        <div className="shrink-0 relative h-48 w-48 md:h-64 md:w-64 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 bg-black/40 group-hover:border-emerald-500/30">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Image
            src={app.icon}
            alt={`${app.title} icon`}
            fill
            className="object-contain p-8 relative z-10"
          />
        </div>

        {/* App Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">
              {app.title}
            </h3>
            <span className="px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
              {app.platform}
            </span>
          </div>
          <p className="text-neutral-400 font-light text-lg mb-8 leading-relaxed max-w-2xl">
            {app.description}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500">
                Built with
              </span>
              <span className="px-4 py-2 rounded-lg border border-white/10 text-[10px] uppercase font-bold text-neutral-300 bg-white/5 hover:border-emerald-500/30 transition-colors">
                {app.tech}
              </span>
            </div>
          </div>
        </div>

        {/* View Gallery Button */}
        <button
          onClick={() => setShowGallery(!showGallery)}
          className="group/btn flex flex-col items-center gap-3"
        >
          <div
            className={`h-16 w-16 flex items-center justify-center border border-white/10 rounded-full transition-all duration-500 ${showGallery ? "bg-emerald-500 border-emerald-500 text-black" : "hover:border-emerald-500/50 hover:bg-emerald-500/5"}`}
          >
            <svg
              className={`w-6 h-6 transition-transform duration-500 ${showGallery ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-500">
            Screenshots
          </span>
        </button>
      </div>

      {/* Marquee Gallery */}
      <motion.div
        initial={false}
        animate={{
          height: showGallery ? "auto" : 0,
          opacity: showGallery ? 1 : 0,
        }}
        className="overflow-hidden"
      >
        <div className="pt-24 pb-12 border-t border-white/5 mt-12 relative overflow-hidden group/marquee px-6 py-16">
          <div
            className="animate-marquee flex gap-12"
            style={
              {
                "--duration": `${[app.image, ...app.gallery].length * 8}s`,
                animationPlayState: showGallery ? "running" : "paused",
              } as React.CSSProperties
            }
          >
            {/* Double the images for seamless loop */}
            {[
              ...[app.image, ...app.gallery],
              ...[app.image, ...app.gallery],
            ].map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.3 }}
                className="min-w-[75vw] md:min-w-[28vw] aspect-[9/19] relative rounded-[2.8rem] p-3 border-[7px] border-neutral-800 bg-black shadow-2xl shrink-0"
              >
                {/* Dot Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-10" />
                <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                  <Image
                    src={img}
                    alt={`${app.title} screenshot ${idx}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function VedrastoresPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-emerald-500/30 overflow-x-hidden">
      <GrainOverlay />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <Link
            href="/#works"
            className="group flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Works
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            Case Study / 2026
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] -z-10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col relative"
            >
              {/* Project Number */}
              <span className="absolute -top-12 -left-4 text-[10rem] font-black text-white/[0.03] select-none pointer-events-none">
                01
              </span>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-8 bg-emerald-500" />
                <span className="text-emerald-500 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
                  Masterpiece Collection
                </span>
              </div>

              <h1 className="text-7xl md:text-8xl lg:text-[11rem] font-black tracking-tighter leading-[0.75] mb-10">
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/40">
                  VEDRA
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-neutral-500 via-neutral-600 to-neutral-800">
                  STORES.
                </span>
              </h1>

              <p className="max-w-xl text-xl md:text-2xl font-light text-neutral-400 leading-relaxed mb-12 border-l-2 border-emerald-500/30 pl-8">
                A comprehensive e-commerce infrastructure developed for the
                Kenya market. Built single-handedly from scratch in 4 months,
                featuring a highly-optimized ecosystem of 4 web platforms and 2
                mobile applications.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  "React Native",
                  "Expo",
                  "Shadcn",
                  "Firebase",
                  "AWS",
                  "M-Pesa",
                ].map((t) => (
                  <span
                    key={t}
                    className="px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-[9px] font-black tracking-widest text-neutral-400 uppercase hover:text-white hover:border-white/30 hover:bg-white/5 transition-all cursor-default"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Bento Style Showcase Grid - Design Overhaul */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="grid grid-cols-2 gap-3 md:gap-4 w-full"
            >
              {/* Main Banner - Glassmorphism & High-End Effects */}
              <div className="col-span-2 relative aspect-[16/9] md:aspect-[21/9] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-neutral-900 group/hero">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <Image
                  src="/Projects/Vedrastore/vedrastore-banner.png"
                  alt="Vedrastores Ecosystem"
                  fill
                  className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Floating Info Overlay */}
                <div className="absolute top-6 right-6">
                  <div className="glass px-4 py-2 rounded-full border border-white/20 flex items-center gap-3">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-white/80">
                      Active Infrastructure
                    </span>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>

                <div className="absolute bottom-8 left-8">
                  <h3 className="text-xl md:text-3xl font-bold tracking-tight text-white mb-1">
                    Ecosystem Core
                  </h3>
                  <p className="text-white/50 font-mono text-[9px] uppercase tracking-[0.3em]">
                    Full-Stack Masterpiece
                  </p>
                </div>
              </div>

              {/* Buyer App Card - Refined Design */}
              <div className="relative aspect-[1.1/1] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/10 bg-black shadow-2xl group/icon flex items-center justify-center p-2 transition-all duration-500 hover:border-emerald-500/30 hover:-translate-y-1">
                {/* Glow Spot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                  <div className="relative w-[92%] h-[92%]">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Image
                      src="/Projects/Vedrastore/vedrastore-icon.png"
                      alt="Buyer App"
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-105 group-hover:rotate-[2deg] drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                </div>
              </div>

              {/* Rider App Card - Refined Design */}
              <div className="relative aspect-[1.1/1] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/10 bg-black shadow-2xl group/icon flex items-center justify-center p-2 transition-all duration-500 hover:border-blue-500/30 hover:-translate-y-1">
                {/* Glow Spot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                  <div className="relative w-[92%] h-[92%]">
                    <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Image
                      src="/Projects/Vedrastore/vedrastore-rider-icon.png"
                      alt="Rider App"
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-105 group-hover:rotate-[-2deg] drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Web Section */}
      <section className="py-32 px-6 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col mb-20">
            <span className="text-blue-500 font-mono text-xs uppercase tracking-widest mb-4">
              Web Infrastructure
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Interconnected
              <br />
              Web Platforms.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-32">
            {webPlatforms.map((web, i) => (
              <WebPlatformCard key={web.title} web={web} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* App Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col mb-20 text-center items-center">
            <span className="text-emerald-500 font-mono text-xs uppercase tracking-widest mb-4">
              Mobile Experience
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Cross-Platform Native Apps.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {mobileApps.map((app, i) => (
              <AppCard key={app.title} app={app} i={i} />
            ))}
          </div>
        </div>
      </section>
      {/* Footer CTA */}
      <section className="py-40 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-10 italic text-neutral-800">
            Efficiency through <span className="text-white">innovation.</span>
          </h2>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-10 py-5 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-emerald-500 transition-colors"
          >
            Discuss a similar project
          </Link>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono text-neutral-500 uppercase tracking-[0.3em]">
          <p>© 2026 VEDRASTORES Case Study</p>
          <p>Handled by Rasmiranjan Sahoo</p>
        </div>
      </footer>
    </main>
  );
}
