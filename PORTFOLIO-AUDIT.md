# Portfolio Audit & Growth Plan — rasmiranjan.in

> ## ✅ STATUS: Parts 1–4 implemented (1 Aug 2026)
>
> Every code-level finding below (items 1–32), plus the accessibility,
> animation and performance sections, has been fixed and verified against a
> real build. Canonical domain is now **rasmiranjan.in** everywhere.
>
> | Check | Before | After |
> |---|---|---|
> | ESLint | 12 errors, 18 warnings | **0 / 0** |
> | `<h1>` on homepage | 4 | **1** |
> | Canonical tag | absent | **present** |
> | `og:image` | `http://localhost:3000/…` | **`https://rasmiranjan.in/og.jpg`** |
> | `id="skills"` | missing (dead nav link) | **present** |
> | Indexable URLs | 2 (duplicate titles) | **3, all unique titles** |
> | Third-party requests | 47 | **0** |
> | `public/` weight | 60.9 MB | **6.4 MB** |
> | Favicon | 1.1 MB | **4 KB** |
> | npm dependencies | 17 | **4** |
> | Contact form | none | **live (Web3Forms)** |
>
> **Still open — these need your input, not code:** the 3 new projects
> (Part 6), service pages and blog posts (Part 5 Phase 3), testimonials,
> `public/resume.pdf`, and the Search Console / analytics accounts.
> The loader was kept at 2.5s per your decision; note it still caps LCP.

**Audited:** 1 August 2026
**Stack:** Next.js 16.1.1 (App Router, Turbopack) · React 19.2 · Tailwind v4 · Framer Motion 12 · `output: 'export'` → GitHub Pages
**Method:** full source read of every file, `npm run build` executed, `npx eslint .` executed, generated `out/` HTML inspected tag-by-tag.

Everything marked **CONFIRMED** below was verified against the real build output, not inferred from reading code.

---

## 0. Scorecard

| Area | Grade | One-line verdict |
|---|---|---|
| Visual design | **A−** | Genuinely premium. Best thing about the site. |
| Animation craft | **B** | Beautiful individually, uncoordinated as a system, no reduced-motion support. |
| Technical SEO | **D** | Broken social previews, 3 conflicting domains, no canonical, 4× `<h1>`. |
| Content / SEO surface | **F** | One page, ~1 project, zero service pages, zero blog. Nothing to rank. |
| Performance | **D+** | 2.5s forced loader, 2MB LCP image, 1.1MB favicon, 47 external requests. |
| Accessibility | **D** | `cursor: none !important` globally, no reduced-motion, contrast failures. |
| Conversion (lead capture) | **F** | No contact form. A `mailto:` is the entire funnel. |
| Code health | **C** | 12 ESLint errors, 6 dead components, undeclared dependency. |

**The single biggest problem is not a bug — it's that the site is one page.** You cannot win search with one URL. Sections 6–8 are where the real money is.

---

# PART 1 — WHAT IS INCORRECT

## 🔴 P0 — Critical (fix this week)

### 1. Social link previews are broken on every platform — **CONFIRMED**

