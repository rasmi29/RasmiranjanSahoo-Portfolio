import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Everything is open. The named agents below are redundant against the
 * wildcard rule today — they exist so that if a `Disallow` is ever added to
 * the wildcard, the crawlers that matter most here (image indexing, and the
 * answer engines that increasingly field "who is …" queries) keep their
 * explicit permission rather than silently losing access.
 */
const ALLOW_ALL = [
  "*",
  // Image indexing — the path by which a photo reaches Google Images.
  "Googlebot-Image",
  "Bingbot",
  // Answer engines.
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: ALLOW_ALL.map((userAgent) => ({ userAgent, allow: "/" })),
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
