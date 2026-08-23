# SEO Playbook — winning "Rasmiranjan Sahoo"

**Goal:** when someone searches *Rasmiranjan* or *Rasmiranjan Sahoo*, this site
and this face come back.

This document is the half of that goal the codebase cannot do on its own.
Everything in Part 1 is already shipped. Part 2 is yours, and it matters more.

---

## The honest situation

Before writing a line of code I searched the name. The result changes the
strategy, so it belongs at the top:

| What I searched | What came back |
| --- | --- |
| `"Rasmiranjan Sahoo"` | A senior manager at **HPCL R&D** (chemical engineer, NIT Rourkela), engineers at **Prodapt**, **Andolasoft**, **Tech Mahindra**, plus ZoomInfo and RocketReach scrape pages |
| `"Rasmiranjan Sahoo" + developer/portfolio` | Still the above. **rasmiranjan.in did not appear.** |
| LinkedIn people search | **90+ profiles** named Rasmiranjan Sahoo |
| `rasmiranjan.com` | Belongs to **Rasmiranjan Mohanty** — a different person, already ranking on the bare first name |

So this is not a normal "optimise my page" job. It is an **entity
disambiguation** job. Google is not confused about how to rank your page; it
does not yet know that a distinct person called Rasmiranjan Sahoo who is a
software developer exists at all.

Two consequences worth being clear-eyed about:

- **Realistic order of wins.** `rasmiranjan sahoo developer` /
  `rasmiranjan sahoo portfolio` first (weeks). Then `rasmiranjan sahoo`
  (months, and you may share the page with the HPCL manager for a long time).
  The bare `rasmiranjan` is the hardest — it is a common Odia first name and
  another person's domain already owns it.
- **A photo cannot rank before its page does.** Images inherit authority from
  the page that hosts them. The headshot work below is necessary but it is not
  sufficient on its own — Part 2 step 1 and step 2 are what unlock it.

---

## Part 1 — what is now in the code

### Entity layer

- **`lib/seo.ts` (new)** — one set of schema builders, so the homepage,
  `/about` and every case study point at the *same* `@id` nodes instead of each
  describing a near-duplicate person. That cross-referencing is what makes a
  crawler resolve them to one entity.
- **`ProfilePage`** on `/` and `/about` — Google's dedicated type for "this
  document is about this person".
- **`Person`** enriched with `alternateName` (Rasmi Ranjan / Rashmiranjan /
  Rashmi Ranjan — real spellings of your name, and the ones people type),
  `disambiguatingDescription` (says outright which Rasmiranjan Sahoo this is),
  `worksFor`, `hasCredential`, `hasOccupation`, `knowsLanguage`, `nationality`,
  `homeLocation`.
- **`FAQPage`** on `/about` only — because Google requires the answers to be
  visibly rendered, and `/about` is the only page that renders them.
- **`rel="me"`** links in `<head>` and in the footer, pointing at GitHub,
  LinkedIn and X.

### Image layer — the "my photo appears" half

- Headshot renamed `rasmi.webp` → **`rasmiranjan-sahoo.webp`**, and cut into the
  three shapes Google asks for on a person entity:
  - `rasmiranjan-sahoo-square.jpg` — 1200×1200, face-centred (knowledge-panel shape)
  - `rasmiranjan-sahoo-portrait.webp` — 900×1200 (what the About section renders)
  - `rasmiranjan-sahoo.webp` — 1400×1050 original
- **`ImageObject`** schema with dimensions, caption, credit and licence — not a
  bare URL string. This is what makes the photo indexable as an *asset* rather
  than page decoration.
- **`<figure>` + `<figcaption>`** around the photo on both `/` and `/about`.
  Visible text next to an image is a stronger signal than `alt` alone.
- **Image sitemap entries** (`<image:image>`) on every URL in `sitemap.xml`.
- **`og.jpg` regenerated with your face on it.** It was type-only before — so
  every WhatsApp, LinkedIn and Slack share of your link showed a card with no
  person in it. Now it shows you.

