/**
 * One motion vocabulary for the whole site.
 *
 * Before this existed, durations ranged over 0.3/0.35/0.5/0.7/0.8/1/1.2/3s
 * with five different easings, which is what made the animation read as
 * "assembled" rather than "designed". Import from here instead of writing
 * initial/whileInView/transition inline.
 */

export const EASE = {
  /** Default. Fast start, long settle — the "expensive" feel. */
  out: [0.16, 1, 0.3, 1],
  /** For things that leave and return, e.g. the header. */
  inOut: [0.76, 0, 0.24, 1],
} as const;

export const DUR = {
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
  hero: 1.1,
} as const;

/** Standard section/element entrance. */
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: DUR.slow, ease: EASE.out },
} as const;

/** For eyebrow labels ("02 / PORTFOLIO"). */
export const fadeIn = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: DUR.base, ease: EASE.out },
} as const;

/** Parent wrapper for staggered children. */
export const stagger = (delay = 0.06) =>
  ({
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-10%" },
    variants: {
      hidden: {},
      visible: { transition: { staggerChildren: delay } },
    },
  }) as const;

export const staggerChild = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE.out } },
} as const;
