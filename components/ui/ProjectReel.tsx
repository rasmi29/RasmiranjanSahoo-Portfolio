"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { projectHref, projects } from "@/lib/projects";

/**
 * The work, on the first screen: every project's cover on a ribbon that
 * drifts slowly beneath the hero, tilted in perspective. Hovering pauses it
 * and lifts the cover under the pointer; each cover opens its project. The
 * ribbon also leans with the speed of the page's scroll, a small physical
 * touch that makes it feel like a strip of film being pulled.
 *
 * The drift is a CSS transform loop (two copies of the list, moved by -50%),
 * so it runs on the compositor. With reduced motion the ribbon stands still,
 * flat, and can be scrolled sideways by hand.
 */
export default function ProjectReel() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skew = useSpring(useTransform(velocity, [-2500, 0, 2500], [5, 0, -5]), {
    stiffness: 260,
    damping: 40,
  });

  return (
    <div className="reel relative w-full" aria-label="Selected projects">
      <motion.div style={reduce ? undefined : { skewX: skew }} className="reel-tilt">
        {/* Spacing sits on each item, not as a gap, so one copy is exactly half
            the track and the -50% loop has no seam. */}
        <ul className="reel-track flex w-max pb-8 pt-3">
          {[0, 1].map((copy) =>
            projects.map((p) => {
              const href = projectHref(p);
              const external = href.startsWith("http");
              return (
                <li key={`${copy}-${p.slug}`} aria-hidden={copy === 1 ? true : undefined} className="shrink-0 pr-4 md:pr-5">
                  <Link
                    href={href}
                    tabIndex={copy === 1 ? -1 : undefined}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="reel-card group relative block h-[128px] w-[205px] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 lg:h-[136px] lg:w-[218px]"
                  >
                    <Image
                      src={p.cover.src}
                      alt=""
                      fill
                      sizes="220px"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
                    />
                    <span className="absolute inset-x-3 bottom-2.5 text-left">
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-emerald-400">
                        {p.type}
                      </span>
                      <span className="block truncate text-[13px] font-semibold text-white">{p.title}</span>
                    </span>
                  </Link>
                </li>
              );
            }),
          )}
        </ul>
      </motion.div>

      <style jsx global>{`
        .reel {
          -webkit-mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
          perspective: 1400px;
        }
        .reel-tilt {
          transform-origin: 50% 50%;
        }
        .reel-track {
          transform: rotateX(12deg) rotateZ(-1.5deg);
          animation: reel 70s linear infinite;
        }
        /* Pause on hover (pointer devices only, so a tap on a phone opens). */
        @media (hover: hover) {
          .reel:hover .reel-track {
            animation-play-state: paused;
          }
        }
        .reel-card {
          transition:
            transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.3s,
            box-shadow 0.5s;
        }
        .reel-card:hover,
        .reel-card:focus-visible {
          transform: translateY(-10px) scale(1.04);
          border-color: rgba(52, 211, 153, 0.45);
          box-shadow: 0 24px 50px -20px rgba(16, 185, 129, 0.45);
        }
        @keyframes reel {
          from {
            transform: rotateX(12deg) rotateZ(-1.5deg) translateX(0);
          }
          to {
            transform: rotateX(12deg) rotateZ(-1.5deg) translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .reel {
            overflow-x: auto;
          }
          .reel-track {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
