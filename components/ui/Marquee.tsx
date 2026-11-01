import React from "react";

/**
 * An endless horizontal band. The content is rendered twice and the track
 * slides by exactly half its width (`.animate-marquee` in globals.css), so the
 * loop has no seam. Hovering pauses it; the edges fade out.
 *
 * Pure CSS: no JavaScript runs per frame, and the global reduced-motion rule
 * stops it for people who ask for less motion.
 */
export default function Marquee({
  children,
  seconds = 40,
  reverse = false,
  className = "",
  itemClassName = "",
}: {
  children: React.ReactNode;
  seconds?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${className}`}
    >
      <div
        className={`animate-marquee ${reverse ? "[animation-direction:reverse]" : ""}`}
        style={{ "--duration": `${seconds}s` } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className={`flex shrink-0 items-center ${itemClassName}`}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
