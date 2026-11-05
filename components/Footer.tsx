"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Marquee from "@/components/ui/Marquee";
import { AUTHOR, PROFILES, RESUME, STUDIO } from "@/lib/site";
import { openResume, preloadResume } from "@/components/resume/resumeEvents";
import { EASE } from "@/lib/motion";

/* Real pages only. The old list linked to /#works-style fragments, which
   Google collapses into the homepage, so they never counted as site structure.
   Descriptive anchors ("About Rasmiranjan Sahoo") also tell a crawler what
   each page is for. */
const FOOTER_NAV = [
  { name: "Home", href: "/" },
  { name: "Case Studies", href: "/works" },
  { name: "All Projects", href: "/projects" },
  { name: "About Rasmiranjan Sahoo", href: "/about" },
  { name: "Writing", href: "/writing" },
  { name: "Contact", href: "/contact" },
];

/*
 * `me` in the rel attribute is the identity claim: "this profile is the same
 * person as this site". It is only half a proof — the profile has to link back
 * — but it is the half that lives in the codebase.
 */
const socialLinks = [
  ...PROFILES.map((p) => ({ name: p.name, href: p.url, external: true, me: true })),
  { name: "Email", href: `mailto:${AUTHOR.email}`, external: false, me: false },
  { name: "Resume", href: RESUME.page, external: false, me: false },
];

/** What gets built — every item is backed by a project on this site. */
const SERVICES = [
  "Websites",
  "Mobile Apps",
  "E-commerce",
  "Booking Platforms",
  "Delivery Systems",
  "Business Software",
  "Admin Dashboards",
  "Payment Integrations",
];

const column = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.out } },
} as const;

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // On phones it sits over content, so it only shows while scrolling back
    // up — the moment someone wants it. Larger screens keep it in place.
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      const phone = window.innerWidth < 768;
      setShow(y > 500 && (!phone || y < lastY - 2));
      if (Math.abs(y - lastY) > 2) lastY = y;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 md:bottom-8 md:right-8 md:h-14 md:w-14 md:rounded-none bg-neutral-900/80 backdrop-blur-md text-white shadow-2xl transition-colors hover:border-emerald-500 hover:text-emerald-500"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/** Live time in Bhubaneswar — empty on the server so SSR and hydration agree. */
function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || "—"}</span>;
}

/**
 * A round "Start a project" badge: the label circles the arrow, and the whole
 * thing leans toward the cursor.
 */
function SpinBadge() {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };

  return (
    <motion.a
      ref={ref}
      href={STUDIO.contact}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      aria-label="Start a project with Rathaworks"
      className="group relative grid h-36 w-36 shrink-0 place-items-center rounded-full md:h-44 md:w-44"
    >
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite]"
      >
        <defs>
          <path id="footer-ring" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        </defs>
        <text className="fill-neutral-300 font-mono text-[15px] uppercase">
          <textPath href="#footer-ring" textLength="500" lengthAdjust="spacing">
            Start a project ✦ Start a project ✦
          </textPath>
        </text>
      </svg>
      <span className="relative grid h-16 w-16 place-items-center rounded-full bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all duration-500 group-hover:scale-110 group-hover:bg-emerald-400 group-hover:shadow-[0_0_60px_rgba(52,211,153,0.45)] md:h-20 md:w-20">
        <svg
          aria-hidden="true"
          className="h-6 w-6 transition-transform duration-500 group-hover:rotate-45"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17 17 7M9 7h8v8" />
        </svg>
      </span>
    </motion.a>
  );
}

/**
 * The closing signature: the name as an outline that fills with colour, left
 * to right, as you scroll the last stretch of the page.
 */
