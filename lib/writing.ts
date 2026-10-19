/**
 * Technical writing, published on the studio site (work.rasmiranjan.in/insights).
 * Listed here so the portfolio shows depth — each links to the one canonical
 * article rather than duplicating it. Keep in step with the studio's
 * lib/insights.ts when a new article ships.
 */

export interface Article {
  title: string;
  excerpt: string;
  url: string;
  date: string;
  category: "Engineering" | "Guides";
  /** The project the article draws on. */
  project?: string;
}

const INSIGHTS = "https://work.rasmiranjan.in/insights";

export const articles: Article[] = [
  {
    title: "How to stop a booking app from selling the same seat twice",
    excerpt:
      "In travel, a double-booked seat isn't a refund — it's a passenger at a terminal at midnight holding a ticket that means nothing. The seat-hold pattern behind a bus booking platform.",
    url: `${INSIGHTS}/prevent-double-booking-redis-seat-locks`,
    date: "2026-10-18",
    category: "Engineering",
    project: "Bookiee",
  },
  {
    title: "Integrating M-Pesa STK Push into a marketplace: what actually matters",
    excerpt:
      "Most Kenyan buyers pay with M-Pesa, not cards. What mattered when Safaricom's Daraja STK Push went live across a multi-vendor marketplace's web and mobile apps.",
    url: `${INSIGHTS}/mpesa-stk-push-integration-guide`,
    date: "2026-10-18",
    category: "Engineering",
    project: "Vedrastores",
  },
  {
    title: "Why a social app's feed should never touch its payments database",
    excerpt:
      "A creator app has social-media read traffic and a payments system's correctness requirements. Separating the two without reaching for microservices.",
    url: `${INSIGHTS}/social-app-architecture-ledger-read-models`,
    date: "2026-10-18",
    category: "Engineering",
    project: "QuickBite",
  },
  {
    title: "Scheduling dozens of live classes on a limited pool of Zoom licences",
    excerpt:
      "Each Zoom licence hosts one meeting at a time. Taking the human out of live-class scheduling for a coaching institute — and catching clashes before students did.",
    url: `${INSIGHTS}/schedule-live-classes-zoom-licence-pool`,
    date: "2026-10-18",
    category: "Engineering",
    project: "Bidyasagar Classes",
  },
  {
    title: "Building a restaurant's own delivery app: five lessons from replacing the aggregator",
    excerpt:
      "A single kitchen can't absorb the mistakes a marketplace shrugs off. Five lessons from a five-app delivery system that let one restaurant stop paying aggregator commissions.",
    url: `${INSIGHTS}/build-your-own-restaurant-delivery-app`,
    date: "2026-10-18",
    category: "Guides",
    project: "Restaurant delivery",
  },
  {
    title: "Off-the-shelf or custom software? A practical checklist for small businesses",
    excerpt:
      "Custom software isn't always the answer — sometimes a SaaS subscription is the smarter buy. The checklist to walk through before recommending either.",
    url: `${INSIGHTS}/custom-software-vs-off-the-shelf`,
    date: "2026-10-18",
    category: "Guides",
  },
];

export const INSIGHTS_URL = INSIGHTS;
