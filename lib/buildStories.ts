/**
 * "How I built it" pages for design-led projects (see components/work/BuildStory.tsx).
 *
 * Kept as data so another build story is one entry, not a new page design.
 * Every number here is measured or counted — the same rule as lib/projects.ts.
 */

export interface StoryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface StoryChapter {
  eyebrow: string;
  title: string;
  body: string[];
  image?: StoryImage;
  /** Short, scannable items shown beside or under the text. */
  points?: { title: string; body: string; image?: StoryImage }[];
  /** Before/after or headline figures. */
  figures?: { label: string; value: string }[];
  note?: string;
}

export interface BuildStory {
  slug: string;
  intro: string;
  chapters: StoryChapter[];
  /** Plain statement of whose work this is, shown at the foot of the page. */
  credit: string;
}

const W = "/Projects/wayline";

export const buildStories: BuildStory[] = [
  {
    slug: "wayline-landing",
    intro:
      "A brand and website I designed and built on my own, for an intercity bus-booking app called Wayline. The aim: a page that explains the product by showing it working — a seat being held, a fare being priced, a refund being worked out — instead of describing it in rows of cards.",
    chapters: [
      {
        eyebrow: "01 / The brand",
        title: "A logo that is also a road.",
        body: [
          "The name and the mark came first. The mark is a road folded into a W, with a dashed lane line down the middle, ending at a marigold destination pin. The palette is cobalt and cream by day; at night the page turns graphite and cobalt becomes an accent.",
          "The hero illustration is a Lottie scene generated from one description by a script, with a day version and a night version, so the two can never drift apart.",
        ],
        image: {
          src: `${W}/hero-light.webp`,
          alt: "Wayline hero in the day theme: 'Every seat, accounted for.' beside an illustrated coach driving through a sunny city",
          width: 1280,
          height: 800,
          caption: "The day theme. Switching theme plays a circular reveal from the toggle.",
        },
      },
      {
        eyebrow: "02 / First two seconds",
        title: "The loader drives the logo.",
        body: [
          "Because the mark is a road, the loader drives it: the W builds stroke by stroke, a bus drives the whole W lighting the road amber behind it, the destination pin drops onto the bus, and the camera flies through the W into the page.",
          "A loader has to stay smooth while the app's JavaScript is still loading, so every moving part is its own layer animated only by transform or opacity. The bus's route is sampled from the W's geometry into eased keyframes, and the amber trail is four straight stretches that grow in step with it.",
        ],
        image: {
          src: `${W}/loader.webp`,
          alt: "The Wayline loader mid-drive: a bus on the W-shaped road, the travelled stretch lit amber",
          width: 1280,
          height: 796,
        },
      },
      {
        eyebrow: "03 / Show, don't list",
        title: "Every promise is something you can try.",
        body: [
          "Each section turns one claim into a small working piece of the product.",
        ],
        points: [
          {
            title: "A departure board",
            body: "Real routes on a split-flap board whose characters flip through the drum like a station's.",
            image: {
              src: `${W}/board.webp`,
              alt: "A split-flap departure board listing four overnight buses with seats and status",
              width: 1280,
              height: 640,
            },
          },
          {
            title: "One passenger's trip",
            body: "Six chapters of an overnight journey, Bhubaneswar to Kolkata. On desktop the stage stays pinned while the phone screen changes and the sky turns from dusk to night to dawn; on phones it becomes a deck you swipe.",
            image: {
              src: `${W}/journey.webp`,
              alt: "The journey story on desktop: chapter three, 'Every rupee, before he pays', beside a phone showing the payment screen",
              width: 1280,
              height: 800,
            },
          },
          {
            title: "A seat can only be sold once",
            body: "Two people reach for the same seat. Driven by the scroll: the first holds it, the second sees it taken.",
            image: {
              src: `${W}/seatlock.webp`,
              alt: "A bus seat map where one pointer has held seat B6 and a second pointer is told it was just taken",
              width: 1280,
              height: 800,
            },
          },
          {
            title: "A receipt you can re-price",
            body: "Drag the fare and the receipt reprints with rolling numbers: four lines, and no fifth.",
            image: {
              src: `${W}/receipt.webp`,
              alt: "A fare slider beside a printed receipt itemising base fare, convenience fee, GST and TCS",
              width: 1280,
              height: 800,
            },
          },
          {
            title: "A refund you can work out",
            body: "Drag a pin along a 48-hour track to the moment you would cancel and see the exact refund under one policy.",
            image: {
              src: `${W}/refund.webp`,
              alt: "A refund countdown track with the pin at 24 hours and a refund of ₹937 shown below",
              width: 1280,
              height: 800,
            },
          },
        ],
      },
      {
        eyebrow: "04 / Making it fluid",
        title: "From stuttering to smooth.",
        body: [
          "The first complete version stuttered while scrolling. Profiling showed why: the browser was re-arranging 444 compositing layers every frame. Ninety-three looping animations ran even in sections far off screen, every split-flap character stayed in 3D after flipping, and blur filters of 110–130 pixels were re-applied on every frame.",
          "The fixes: pause animations in sections that are off screen, swap blur filters for gradients that paint once, make the flap animation paint-only and give the board its own layer, move the hero Lottie to the canvas renderer, and hold ambient effects while the page is being scrolled.",
        ],
        figures: [
          { label: "Compositing layers", value: "444 → ~104" },
          { label: "Dropped frames mid-page, 4× slower CPU", value: "56% → 25%" },
          { label: "Dropped frames at normal speed", value: "up to 5% → 0%" },
        ],
        note: "Measured in Chrome on an Intel Iris Xe laptop, scrolling the same stretch of page at a fixed speed, before and after.",
      },
      {
        eyebrow: "05 / For every visitor",
        title: "Phones and reduced motion get their own design.",
        body: [
          "Phones get layouts of their own rather than squeezed desktop ones: the journey becomes a swipeable deck, the store links become compact badges, and a 'Get the app' dock appears once the hero has scrolled away.",
          "Every effect respects reduced motion — the loader, the scroll-driven scenes and the hero all have a still, finished state.",
        ],
      },
    ],
    credit:
      "A personal project: brand, design and front-end by me. Wayline is a concept — the site is a design and front-end showcase, and the app it advertises is not a real product.",
  },
];

export const getBuildStory = (slug: string) => buildStories.find((s) => s.slug === slug);