function NameFill() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const clip = useTransform(scrollYProgress, [0.15, 0.95], ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]);

  const lines = ["RASMIRANJAN", "SAHOO"];
  return (
    // Bottom padding: at leading-[0.82] the glyphs hang below the line box,
    // and overflow-hidden was clipping the foot of "SAHOO".
    <div ref={ref} aria-hidden="true" className="relative select-none overflow-hidden px-4 pt-10 pb-[3vw] md:pt-16">
      <div className="relative mx-auto w-fit text-center text-[12.5vw] font-black leading-[0.82] tracking-tighter">
        {lines.map((l) => (
          <span key={l} className="footer-outline block whitespace-nowrap">
            {l}
          </span>
        ))}
        <motion.div style={{ clipPath: reduce ? "none" : clip }} className="absolute inset-0">
          {lines.map((l) => (
            <span
              key={l}
              className="block whitespace-nowrap bg-gradient-to-r from-emerald-300 via-white to-emerald-400 bg-clip-text text-transparent"
            >
              {l}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external = false,
  rel,
  onClick,
  onPointerEnter,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
  onPointerEnter?: () => void;
}) {
  const inner = (
    <>
      <span className="relative">
        {children}
        {/* Underline that draws in from the left and leaves to the right. */}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-emerald-400 transition-transform duration-500 ease-out group-hover/link:origin-left group-hover/link:scale-x-100" />
      </span>
      {external && (
        <span
          aria-hidden="true"
          className="text-neutral-500 transition-all duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-400"
        >
          ↗
        </span>
      )}
    </>
  );
  const className =
    "group/link inline-flex items-center gap-1.5 py-1.5 text-[15px] text-neutral-300 transition-colors hover:text-white";

  return href.startsWith("/") ? (
    <Link href={href} className={className} onClick={onClick} onPointerEnter={onPointerEnter}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={className} {...(external ? { target: "_blank", rel } : {})}>
      {inner}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">
      <GrainOverlay />
      <BackToTop />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 h-[520px] w-[1000px] -translate-x-1/2 rounded-full bg-emerald-500/[0.08] blur-[120px]"
      />

      {/* What I build, drifting past. */}
      <div className="relative z-10 border-b border-white/10 py-7 md:py-10">
        <Marquee seconds={36} itemClassName="gap-8 pr-8 md:gap-12 md:pr-12">
          {SERVICES.map((s, i) => (
            <span key={s} className="flex items-center gap-8 md:gap-12">
              <span
                className={`whitespace-nowrap text-4xl font-bold tracking-tighter md:text-6xl ${
                  i % 2 ? "footer-outline" : "text-white"
                }`}
              >
                {s}
              </span>
              <span aria-hidden="true" className="text-2xl text-emerald-400 md:text-4xl">
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 md:pt-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12 md:gap-10"
        >
          <motion.div variants={column} className="col-span-2 md:col-span-5">
            <p className="max-w-sm text-xl font-light leading-relaxed text-neutral-200 md:text-2xl">
              Full-stack developer and founder of{" "}
              <a
                href={STUDIO.url}
                className="text-white underline decoration-emerald-500/40 underline-offset-4 hover:decoration-emerald-500"
              >
                Rathaworks
              </a>
              . Marketplaces, booking and delivery platforms, mobile apps and business software.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-300">
                  Available for projects
                </span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-neutral-300">
                Bhubaneswar · <LocalTime />
              </span>
            </div>
          </motion.div>

          <motion.div variants={column} className="md:col-span-3">
            <h2 className="mb-5 font-mono text-xs uppercase tracking-widest text-neutral-500">/ Navigation</h2>
            <ul>
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href={STUDIO.url} external rel="noopener noreferrer">
                  Rathaworks
                </FooterLink>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={column} className="md:col-span-2">
            <h2 className="mb-5 font-mono text-xs uppercase tracking-widest text-neutral-500">/ Elsewhere</h2>
            <ul>
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <FooterLink
                    href={link.href}
                    external={link.external}
                    rel={link.me ? "me noopener noreferrer" : "noopener noreferrer"}
                    {...(link.href === RESUME.page
                      ? { onClick: (e: React.MouseEvent) => openResume(e), onPointerEnter: preloadResume }
                      : {})}
                  >
                    {link.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={column} className="col-span-2 flex justify-center md:col-span-2 md:justify-end">
            <SpinBadge />
          </motion.div>
        </motion.div>
      </div>

      <NameFill />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-8 font-mono text-[11px] uppercase tracking-widest text-neutral-500 md:flex-row">
        <p>© {year} Rasmiranjan Sahoo. All rights reserved.</p>
        <p>
          Designed &amp; built in <span className="text-neutral-200">Bhubaneswar, India</span>
        </p>
      </div>

      <style jsx global>{`
        .footer-outline {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25);
          color: transparent;
        }
        @media (min-width: 768px) {
          .footer-outline {
            -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.25);
          }
        }
      `}</style>
    </footer>
  );
}