`metadataBase` is missing from [app/layout.tsx](app/layout.tsx#L8-L49), so Next.js resolved your relative OG image against localhost. From the real build:

```
⚠ metadataBase property in metadata export is not set ... using "http://localhost:3000"
```

And in the shipped HTML:

```html
<meta property="og:image" content="http://localhost:3000/rasmi.png"/>
<meta name="twitter:image" content="http://localhost:3000/rasmi.png"/>
```

Every time your link is shared on WhatsApp, LinkedIn, Twitter/X, Slack, Discord, or Telegram, **the preview image fails to load.** For a freelancer whose leads arrive through DMs and LinkedIn, this is the most expensive single line of missing code in the repo.

**Fix** — in [app/layout.tsx](app/layout.tsx#L8):
```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://rasmiranjan.in"),
  alternates: { canonical: "/" },
  // ...rest
};
```

### 2. Three different domains are hardcoded across the project — **CONFIRMED**

| File | Domain claimed |
|---|---|
| [CNAME](CNAME) | `rasmiranjan.in` |
| [app/sitemap.ts:8](app/sitemap.ts#L8) | `rasmiranjan.in` |
| [app/robots.ts:12](app/robots.ts#L12) | `rasmiranjan.me` |
| [app/layout.tsx:31](app/layout.tsx#L31) (`og:url`) | `rasmiranjan.me` |
| [app/layout.tsx:51](app/layout.tsx#L51) (JSON-LD `url`) | `rasmiranjan.me` |
| [components/sections/AboutSection.tsx:134](components/sections/AboutSection.tsx#L134) | `rasmiranjan.in` |
| [components/sections/HeroSection.tsx:111](components/sections/HeroSection.tsx#L111) | **`nirupampal.vercel.app`** ← someone else's site |

`robots.txt` currently tells Google *"my sitemap lives at rasmiranjan.me/sitemap.xml"* while the sitemap actually deploys to `rasmiranjan.in/sitemap.xml`. If `.me` doesn't resolve, **Google never finds your sitemap.** If it does resolve, you've split your ranking signal across two domains and created duplicate content.

**Fix:** pick ONE canonical domain (I recommend `rasmiranjan.in` — it matches your CNAME and your India-based positioning), 301-redirect the other at the registrar, and centralise it:

```ts
// lib/site.ts
export const SITE_URL = "https://rasmiranjan.in";
export const SITE_NAME = "Rasmiranjan Sahoo";
```
Then import `SITE_URL` in `layout.tsx`, `robots.ts`, `sitemap.ts`, and every JSON-LD block. Never type a domain literal again.

### 3. `nirupampal.vercel.app` — another developer's domain in your source

[HeroSection.tsx:111](components/sections/HeroSection.tsx#L111) defaults `siteUrl = "https://nirupampal.vercel.app"`. It feeds a `jsonLd` object at [lines 140–162](components/sections/HeroSection.tsx#L140-L162) that is **built and never rendered** (ESLint: `'jsonLd' is assigned a value but never used`). So it doesn't currently leak into your HTML — but it's a template leftover that will start emitting a competitor's URL as your `Person.url` the moment someone "fixes" the unused-variable warning. Delete both the prop and the dead object.

### 4. The "Skills" nav link does nothing — **CONFIRMED**

[Header.tsx:13](components/Header.tsx#L13) and [Footer.tsx:12](components/Footer.tsx#L12) both link to `#skills`. I grepped the built HTML:

```
$ grep -c 'id="skills"' out/index.html
0
```

Section IDs that actually exist: `#home`, `#works`, `#about`, `#contact`. [SkillsSection.tsx](components/sections/SkillsSection.tsx#L196) renders a `<div>` with no `id`. Because `scrollToSection` returns early when `getElementById` is null, **clicking "Skills" in the nav produces zero feedback** — desktop and mobile. Visitors read that as a broken site.

**Fix:** add `id="skills"` to the root element of `SkillsSection`.

### 5. Four `<h1>` tags on the homepage — **CONFIRMED**

```
$ grep -o '<h1' out/index.html | wc -l
4
```

1. [PageLoader.tsx:131](components/PageLoader.tsx#L131) — "RASMIRANJAN SAHOO"
2. [HeroSection.tsx:201](components/sections/HeroSection.tsx#L201) — "RASMIRANJAN SAHOO" ✅ *(the only correct one)*
3. [SkillsSection.tsx:215](components/sections/SkillsSection.tsx#L215) — "Tech Stack."
4. [Footer.tsx:145](components/Footer.tsx#L145) — decorative watermark "RASMIRANJAN SAHOO"

Google picks one and dilutes the rest; the decorative footer `<h1>` is actively harmful because it's semantically meaningless. Keep **one** `<h1>` per page. Loader → `<p>` or `<div>`, Skills → `<h2>`, Footer watermark → `<div aria-hidden="true">`.

Also: your one real `<h1>` says only **"RASMIRANJAN SAHOO"**. Nobody searches for your name except people who already know you. It should carry your money keyword.

### 6. Your favicon is a 1.1 MB PNG — **CONFIRMED**

[app/layout.tsx:25](app/layout.tsx#L25) sets `icon: "/image.png"`, and `public/image.png` is **1.1 MB**. That same 1.1 MB file is also rendered as the 40×40px header logo in [Header.tsx:91](components/Header.tsx#L91). And `app/icon.png` is *also* 1.1 MB. A favicon should be ~2–5 KB.

**Fix:** generate a proper icon set (32×32, 180×180 apple-touch, 512×512 maskable), delete `metadata.icons` and let Next's file convention serve an optimised `app/icon.png` under 50 KB.

### 7. The sitemap is functionally empty and omits your only case study — **CONFIRMED**

Real `out/sitemap.xml` contains 4 entries — but 3 are `#works`, `#about`, `#contact` fragments. **Google ignores URL fragments in sitemaps.** They collapse to the homepage. So your sitemap effectively declares *one* URL.

Worse, `/works/vedrastores` — your only real content page, which the build confirms is exported — **is not in the sitemap at all.**

### 8. `/works/vedrastores` has no metadata — duplicate title with the homepage — **CONFIRMED**

```
$ grep -o '<title>[^<]*</title>' out/works/vedrastores.html out/index.html
Rasmiranjan Sahoo | Best Freelance Web & App Developer in Odisha, India
Rasmiranjan Sahoo | Best Freelance Web & App Developer in Odisha, India
```

Identical. The cause: [app/works/vedrastores/page.tsx:1](app/works/vedrastores/page.tsx#L1) is `"use client"`, and **client components cannot export `metadata`.** Your best piece of content — a detailed 4-platform / 2-app case study — is invisible to search as a distinct page.

**Fix:** make `page.tsx` a server component that exports `metadata`, and move the `useState`/marquee logic into a child `"use client"` component. This is the single highest-ROI structural change in the codebase (and section 8 generalises it).

### 9. No canonical URL anywhere — **CONFIRMED** (`grep -c 'rel="canonical"' out/index.html` → `0`)

With GitHub Pages you're reachable at `rasmiranjan.in`, `www.rasmiranjan.in`, and `rasmi29.github.io/...`. Without a canonical, that's up to three competing copies of every page.

### 10. `cursor: none !important` is applied globally — accessibility failure

[CursorEffect.tsx:82-86](components/CursorEffect.tsx#L82-L86):
```css
body, a, button, input, textarea, select { cursor: none !important; }
```

This hides the OS cursor for **everyone**, permanently. Consequences:
- If the JS chunk fails or is slow, the user has **no cursor at all** and cannot use the site.
- Users with motion sensitivity, low vision, or tremor rely on the native cursor and its OS-level size/contrast settings. You've removed it.
- `input` and `textarea` lose the I-beam, so your future contact form will feel broken.

Also [line 75](components/CursorEffect.tsx#L75): `typeof window !== "undefined" && window.matchMedia("(pointer: coarse)")` runs during render — the server renders the cursor markup, a touch client renders `null` → **React hydration mismatch**. Move the check into `useEffect` + state.

**Fix:** keep the custom cursor as an *additive* layer, never remove the native one on inputs, and gate the whole component behind `(pointer: fine)` + `prefers-reduced-motion: no-preference`.

---

## 🟠 P1 — High

### 11. The 2.5-second forced loading screen is costing you visitors

[PageLoader.tsx:59-72](components/PageLoader.tsx#L59-L72) locks `body { overflow: hidden }` and blocks the page for a fixed 2500 ms — **on every single visit**, regardless of how fast the page actually loaded. The fake log messages ("Loading shader kernels...", "Establishing secure connection...") are theatre; there are no shaders and no connection.

Against the [2026 Core Web Vitals thresholds](https://www.corewebvitals.io/core-web-vitals) — LCP "good" is **under 2.5s** — you are guaranteeing a fail before your content has even tried to render. Mobile visitors on 4G in a hiring decision will bounce.

**Recommendation:** delete it, or cap it at ~600 ms *and* dismiss early once `document.readyState === "complete"`, *and* skip it entirely on repeat visits (`sessionStorage`) and under `prefers-reduced-motion`.

### 12. Project filters that filter nothing

[WorksSection.tsx:31](components/sections/WorksSection.tsx#L31) renders four filter pills — `All`, `E-Commerce`, `Fullstack`, `Mobile` — but [line 19](components/sections/WorksSection.tsx#L19) contains exactly **one** project, typed `"E-Commerce"`. Clicking "Fullstack" or "Mobile" empties the grid with **no empty state** — just a void where content was. It reads as a bug, and it advertises that you have no fullstack or mobile work.

**Fix:** derive categories from the data (`[...new Set(projects.map(p => p.type))]`) so a filter can never exist without results, and add an empty state as a safety net.

### 13. You brand as a "Gen AI specialist" but show zero AI projects

This is the most damaging *content* problem on the site. Your title tag, hero copy, footer, "CORE_EXPERTISE" badge on the Gen AI skill group, and About bio all lead with Generative AI. Your portfolio contains **one e-commerce project**. A prospect looking for an AI developer finds no evidence. E-E-A-T (Experience, Expertise, Authoritativeness, Trust) is what Google and LLM answer engines both grade you on — right now the claim is unsupported.

### 14. Statistics that undercut your credibility

[AboutSection.tsx:45-49](components/sections/AboutSection.tsx#L45-L49) claims:
- **"3+ Years Exp."** — but the timeline directly beneath it starts at *Sept 2025*, which is under a year as of Aug 2026.
- **"20+ Projects"** — with one project displayed.
- **"100% Commitment"** — not a metric; it reads as filler.

A sharp client will notice. Replace with numbers you can defend and that actually sell: *"4 Platforms Shipped"*, *"2 Apps in Production"*, *"Live in 2 Countries"*, *"4-Month Delivery"*. Verifiable specifics beat inflated round numbers.

### 15. Section numbering is scrambled

Rendered order is Hero → Works → About → Skills → Certificates → Contact, but the labels read:

| Section | Label | Should be |
|---|---|---|
| Works | `02 / PORTFOLIO` | 01 |
| About | `01 / ABOUT ME` | 02 |
| Certificates | *(none)* | 04 |
| Contact | `04 / CONTACT` | 05 |

There is no `03` anywhere. The numbering system implies precision, so getting it wrong is worse than not having it.

### 16. Copy-pasted skill description

[SkillsSection.tsx:61](components/sections/SkillsSection.tsx#L61) — the **Tools** category reuses the **Database** description verbatim: *"Designing efficient data schemas. I work with both relational and document-based databases..."* It also reuses the same `color` (`#336791`). Additionally [line 79](components/sections/SkillsSection.tsx#L79) maps **"Agent SDK"** to the **DeepSeek** logo, which is misleading, and [line 32](components/sections/SkillsSection.tsx#L32) maps "React Native" to the React icon (defensible, but the duplicate icon looks like an error).

### 17. Your `<h1>` and title target keywords you cannot win

`"Best Freelance Web & App Developer in Odisha, India"` — the word **"Best"** is subjective, unverifiable, and something Google's quality guidelines treat with suspicion. Meanwhile [layout.tsx:11-22](app/layout.tsx#L11-L22) ships a `keywords` array — **the meta keywords tag has been ignored by Google since 2009.** It's dead weight (harmless, but it signals dated SEO practice).

### 18. `framer-motion` is used in 15 files but is not in `package.json`

Every component imports from `"framer-motion"`, yet [package.json:20](package.json#L20) declares only `"motion": "^12.23.25"`. It resolves today purely because `motion` hoists `framer-motion@12.23.25` into `node_modules`. A different lockfile, a `pnpm` migration, or a stricter installer breaks the entire build. **Add `"framer-motion": "^12.23.25"` explicitly**, or migrate all imports to `motion/react`.

### 19. Skills icons: 37 external requests, no dimensions — **CONFIRMED**

```
$ grep -oE 'https://[a-z0-9.-]+\.(com|app|org|dev|io)' out/index.html | sort | uniq -c
     37 https://cdn.simpleicons.org
     10 https://grainy-gradients.vercel.app
```

[SkillsSection.tsx:103](components/sections/SkillsSection.tsx#L103) uses a raw `<img>` (ESLint flags it) with **no `width`/`height`** → layout shift (CLS). Every icon is a third-party request on the critical path; if `cdn.simpleicons.org` is slow or blocked, your entire skills section renders empty boxes. Some slugs are also fragile (`shadcnui`, `langchain`, `perplexity`) and 404 silently.

**Fix:** download the ~20 SVGs into `public/icons/` and inline them. Zero external requests, zero CLS, works offline, faster.

### 20. The noise texture is loaded from someone else's Vercel deployment — 10 places

`https://grainy-gradients.vercel.app/noise.svg` appears in `HeroSection`, `Header`, `Footer`, `WorksSection`, `AboutSection`, `ContactSection`, `SkillsSection`, `CertificatesParallax`, `ParallaxSection`, `PageLoader`, and the vedrastores page. That's a **third-party dependency you don't control** sitting on top of your entire visual identity. If it goes down, every section loses its texture.

You already have a self-contained inline-SVG noise utility at [globals.css:226-237](app/globals.css#L226-L237) (`.noise`) that nothing uses. Switch to it and delete 10 external requests.

### 21. 57 MB of unoptimised screenshots

```
public/Projects/Vedrastore/  → 57 MB
  vedra-buyer-banner-web.png    1.8 MB
  vedrastore-icon.png           1.6 MB
  vedrastore-banner.png         1.6 MB   ← rendered with priority
  vedrastore-rider-icon.png     1.4 MB
public/rasmi.png                2.0 MB   ← LCP image, priority
public/image.png                1.1 MB   ← favicon + 40px logo
```

Because `next.config.js` sets `images.unoptimized: true` (required for static export), **Next.js serves these bytes verbatim.** `rasmi.png` at 2 MB is marked `priority` in [AboutSection.tsx:191](components/sections/AboutSection.tsx#L191) — it competes with your hero for bandwidth.

**Fix:** convert everything to WebP/AVIF at sane dimensions before committing. Realistic target: **57 MB → under 4 MB**, with no visible quality loss. A 1600px-wide WebP at q80 will be ~120 KB instead of 1.8 MB.

---

## 🟡 P2 — Medium

### 22. Twelve ESLint errors — **CONFIRMED** (`npx eslint .` → 12 errors, 18 warnings)

| File | Issue |
|---|---|
| `PageLoader.tsx:28` | `Unexpected any` |
| `HeroSection.tsx:69` ×2 | `Unexpected any` |
| `TextReveal.tsx:31` | `Unexpected any` |
| `AboutSection.tsx:242,248,268` | Unescaped `'` |
| `ContactSection.tsx:140` | Unescaped `'` |
| `ParallaxSection.tsx:100` | `//` comment leaking into JSX children |
| `ParallaxSection.tsx:118` ×2 | Unescaped `"` |
| `ThemeContext.tsx:47` | `setState` synchronously in effect → cascading renders |

`ParallaxSection.tsx:100` is a real rendering bug: `// {subheading}` inside JSX renders the literal characters `//` — it happens to look intentional here, but React flags it because it's a classic accidental-comment pattern.

### 23. The theme system is dead code that would break the site if activated

- [context/ThemeContext.tsx](context/ThemeContext.tsx) is mounted in `layout.tsx` and writes to `localStorage`.
- [components/ThemeSwitcher.tsx](components/ThemeSwitcher.tsx) — **never imported anywhere.**
- Every section hardcodes `bg-black`, `bg-neutral-950`, `text-white`.

If a user has `prefers-color-scheme: light`, `ThemeProvider` removes the `.dark` class → `globals.css` sets `body { @apply bg-gray-50 text-gray-900 }` → but all your sections still paint pure black over it. So light mode does nothing except add a flash of the wrong background colour on first paint. **Either commit to dark-only** (delete the provider, switcher, and `.dark` variants) **or build light mode properly.** Right now it's the worst of both.

### 24. Six dead components shipping in your repo

Never imported: `components/ThemeSwitcher.tsx`, `components/ui/MagneticButton.tsx`, `components/ui/TextReveal.tsx`, `components/ui/AnimatedCounter.tsx`, `components/ui/button.tsx`. (`HeroSection` defines its *own* local `MagneticButton` at [line 91](components/sections/HeroSection.tsx#L91), duplicating the unused one.) Only `ui/ScrollProgress.tsx` is actually used.

### 25. Duplicate scroll progress bars

`layout.tsx` renders `<ScrollProgress />` globally (fixed, top). [SkillsSection.tsx:206-209](components/sections/SkillsSection.tsx#L206-L209) renders a **second** fixed progress bar tracking the same `scrollYProgress`. Two bars stack at the top of the viewport.

### 26. Skills background blobs bleed across the entire page

[SkillsSection.tsx:199-203](components/sections/SkillsSection.tsx#L199-L203) uses `fixed inset-0` for its purple/blue ambience. `position: fixed` escapes its parent (no transform/filter on the ancestor creates a containing block), so **those blobs sit behind every section of the site for the whole scroll**, not just the skills area. It muddies the black in Works, About, and Contact.

### 27. Duplicated footer content

[ContactSection.tsx:163-181](components/sections/ContactSection.tsx#L163-L181) renders `© {year} Rasmiranjan Sahoo` + `All Rights Reserved` + a "Back to Top" button — and then [Footer.tsx](components/Footer.tsx) renders the *same copyright* and *another* back-to-top button (a floating one at [line 45](components/Footer.tsx#L45)). Users see the copyright twice, ~200px apart, and two back-to-top affordances.

### 28. `mailto:` opened in a new tab

[ContactSection.tsx:80-82](components/sections/ContactSection.tsx#L80-L82) applies `target="_blank"` to every contact item including the `mailto:` link, which leaves a blank orphan tab behind in most browsers.

### 29. Dead parallax code in `ParallaxSection`

[ParallaxSection.tsx:34](components/sections/ParallaxSection.tsx#L34) computes `const x = useTransform(scrollYProgress, ...)` and passes it via `style={{ x }}` — but [line 42](components/sections/ParallaxSection.tsx#L42) also sets `animate={{ x: [...] }}`. **In Framer Motion, `animate` wins over `style` for the same property.** The scroll-linked parallax never runs; you only get the looping drift. The `scrollYProgress` prop threading is pointless.

### 30. `CNAME` is not in the deployed artifact

[CNAME](CNAME) sits at repo root. With `output: 'export'`, root files are **not** copied into `out/` — I confirmed `out/` contains no `CNAME`, and `.github/workflows/deploy.yml` only uploads `out/`. Custom-domain config currently survives only because GitHub Pages settings persist it server-side. **Move `CNAME` into `public/`** so it is deployed and version-controlled as the source of truth.

### 31. Hero's "Get In Touch" button doesn't go to contact

[HeroSection.tsx:249](components/sections/HeroSection.tsx#L249) — the button labelled **"Get In Touch"** links to a Google Drive resume PDF. Users expect the contact section. Separately, [Header.tsx:129](components/Header.tsx#L129) uses a *different* Drive file ID (`1WdiR6Qz...`) than the four other resume links across the site (`1ppX0jXZ...`) — so two different resumes are live. Also, `<a ... download>` in [AboutSection.tsx:218-220](components/sections/AboutSection.tsx#L218-L220) cannot force-download a cross-origin Google Drive URL; the attribute is silently ignored.

**Fix:** host `resume.pdf` in `public/`, link one canonical path everywhere, and point "Get In Touch" at `#contact`.

### 32. Missing `dir`, `theme-color`, and PWA manifest

`<html lang="en">` is present ✅, but there's no `theme-color` meta (mobile browser chrome renders default white against your black site) and no `manifest.json`.

---

# PART 2 — UI / UX

## What's genuinely good — keep it

The visual language is legitimately strong and you should not throw it away:
- Consistent emerald-on-near-black palette with disciplined `white/5` and `white/10` surface tints.
- Mono-uppercase-tracked labels (`02 / PORTFOLIO`) create real editorial rhythm.
- Outline/stroke text treatment on "SAHOO" and the footer watermark is distinctive.
- The tilt-on-hover certificate cards and the browser-chrome framing on case-study screenshots are the kind of detail that reads as senior.

## UX problems, ranked by cost

**1. There is no way to contact you without leaving the site.**
The entire funnel is four links (`mailto:`, LinkedIn, GitHub, Drive). Every one of them ejects the visitor. A form with name / email / project type / budget / timeline / message will roughly double your inquiry rate — and it lets you *qualify* leads instead of receiving "hi, interested" emails. On a static export, use [Formspree](https://formspree.io), [Web3Forms](https://web3forms.com), or a Cloudflare Worker.

**2. Nothing states what you sell or what it costs.**
There is no services list, no engagement model, no rate band, no availability, no process. Clients scanning ten portfolios pick the one that answers "can they do my thing, and roughly what will it cost?" You currently answer neither.

**3. The scroll is extremely long with no wayfinding.**
Hero (100vh) → Works → About (100vh) → Parallax (100vh) → Skills (5 categories × 80vh = **400vh**) → Certificates (100vh) → Parallax (100vh) → Contact (100vh). That's roughly **11 viewport heights**, and the two Parallax "philosophy" breaks are pure quote slides with no information. The skills section alone is four full screens to convey ~20 logo chips.

*Fix:* compress skills to one or two screens, cut one Parallax break, and add a persistent section indicator.

**4. Zero social proof.**
No testimonials, no client logos, no metrics ("processed X in M-Pesa transactions", "Y monthly active users"), no Play Store rating. Certificates are self-issued credentials — useful, but they are not proof that *clients* were happy. One real testimonial outperforms three certificates.

**5. Mobile has real problems.**
- `text-[12vw]` on the hero `<h1>` = ~47px at 390px wide, with `leading-[0.85]` — very tight.
- The mobile menu has no focus trap, no `Escape` handler, and no `aria-expanded` / `aria-modal`.
- `body { overflow: hidden }` is set directly rather than via a scroll-lock that preserves position — on iOS Safari the page jumps to the top when the menu closes.
- Case-study marquees use `min-w-[85vw]` cards that auto-scroll horizontally with **no pause control** — unreadable on a phone.
- The header hides on scroll-down; on a page this long, users lose navigation constantly.

**6. Contrast failures.**
`text-neutral-500` (#737373) on `bg-black` is **4.02:1** — below the WCAG AA 4.5:1 minimum for body text. It's used for nav items, stat labels, footer text, and metadata throughout. `text-neutral-600` on black is **2.8:1** — used for large display text ("Works.", "Problem Solver.", "together."), which passes the 3:1 large-text bar only barely. Bump body-level greys to `neutral-400` minimum.

## Recommended new page architecture

```
/                     Homepage — hero, 3 featured projects, services teaser, proof, CTA
/services             Hub: what you sell + engagement models + process
/services/web-development
/services/mobile-app-development
/services/ai-integration
/works                All projects, filterable       ← real page, indexable
/works/[slug]         Per-project case study         ← 4+ pages
/about                Long-form bio, timeline, certs
/contact              Form + calendar + FAQ
/blog                 Technical articles             ← your long-tail engine
/blog/[slug]
/hire-freelance-developer-india   Conversion landing page
```

That's ~15 indexable URLs versus your current 2.

---

# PART 3 — ANIMATION

## The one thing you must add: `prefers-reduced-motion`

Not a single animation in this codebase respects it. You have infinite-loop aurora rotations, ping pulses, marquees, drifting fog, tilt cards, spring cursors, and parallax on every section. For a user with vestibular disorder this site is **physically unpleasant** — and it's a WCAG 2.1 Level AA failure (Success Criterion 2.3.3).

```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
And in React, gate the expensive ones:
```tsx
const reduce = useReducedMotion();          // from framer-motion
{!reduce && <AuroraBackground />}
```

## Where the animation system is incoherent

**Easing and duration are inconsistent.** Across the codebase: `0.3s`, `0.35s`, `0.5s`, `0.7s`, `0.8s`, `1s`, `1.2s`, `3s` — with `easeOut`, `easeInOut`, `linear`, `[0.16,1,0.3,1]`, and `[0.76,0,0.24,1]` all in play. Different components animating similar things at different speeds is what separates "designed" from "assembled".

**Define one motion vocabulary:**
```ts
// lib/motion.ts
export const EASE = { out: [0.16, 1, 0.3, 1], inOut: [0.76, 0, 0.24, 1] } as const;
export const DUR  = { fast: 0.2, base: 0.4, slow: 0.7, hero: 1.1 } as const;

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: DUR.slow, ease: EASE.out },
};
```
Then every section imports `fadeUp` instead of re-declaring `initial`/`whileInView`/`transition` inline (which currently happens ~30 times).

**Continuously-running animations are burning battery.** The three aurora blobs in `HeroSection` animate `rotate`, `scale`, and `opacity` on `70vh × 70vh` elements with `blur-[80px]`, forever — even when scrolled far past. Blur that large is one of the most expensive operations in a browser compositor. Same for the three `FogSlice` elements and the `animate-ping` pills. **Pause off-screen animations** with `useInView`.

**`mix-blend-difference` on the cursor** (`CursorEffect.tsx:90`) forces the compositor to re-blend a full-viewport layer on every mouse move. Combined with two `useSpring`s, this is the most likely source of jank on mid-range laptops.

## Animation upgrades worth building

| Idea | Why it lands |
|---|---|
| **View Transitions API** for page navigation | Native browser cross-fade between `/works` and `/works/[slug]`. Cheap, feels native, well-supported in 2026. |
| **Character-stagger headline reveal** | Split the `<h1>` into spans, stagger 20ms. More expensive-looking than the current whole-block fade. You already have a `TextReveal.tsx` sitting unused. |
| **Scroll-linked SVG line** connecting timeline dots | Your About timeline already has the dots. Animating `pathLength` on scroll is a well-known "wow" moment. |
| **Magnetic cursor pull on CTAs** | You have `MagneticButton.tsx` written and unused — the hero buttons currently have no magnetism at all despite the component name. |
| **CSS scroll-driven animations** | `animation-timeline: view()` replaces several Framer scroll listeners with zero JS. Massive INP win. |
| **Number counters that animate on a real metric** | You have `AnimatedCounter.tsx` unused; pair it with the real project stats from §14. |
| **Marquee pause on hover/focus + reduced-motion** | `.animate-marquee` already has `:hover` pause in CSS ([globals.css:276](app/globals.css#L276)) but the case-study galleries never expose a manual control. |

---

# PART 4 — PERFORMANCE

**Current bundle:** 1.1 MB of JS chunks; 88 KB homepage HTML; 132 KB case-study HTML.

Biggest wins, in order:

1. **Delete/shorten the 2.5s loader** → instantly recovers ~2.5s of LCP.
2. **Compress images** 57 MB → <4 MB (WebP/AVIF, correct dimensions).
3. **Self-host the 20 skill icons and the noise SVG** → removes 47 third-party requests.
4. **Fix the 1.1 MB favicon** → saves 1.1 MB on every cold load.
5. **Lazy-load below-the-fold sections** with `next/dynamic` — `SkillsSection`, `CertificatesParallax`, and both `ParallaxSection`s are entirely below the fold and are all client components loaded eagerly.
6. **Remove unused heavy deps.** `package.json` declares `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `postprocessing`, and `@types/three` — **none of them are imported anywhere in the source.** That's a large chunk of `node_modules` and install time for nothing. Also `lucide-react` and `react-icons` are both declared, and neither appears in any component (every icon is a hand-written inline SVG).
7. **Drop `priority` from `rasmi.png`** — it's in the About section, far below the fold, and is your largest asset.
8. **Preconnect** to any third-party origins you keep.

---

# PART 5 — SEO MASTER PLAN

## First, an honest reality check

You said you want anyone in the world searching for "freelance" to find you. I want to be straight with you rather than sell you a fantasy:

**You will not rank for "freelancer", "freelance developer", or "hire developer" globally.** Those queries are owned by Upwork, Fiverr, Toptal, and LinkedIn — companies with millions of backlinks and domain authority in the 90s. No single-person portfolio ranks there, no matter how good the code is.

**What actually works is winning hundreds of specific, low-competition, high-intent queries.** That is the documented 2026 strategy: [target long-tail phrases with keyword difficulty under 30, clustered into dedicated pages](https://www.w3era.com/blog/seo/long-tail-keyword-strategy/), rather than chasing head terms. Someone searching *"hire React Native developer for M-Pesa integration"* is worth 100× more to you than someone searching *"freelancer"* — they have a budget and a specific problem, and **you have literally already built that exact thing.**

Your Vedrastores project is a genuine competitive moat: M-Pesa integration, Kenyan e-commerce, 4 platforms + 2 apps in 4 months. Almost nobody is writing about that. **That's where you win.**

## Phase 1 — Technical foundation (Week 1)

Fix P0 items 1–9, then:

```ts
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rasmiranjan Sahoo — Freelance Full-Stack & React Native Developer",
    template: "%s | Rasmiranjan Sahoo",
  },
  description:
    "Freelance full-stack developer building production e-commerce platforms, React Native apps and Gen-AI integrations. Shipped a 4-platform, 2-app commerce ecosystem for the Kenyan market in 4 months. Available worldwide.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large",
                 "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { /* ...absolute URLs now resolve correctly via metadataBase */ },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};
```

Note what changed in the title: **"Best"** (unverifiable) → concrete capability + technology names people actually search for. And the description leads with a *specific, provable achievement* rather than adjectives.

## Phase 2 — Structured data done properly

Your current [layout.tsx:53-77](app/layout.tsx#L53-L77) uses `ProfessionalService` with a `PostalAddress` in Bhubaneswar. Two problems: [the generic `ProfessionalService` type is discouraged in favour of `Person` + `Service` for individual freelancers](https://schema.org/ProfessionalService), and **a fixed street address signals "local business" — which caps you to Odisha searches when you want global reach.** For service-area businesses without a storefront, the guidance is to **omit `address` and use `areaServed`** instead.

You also currently emit a *second, conflicting* `Person` block from [AboutSection.tsx:129-136](components/sections/AboutSection.tsx#L129-L136) with a different URL. Consolidate to one graph:

```jsonc
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://rasmiranjan.in/#person",
      "name": "Rasmiranjan Sahoo",
      "url": "https://rasmiranjan.in",
      "image": "https://rasmiranjan.in/rasmi.webp",
      "jobTitle": "Freelance Full-Stack Developer",
      "description": "Full-stack developer specialising in React, Next.js, React Native and Gen-AI integration.",
      "knowsAbout": ["React", "Next.js", "React Native", "Node.js",
                     "M-Pesa Integration", "E-commerce Architecture",
                     "Generative AI", "LangChain"],
      "sameAs": ["https://github.com/rasmi29",
                 "https://www.linkedin.com/in/rasmiranjansahoo702/"],
      "address": { "@type": "PostalAddress", "addressLocality": "Bhubaneswar",
                   "addressRegion": "Odisha", "addressCountry": "IN" },
      "hasCredential": [ /* your 3 certificates, with credentialCategory + url */ ]
    },
    {
      "@type": "Service",
      "@id": "https://rasmiranjan.in/#service",
      "provider": { "@id": "https://rasmiranjan.in/#person" },
      "serviceType": "Web and Mobile Application Development",
      "areaServed": { "@type": "Place", "name": "Worldwide" },   // ← global reach
      "availableChannel": { "@type": "ServiceChannel",
                            "serviceUrl": "https://rasmiranjan.in/contact" }
    },
    { "@type": "WebSite", "@id": "https://rasmiranjan.in/#website",
      "publisher": { "@id": "https://rasmiranjan.in/#person" } }
  ]
}
```

Per-page additions:
- Every case study → `CreativeWork` (or `SoftwareApplication` for the apps) with `author`, `datePublished`, `about`.
- Every page → `BreadcrumbList`.
- Services pages → `Service` + `Offer`.
- Contact/FAQ → `FAQPage`.
- Blog posts → `TechArticle` with `author` `@id` pointing at your Person node.

That last detail matters more than it looks: **`@id` cross-references are what let a crawler build an entity graph** rather than reading each page as an unrelated document.

## Phase 3 — Content (this is 80% of the outcome)

Ten pages of substantive content will do more for you than every technical fix in this document combined. Priority order:

**Service pages** (highest commercial intent — build these first):
- `/services/web-development` — target *"freelance Next.js developer"*, *"hire React developer India"*
- `/services/mobile-app-development` — *"freelance React Native developer"*, *"hire Expo developer"*
- `/services/ai-integration` — *"hire LangChain developer"*, *"OpenAI API integration freelancer"*
- `/services/ecommerce-development` — *"custom e-commerce developer"*, *"multi-vendor marketplace developer"*

Each needs 800–1200 words: the problem you solve, your process, tech stack, timeline, a linked case study, an FAQ block, and a CTA.

**Blog posts** — write what only you can write:
- *"Integrating M-Pesa Daraja API with Next.js: A Complete Guide"* ← **you have first-hand experience and competition here is near zero**
- *"Building a Multi-Vendor Marketplace: Architecture Decisions"*
- *"React Native + Expo + Firebase: Production Auth Setup"*
- *"Serving Images at Scale with AWS S3 + CloudFront in Next.js"*
- *"What I Learned Shipping 4 Platforms and 2 Apps in 4 Months"*

The M-Pesa article is your wedge. It targets Kenyan and pan-African fintech/e-commerce builders — a real, funded, underserved audience — and it proves the exact expertise your case study claims.

**Location + intent landing pages:** `/hire-freelance-developer-india`, plus pages targeting *"freelance developer for startups"*, *"remote React developer available"*.

## Phase 4 — Optimising for AI answer engines (AEO / GEO)

This is genuinely important now. [AI search engines handle an estimated 12–18% of English-language informational queries as of Q1 2026](https://llmrefs.com/generative-engine-optimization), and increasingly the person looking to hire you asks ChatGPT or Perplexity rather than Google. The mechanics differ from classic SEO:

- **Add `/public/llms.txt`** — [a machine-readable summary of who you are and what you offer, positioned as "robots.txt for the AI age"](https://www.searchscaleai.com/blog/optimize-website-chatgpt-perplexity-google-ai-2026/).
- **Answer the question in the first 100 words of every page.** LLMs extract direct answers; they don't reward a slow build-up. Your current hero says "Engineering digital excellence" — that's atmosphere, not an answer.
- **Use question-shaped H2s** — *"How much does a custom e-commerce platform cost?"*, *"How long does a React Native app take to build?"*
- **Structured data is now the difference between content an LLM must infer and content it can verify and cite.** Phase 2 pays for itself twice.
- **Publish specific, checkable numbers.** "4 platforms, 2 apps, 4 months, M-Pesa, Kenya" is citable. "Premium solutions for high-impact businesses globally" is not — it's the kind of unfalsifiable marketing text an LLM will skip.
- **Keep dates fresh.** [Perplexity in particular strongly favours recent content](https://blog.chatfeatured.com/how-to-get-cited-by-chatgpt-perplexity-and-google-ai-the-2026-guide).

## Phase 5 — Off-page (the part nobody wants to do)

On-page SEO gets you *eligible* to rank. Authority gets you *ranked*. You have essentially zero backlinks today.

- **Google Business Profile** for Bhubaneswar — the single fastest local-visibility win.
- **Cross-post every blog article** to Dev.to, Hashnode, and Medium with a canonical link back.
- **Answer Stack Overflow questions** about M-Pesa integration and Expo — durable, high-authority links.
- **Fill out GitHub properly**: profile README, pinned repos, website link in bio. Your GitHub is linked from the portfolio but doesn't link back.
- **Directories**: Clutch, GoodFirms, Upwork, Toptal profiles all pass authority and rank for the head terms *you* can't.
- **Open-source something small and genuinely useful** — e.g. an `mpesa-nextjs` helper package. Package pages accrue links passively for years.

## Phase 6 — Measurement

Nothing is currently installed. Add: **Google Search Console** (verify + submit sitemap — non-negotiable), **Bing Webmaster Tools** (feeds ChatGPT's search), and a privacy-friendly analytics tool (Plausible / Umami / Cloudflare Web Analytics). Track: form submissions, resume downloads, case-study depth, and outbound contact clicks.

---

# PART 6 — ADDING 3 MORE PROJECTS

## First: refactor so projects scale

Right now `WorksSection.tsx` holds a hardcoded array and `/works/vedrastores` is a bespoke 737-line client component. Adding three projects that way means three more 700-line files and three more untitled, unindexable pages. **Fix the architecture first — it's about 2 hours and it's what makes the projects pay off in search.**

```
lib/projects.ts                    ← single source of truth
app/works/page.tsx                 ← index page (server, has metadata)
app/works/[slug]/page.tsx          ← server component: generateStaticParams + generateMetadata
app/works/[slug]/CaseStudyClient.tsx  ← "use client": galleries, marquees, state
```

```ts
// lib/projects.ts
export interface Project {
  slug: string;
  title: string;
  tagline: string;              // ← becomes the <title>
  metaDescription: string;      // ← 150-160 chars, keyword-bearing
  year: string;
  type: "E-Commerce" | "AI" | "SaaS" | "Mobile" | "Realtime";
  featured: boolean;
  role: string;
  duration: string;
  client?: string;
  problem: string;              // ← the story clients actually read
  solution: string;
  outcome: string;              // ← metrics. Non-negotiable.
  tech: string[];
  keywords: string[];           // ← drives per-page SEO
  links: { live?: string; github?: string; playStore?: string; appStore?: string };
  cover: { src: string; alt: string; width: number; height: number };
  gallery: { src: string; alt: string; caption: string }[];
}
```

```tsx
// app/works/[slug]/page.tsx  — server component
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug)!;
  return {
    title: p.tagline,
    description: p.metaDescription,
    alternates: { canonical: `/works/${p.slug}` },
    openGraph: { images: [p.cover.src], type: "article" },
  };
}
```

Three benefits, immediately: every project becomes an indexable page with its own title/description/OG image; the sitemap can be generated from `projects` automatically; and `WorksSection` filters derive from real data so item #12 can never happen again.

Also make the sitemap data-driven:
```ts
// app/sitemap.ts — no more hardcoded fragment URLs
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1, changeFrequency: "monthly" },
    { url: `${SITE_URL}/works`, priority: 0.9 },
    ...projects.map((p) => ({ url: `${SITE_URL}/works/${p.slug}`, priority: 0.8 })),
    ...services.map((s) => ({ url: `${SITE_URL}/services/${s.slug}`, priority: 0.9 })),
  ];
}
```

## Which three projects to add

I don't know which projects you have ready, so here's the strategic frame — **tell me what you've actually built and I'll slot them in.** The portfolio has specific gaps, and the three additions should each close one:

| Slot | Gap it closes | What it should be |
|---|---|---|
| **1. A Gen-AI product** | **Critical.** Your entire brand says "Gen AI specialist" and you show zero AI work (§13). | Anything real with LLMs: a RAG chatbot, an agentic tool, a LangChain pipeline, an AI-assisted internal tool. Even a focused one is enough to make the claim credible. |
| **2. A real-time / SaaS app** | Proves architectural range beyond storefronts; unlocks the "Fullstack" filter. | You list Socket.io and Redis in your skills and mention chat apps in your Gravitones role — a real-time chat or collaborative dashboard, or the multi-tenant project from your internship. |
| **3. A standalone mobile app** | Unlocks the "Mobile" filter with something that isn't part of Vedrastores. | Any React Native/Expo app you can show end-to-end — ideally one on the Play Store. |

**Every case study needs these five things** (yours currently has three):
1. **The problem** — in the client's words, not yours.
2. **Your specific role** — "single-handedly in 4 months" is a great line; keep that energy.
3. **Architecture decisions and trade-offs** — this is what convinces technical buyers.
4. **Measurable outcomes** — users, transactions, load time, revenue, delivery time. *Vedrastores has none of these right now.* Even "shipped in 4 months, 6 codebases" is a metric.
5. **Screenshots with captions** — you have 57 MB of screenshots and **not one caption** explaining what the viewer is looking at. Captions are indexable text and they're what makes a gallery persuasive rather than decorative.

---

# PART 7 — WHAT'S MISSING ENTIRELY

| Missing | Impact |
|---|---|
| Contact form | 🔴 Highest-impact single addition on the whole site |
| Services / pricing pages | 🔴 No commercial-intent surface at all |
| Testimonials / client logos | 🔴 Zero third-party social proof |
| Blog | 🔴 No long-tail engine, nothing for LLMs to cite |
| Google Search Console + analytics | 🔴 You are flying completely blind |
| Custom 404 page | 🟠 Currently the default Next.js not-found |
| Booking link (Cal.com / Calendly) | 🟠 Removes friction from "let's talk" |
| `llms.txt` | 🟠 AI-search discoverability |
| Self-hosted `resume.pdf` | 🟠 Two different Drive files are live today |
| Dynamic OG images (`ImageResponse`) | 🟡 Per-project share cards |
| RSS feed | 🟡 Once the blog exists |
| Skip-to-content link | 🟡 Accessibility |
| `manifest.json` / PWA | 🟡 Polish |
| Case-study PDF export | 🟡 Nice for proposals |

---

# PART 8 — EXECUTION ROADMAP

### Week 1 — Stop the bleeding
1. Add `metadataBase` + canonical → fixes broken social previews
2. Pick one domain; centralise in `lib/site.ts`; fix `robots.ts`
3. Delete the `nirupampal.vercel.app` leftover + dead `jsonLd`
4. Add `id="skills"`
5. Reduce to one `<h1>`; rewrite it with a real keyword
6. Fix the favicon (1.1 MB → <50 KB)
7. Fix sitemap: drop fragments, add `/works/vedrastores`
8. Add `prefers-reduced-motion` block
9. Remove `cursor: none` from inputs; gate the cursor properly
10. Fix all 12 ESLint errors

### Week 2 — Performance & conversion
11. Delete or cap the page loader
12. Compress all images to WebP (57 MB → <4 MB)
13. Self-host skill icons + noise SVG (−47 external requests)
14. Remove unused deps (`three`, `@react-three/*`, `postprocessing`, `lucide-react`, `react-icons`); add `framer-motion` explicitly
15. **Build the contact form**
16. Set up Search Console + analytics
17. Delete the 6 dead components; resolve the theme system either way

### Week 3–4 — Structure
18. Refactor to `lib/projects.ts` + `/works/[slug]`
19. Make `/works/vedrastores` a server component with real metadata
20. Add the 3 new projects with full case studies
21. Build 4 service pages
22. Consolidate JSON-LD into one `@graph`; add per-page schema
23. Fix section numbering, stats, duplicate copy

### Month 2 — Content & authority
24. Ship the M-Pesa article, then one post per week
25. Collect and publish 2–3 testimonials
26. Google Business Profile + directory profiles
27. Cross-post to Dev.to / Hashnode with canonicals
28. Add `llms.txt`, dynamic OG images, custom 404

### Ongoing
29. One post per month minimum
30. Update case studies with real metrics as they come in
31. Review Search Console monthly; write pages for queries you're already ranking 11–20 for

---

## Verification checklist

Re-run after each phase:

```bash
npx eslint .                                    # target: 0 errors
npm run build                                   # target: no metadataBase warning
grep -o '<h1' out/index.html | wc -l            # target: 1
grep -c 'rel="canonical"' out/index.html        # target: 1
grep -o '<meta property="og:image"[^>]*>' out/index.html   # target: absolute https URL
grep -c 'id="skills"' out/index.html            # target: 1
du -sh out                                      # target: < 10 MB
```

Then: PageSpeed Insights (mobile), [Rich Results Test](https://search.google.com/test/rich-results), and paste your URL into the LinkedIn Post Inspector and WhatsApp to confirm the preview card renders.

---

## The one-paragraph version

The design is the strongest asset here and it should survive intact. What's holding the site back is that it's a beautifully animated business card with broken plumbing: social previews resolve to `localhost`, three different domains are hardcoded, four `<h1>`s compete, the Skills nav link is dead, the favicon is 1.1 MB, and there's no way to contact you without leaving. Fix those in week one. But understand that **no amount of technical SEO will make a two-page site rank** — the actual growth lever is content: service pages, three more case studies with real numbers, and blog posts about M-Pesa and multi-vendor architecture, where you have genuine first-hand expertise and almost no competition. Ship that, and both Google and the AI answer engines will have something to point at.