### Content and crawl

- **`/about` (new)** — a real, static, 4,500-word-of-crawlable-text entity hub.
  Lead paragraph, an "at a glance" fact table, an explicit disambiguation line,
  what you build, career, certifications, and six FAQs written to be quoted by
  an AI Overview.
- **`robots.ts`** — explicit `Allow` for `Googlebot-Image` and the answer
  engines (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended).
- **`llms.txt`** — rewritten with an explicit disambiguation block naming the
  people you are *not*, plus the FAQ answers.
- **`sitemap.ts`** — `/about` added at priority 0.9.
- **Search Console / Bing verification** wired to build-time env vars, and the
  deploy workflow now passes them (plus `WEB3FORMS_KEY`, which was never being
  passed — see step 6).

### One thing I changed that you should know about

The 2.5s boot-sequence loader was in the **root layout**, so it ran on every
route. In the App Router the root layout mounts fresh on every *direct* hit —
meaning a visitor arriving from Google onto `/about` got 2.5 seconds of black
screen before a single word. That defeats the purpose of the page.

It now lives in `app/page.tsx`, so the homepage keeps the brand moment and
content pages render instantly. If you want it everywhere, move it back — but
the trade is real, and it costs you LCP on exactly the pages search traffic
lands on.

---

## Part 2 — what only you can do

Ranked by impact on the actual goal. **Steps 1–3 are worth more than everything
in Part 1 combined.** Structured data makes you *eligible*; corroboration makes
you *ranked*.

### 1. Google Search Console — do this today

Nothing else works until Google knows the site exists.

