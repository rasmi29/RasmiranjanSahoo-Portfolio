"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Which card of a horizontal scroll-snap row is currently in view.
 *
 * On phones the Works, Stack and Writing sections become rows you swipe
 * through. A peeking card hints that there is more; the dots say how much
 * more, and where you are.
 */
export function useSnapIndex(ref: RefObject<HTMLElement | null>, count: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const measure = () => {
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      const step = first.offsetWidth + gap;
      const max = el.scrollWidth - el.clientWidth;
      // The last cards can't snap to the start edge, so the end of the row
      // counts as the last card.
      const i = el.scrollLeft >= max - 4 ? count - 1 : Math.round(el.scrollLeft / step);
      setIndex(Math.max(0, Math.min(count - 1, i)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref, count]);

  return index;
}

/** Position dots under a swipe row. Phones only; purely visual. */
export default function SwipeDots({ count, active }: { count: number; active: number }) {
  if (count < 2) return null;
  return (
    <div aria-hidden="true" className="mt-6 flex justify-center gap-1.5 md:hidden">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
            i === active ? "w-6 bg-emerald-400" : "w-1.5 bg-white/20"
          }`}
        />
      ))}
    </div>
  );
}