1. Go to [search.google.com/search-console](https://search.google.com/search-console),
   add `rasmiranjan.in` as a **Domain** property.
2. Verify via the DNS TXT record your registrar provides. *(Alternatively, take
   the HTML-tag token and add it as a repo secret named
   `GOOGLE_SITE_VERIFICATION` — the build already reads it.)*
3. **Submit `https://rasmiranjan.in/sitemap.xml`.**
4. **URL Inspection → Request Indexing** for `/`, `/about`, `/works`, and
   `/works/vedrastores`, individually.
5. Repeat at [Bing Webmaster Tools](https://www.bing.com/webmasters) — secret
   name `BING_SITE_VERIFICATION`. Bing's index is what ChatGPT search reads, so
   this is how you show up there.

Then check back in Search Console weekly. "Pages → Not indexed" tells you
exactly what is wrong; guessing does not.

### 2. Make every profile link back — the knowledge-panel lever

`sameAs` in the schema is a *claim*. It becomes *evidence* only when the
profile links back. This is the single highest-value hour of work available to
you, and it is genuinely about ten minutes per profile.

- **GitHub** ([github.com/rasmi29](https://github.com/rasmi29)) — set the
  **Website** field to `https://rasmiranjan.in`. Put "Freelance full-stack &
  React Native developer" in the bio and `Bhubaneswar, India` in location.
  Create a profile README (`rasmi29/rasmi29` repo) with your full name, the
  Vedrastores work, and a link home. GitHub profiles rank well for names.
- **LinkedIn** — add `rasmiranjan.in` to **Contact info → Website**, and put it
  in your About section as plain text too. Set your headline to
  "Freelance Full-Stack & React Native Developer". Your LinkedIn will almost
  certainly outrank your site for your name at first; make sure it points home.
- **X** ([@RasmiRanjan29](https://x.com/RasmiRanjan29)) — currently 0 posts, 0
  followers, no bio, no link. Add the URL field, a bio, and the headshot. Even
  a dormant profile is a corroborating edge once it links back.

### 3. Use the same photo everywhere

Genuinely underrated. Use `public/rasmiranjan-sahoo-square.jpg` — the identical
file — as your avatar on GitHub, LinkedIn, X, and every profile in step 4.

A face that appears on five corroborating profiles that all link to one domain
is how an image gets bound to a person entity. Five different photos is five
weaker signals.

### 4. Create profiles that rank for names

These sites have high domain authority and rank fast for personal names.
Roughly an evening's work, and each one is another `sameAs` you can add to
`PROFILES` in `lib/site.ts`:

- **Peerlist** — ranks very well for Indian developer names
- **Dev.to** — cross-post case-study content
- **Stack Overflow** — fill in the About Me with your site link
- **Medium** or **Hashnode**
- **Google Developer Profile**, **Product Hunt**, **Polywork**

Add each to the `PROFILES` array once live — the footer, `rel="me"` links and
`sameAs` all read from that one array.

### 5. Give Google something to cite

You currently have one case study. That is one page competing against ZoomInfo
and LinkedIn. Every additional page is another entry point and another chance
to be quoted by an AI Overview:

- **Write up the M-Pesa integration.** "Integrating M-Pesa (Safaricom Daraja
  API) into a Next.js marketplace" has almost no competition and high intent —
  and you have actually done it. This is your best single piece of content.
- Add the remaining projects to `lib/projects.ts`; the sitemap, `/works` index
  and per-project metadata all generate themselves from it.
- Answer M-Pesa / React Native questions on Stack Overflow and Reddit with
  substance. Links from real answers are worth more than any directory.

### 6. Two config values that are currently unset

The deploy workflow now passes these, but the secrets do not exist yet
(Settings → Secrets and variables → Actions):

- `WEB3FORMS_KEY` — **without it the contact form shows "the form isn't
  connected yet" on every submit.** SEO that works, landing on a form that does
  not, is worse than no SEO. Free key at [web3forms.com](https://web3forms.com).
- `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` — only needed if you
  verify by HTML tag rather than DNS.

Also in `lib/site.ts`: `RESUME_URL` still points at Google Drive. Dropping the
PDF at `public/resume.pdf` and switching the constant makes the download
attribute work and stops the link rotting.

### 7. Wikidata — later, honestly

A Wikidata item is how many knowledge panels get seeded. But Wikidata has
notability requirements, and a freelance developer with one shipped project
will likely be deleted as non-notable. Revisit once there is independent
coverage of your work — a conference talk, a published article, press. Do not
waste an afternoon on it now.

---

## What to expect, and how to check

| Timeframe | Realistic |
| --- | --- |
| Days 1–7 | Indexed at all. Check `site:rasmiranjan.in` in Google. |
| Weeks 2–6 | Ranking for `rasmiranjan sahoo developer`, `rasmiranjan sahoo portfolio`, `rasmiranjan sahoo react native` |
| Months 2–4 | Competing on page 1 for the bare `rasmiranjan sahoo`; headshot appearing in Google Images for name+developer queries |
| Months 4+ | Knowledge-panel eligibility — needs steps 2, 3 and 4 sustained, plus some external coverage |

Useful checks:

- `site:rasmiranjan.in` — what is indexed
- [Rich Results Test](https://search.google.com/test/rich-results) — paste
  `https://rasmiranjan.in/about`; expect Person, ProfilePage, FAQ, Breadcrumbs
- [Schema validator](https://validator.schema.org/) — full graph, no errors
- [OpenGraph preview](https://www.opengraph.xyz/) — confirm the share card now
  shows your face
- Ask ChatGPT and Perplexity "Who is Rasmiranjan Sahoo, the developer?" monthly
  — that is increasingly where the answer is formed

---

## Where things live

| Concern | File |
| --- | --- |
| Name, profiles, portrait paths, verification tokens | `lib/site.ts` |
| All JSON-LD builders | `lib/seo.ts` |
| Identity graph, emitted site-wide | `app/layout.tsx` |
| Entity hub page + FAQ | `app/about/page.tsx` |
| URLs + image sitemap | `app/sitemap.ts` |
| Crawler permissions | `app/robots.ts` |
| Answer-engine summary | `public/llms.txt` |

Adding a profile? Append to `PROFILES` in `lib/site.ts` — the footer links,
`rel="me"` tags and `sameAs` array all derive from it.
