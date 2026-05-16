# Portfolio Style Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the `/` portfolio route so design tokens live in `src/styles.css` as Tailwind `@theme` tokens, hand-written CSS classes become Tailwind utilities, and the page is composed from reusable shadcn/ui (Base UI) components — with the rendered output unchanged 1:1.

**Architecture:** Tailwind v4 `@theme` carries Ciridae brand tokens globally. shadcn/ui on Base UI primitives supplies `Accordion`, `Badge`, `Button` in `src/components/ui/`. Page sections become focused files in `src/components/portfolio/`. `index.tsx` is reduced to route + composition. A slim route-scoped `portfolio.css` keeps only the atmospheric background and one keyframe — the things Tailwind cannot express cleanly.

**Tech Stack:** TanStack Start, React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Base UI / `@base-ui-components/react`), Biome 2, Vite 8, pnpm.

---

## Reference: class → utility mapping

Used throughout the section tasks. The original `portfolio.css` colors map to `@theme` tokens (Task 2):

| Original | Utility |
|---|---|
| `--color-deep-charcoal` `#0b0b0b` | `charcoal` (`bg-charcoal`) |
| `--color-pure-white` `#ffffff` | `white` |
| `--color-ash-gray` `#cecece` | `ash` (`text-ash`) |
| `--color-steel-gray` `#858585` | `steel` (`text-steel`) |
| `--accent` `#cc6437` | `accent` (`text-accent`, `bg-accent`) |
| `var(--font-cond)` | `font-cond` |
| `var(--font-mono)` | `font-mono` |
| `rgba(255,255,255,0.12)` border | `border-white/12` |
| `rgba(255,255,255,0.08)` border | `border-white/8` |
| `rgba(255,255,255,0.35)` border | `border-white/35` |
| `rgba(255,255,255,0.2)` border | `border-white/20` |
| `rgba(255,255,255,0.1)` bg | `bg-white/10` |

The original CSS uses `@media (max-width: 960px)` and `(max-width: 560px)`. Tailwind's
default breakpoints do not match, so these are translated **exactly** with arbitrary
`max-[960px]:` and `max-[560px]:` variants (desktop is the base style).

---

## Task 1: Initialize shadcn/ui with Base UI

**Files:**
- Create: `components.json` (CLI-generated)
- Create: `src/lib/utils.ts` (CLI-generated)
- Modify: `src/styles.css` (CLI may append shadcn token blocks)
- Modify: `package.json`, `pnpm-lock.yaml` (new dependencies)

- [ ] **Step 1: Run the shadcn init for Base UI**

Run: `pnpm dlx shadcn@latest init --base`

Answer the prompts:
- Primitives library: **Base UI**
- Framework: **Vite** (or whatever it auto-detects — TanStack Start uses Vite)
- Base color: **Neutral**
- CSS file: `src/styles.css`
- CSS variables: **Yes**
- Import alias for components: `#/components`
- Import alias for utils: `#/lib/utils`

This installs `@base-ui-components/react`, `clsx`, `tailwind-merge`,
`class-variance-authority`, `tw-animate-css`, creates `components.json` and
`src/lib/utils.ts`, and may append a `@theme inline` block + `:root`/`@layer base`
rules to `src/styles.css`.

- [ ] **Step 2: Confirm the import alias resolves**

`package.json` already declares `"imports": { "#/*": "./src/*" }`, so
`#/lib/utils` and `#/components/ui/*` resolve without extra config. Open
`components.json` and confirm the `aliases` block uses the `#/` prefix:

```json
"aliases": {
  "components": "#/components",
  "utils": "#/lib/utils",
  "ui": "#/components/ui",
  "lib": "#/lib",
  "hooks": "#/hooks"
}
```

If the CLI wrote `@/` instead, edit them to `#/`.

- [ ] **Step 3: Keep other routes unaffected**

If init added `@layer base { body { @apply bg-background text-foreground; } }`
to `src/styles.css`, leave it — the default `:root` semantic tokens stay neutral,
so `__root.tsx` and `hoverla-soft/li-banners.tsx` render as before. Do **not**
make the default theme dark.

- [ ] **Step 4: Verify the build still works**

Run: `pnpm build`
Expected: build succeeds (client + Nitro SSR bundles), no errors.

- [ ] **Step 5: Commit**

```bash
git add components.json src/lib/utils.ts src/styles.css package.json pnpm-lock.yaml
git commit -m "chore: initialize shadcn/ui on Base UI"
```

---

## Task 2: Add Ciridae brand tokens to the global theme

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Append the `@theme` block**

Add this block to `src/styles.css`, after the `@import "tailwindcss";` line
(and after any shadcn `@theme inline` block — a second `@theme` is valid in
Tailwind v4):

```css
@theme {
  --color-charcoal: #0b0b0b;
  --color-graphite: #272a2a;
  --color-ash: #cecece;
  --color-steel: #858585;
  --color-accent: #cc6437;

  --font-cond: "Open Sans Condensed", "Pragmatica Cond", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Roboto Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  --radius-pill: 1440px;
}
```

This generates utilities `bg-charcoal` / `text-charcoal`, `text-ash`, `text-steel`,
`text-accent` / `bg-accent`, `font-cond`, `font-mono`, `rounded-pill`.

- [ ] **Step 2: Verify the build and that utilities compile**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/styles.css
git commit -m "feat: add Ciridae brand tokens to Tailwind theme"
```

---

## Task 3: Add and adjust the shadcn UI primitives

**Files:**
- Create: `src/components/ui/accordion.tsx` (CLI-generated, then edited)
- Create: `src/components/ui/badge.tsx` (CLI-generated)
- Create: `src/components/ui/button.tsx` (CLI-generated)

- [ ] **Step 1: Add the primitives**

Run: `pnpm dlx shadcn@latest add accordion badge button`

The CLI pulls the Base UI variants because the project is configured for Base UI.

- [ ] **Step 2: Remove the built-in chevron from `AccordionTrigger`**

Open `src/components/ui/accordion.tsx`. The generated `AccordionTrigger` renders
a default chevron icon (a `ChevronDownIcon` / `ChevronDown` from `lucide-react`,
usually inside the trigger with rotate-on-open classes). Delete that icon element
and its now-unused import — the work rows supply their own `+` indicator.

Leave everything else (the `Accordion`, `AccordionItem`, `AccordionContent`
wrappers and the panel height animation) untouched.

- [ ] **Step 3: Note the Accordion API for Task 10**

Read the top of `src/components/ui/accordion.tsx` and note the prop names the
`Accordion` wrapper exposes (e.g. `type`/`collapsible`/`value` in the Radix-style
API, or `openMultiple`/`value` in the Base UI-native API). Task 10 wires a
controlled single-open accordion and must match these exact prop names.

- [ ] **Step 4: Verify the build**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui package.json pnpm-lock.yaml
git commit -m "feat: add accordion, badge, button primitives"
```

---

## Task 4: Extract CV data into a data module

**Files:**
- Create: `src/data/cv.ts`

- [ ] **Step 1: Create `src/data/cv.ts`**

Move the data arrays and their types out of `src/routes/index.tsx` verbatim
(lines 35-176 of the current file):

```ts
export interface WorkEntry {
  id: string;
  company: string;
  role: string;
  years: string;
  location: string;
  body: string[];
  stack: string[];
}

export const WORK: WorkEntry[] = [
  {
    id: "hoverla",
    company: "Hoverla Soft",
    role: "Full-Stack Engineer",
    years: "Feb 2025 — Present",
    location: "Remote",
    body: [
      "Building production applications on a modern type-safe stack: Next.js (App Router, RSC), TanStack ecosystem on the front end, with Hono APIs, Drizzle ORM, and oRPC end-to-end.",
      "Shipped a voice-controlled admin panel that makes shipment management accessible for users with disabilities — integrating LLM APIs for natural-language command parsing and intent recognition.",
      "Own features end-to-end across a 5-person team — schema design through UI — and maintain the GitHub Actions workflows (lint, type-check, test, deploy) running a Bun-driven Turborepo monorepo.",
    ],
    stack: ["Next.js", "TanStack", "Hono", "Drizzle", "oRPC", "Turborepo", "Bun", "LLM APIs"],
  },
  {
    id: "cgs",
    company: "CGS-team",
    role: "Full-Stack Engineer",
    years: "Dec 2022 — Feb 2025",
    location: "Lviv",
    body: [
      "Built the front-end for a parking application in React and Next.js with TypeScript, shipped as both a responsive web app and a native-feeling mobile app via Capacitor.",
      "Designed a library of custom UI components from scratch in Tailwind CSS and Framer Motion — animations, transitions, and gesture-based interactions handled in-house.",
      "Worked alongside designers to translate Figma into production-ready, responsive interfaces; also built React/Next.js front-ends and NestJS/Express APIs for a corporate platform spanning public site and admin tools.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Capacitor", "NestJS", "Express"],
  },
  {
    id: "developstoday",
    company: "DevelopsToday",
    role: "Front-End Engineer",
    years: "Mar 2022 — Dec 2022",
    location: "Lviv",
    body: [
      "Built and consumed GraphQL APIs for a karaoke web application — powering song catalog search, real-time session sync, user playlists, and scoring.",
      "Designed PostgreSQL schemas backing the catalog and session data, and worked across MySQL and MongoDB on adjacent client projects.",
    ],
    stack: ["React", "GraphQL", "PostgreSQL", "MySQL", "MongoDB"],
  },
];

export const STACK: { name: string; items: string[] }[] = [
  {
    name: "Front-end",
    items: ["React", "Next.js (App Router, RSC)", "TanStack Ecosystem", "Tailwind CSS", "Framer Motion", "Capacitor"],
  },
  {
    name: "Back-end & APIs",
    items: ["Hono", "Node.js", "Express.js", "NestJS", "oRPC", "GraphQL", "REST"],
  },
  {
    name: "Data",
    items: ["Drizzle ORM", "Prisma", "PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    name: "AI & Tooling",
    items: ["OpenAI API", "Anthropic API", "Vercel AI SDK", "Turborepo", "Bun", "GitHub Actions"],
  },
];

export const EDUCATION: { years: string; degree: string; school: string }[] = [
  { years: "2024 — 2025", degree: "Master of Computer Science", school: "Lviv Polytechnic National University" },
  { years: "2020 — 2024", degree: "Bachelor of Computer Science", school: "Lviv Polytechnic National University" },
];

export const LANGUAGES: { name: string; level: string; pct: number }[] = [
  { name: "Ukrainian", level: "Native", pct: 100 },
  { name: "English", level: "Upper-Intermediate", pct: 75 },
];

export const CONTACTS: { lbl: string; val: string; href: string }[] = [
  { lbl: "Email", val: "artemix.portfolio@gmail.com", href: "mailto:artemix.portfolio@gmail.com" },
  { lbl: "Phone", val: "+380 68 371 1267", href: "tel:+380683711267" },
  { lbl: "Location", val: "Lviv, Ukraine", href: "https://maps.google.com/?q=Lviv,Ukraine" },
  { lbl: "GitHub", val: "github.com/artemix", href: "https://github.com" },
];
```

- [ ] **Step 2: Verify formatting**

Run: `pnpm check`
Expected: no errors for `src/data/cv.ts` (Biome may auto-format; accept it).

- [ ] **Step 3: Commit**

```bash
git add src/data/cv.ts
git commit -m "refactor: extract CV data into src/data/cv.ts"
```

---

## Task 5: Slim down the route-scoped CSS

**Files:**
- Modify: `src/styles/portfolio.css` (full rewrite)

- [ ] **Step 1: Replace the entire file**

Replace the whole contents of `src/styles/portfolio.css` with:

```css
/* ============================================================
   Portfolio route-scoped styles. Loaded only on "/" via the
   route head() links, so nothing here leaks to other routes.

   Only the atmospheric background and one keyframe live here —
   verbose multi-stop gradients, SVG data-URIs and masks that
   Tailwind cannot express cleanly. Everything else is utilities.
   ============================================================ */

/* Live status dot — scales as well as fades, so Tailwind's
   opacity-only animate-pulse is not enough. */
@keyframes portfolio-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.55; transform: scale(0.85); }
}
.portfolio-pulse {
  animation: portfolio-pulse 2.4s ease-in-out infinite;
}

/* Atmospheric background — radial bokeh, scanning grid, film grain. */
.bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}
.bg .blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.35;
  mix-blend-mode: screen;
}
.bg .blob.a {
  width: 700px; height: 700px; left: -150px; top: -180px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.18), transparent 60%);
}
.bg .blob.b {
  width: 900px; height: 900px; right: -300px; bottom: -260px;
  background: radial-gradient(circle, rgba(204, 100, 55, 0.2), transparent 60%);
}
.bg .blob.c {
  width: 500px; height: 500px; left: 40%; top: 30%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.07), transparent 60%);
}
.bg .cursor-light {
  position: absolute;
  width: 600px; height: 600px;
  left: var(--cx, 50vw); top: var(--cy, 50vh);
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08), transparent 60%);
  filter: blur(40px);
  transition: opacity 0.3s ease;
}
.bg .grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 80px 80px;
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}
.bg .noise {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}

/* Hero film grain + 6-stop legibility gradient. */
.hero-grain {
  position: absolute;
  inset: 0;
  opacity: 0.06;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
.hero-legibility {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(11, 11, 11, 0.75) 0%,
    rgba(11, 11, 11, 0.35) 12%,
    rgba(11, 11, 11, 0.05) 28%,
    rgba(11, 11, 11, 0) 50%,
    rgba(11, 11, 11, 0.3) 78%,
    rgba(11, 11, 11, 0.92) 100%
  );
}
```

- [ ] **Step 2: Confirm Biome still ignores this file**

`biome.json` already excludes `src/styles/portfolio.css`. Run `pnpm check` and
confirm no error references this file.

- [ ] **Step 3: Commit**

```bash
git add src/styles/portfolio.css
git commit -m "refactor: slim portfolio.css to atmosphere and keyframe only"
```

---

## Task 6: Background and SectionHeader components

**Files:**
- Create: `src/components/portfolio/background.tsx`
- Create: `src/components/portfolio/section-header.tsx`

- [ ] **Step 1: Create `background.tsx`**

```tsx
import { useEffect } from "react";

/** Atmospheric layer — cursor light + ambient bokeh. Uses route-scoped
 *  classes from portfolio.css (verbose gradients/masks Tailwind can't express). */
export function Background() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      document.documentElement.style.setProperty("--cx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cy", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="bg" aria-hidden="true">
      <div className="grid-lines" />
      <div className="blob a" />
      <div className="blob b" />
      <div className="blob c" />
      <div className="cursor-light" />
      <div className="noise" />
    </div>
  );
}
```

- [ ] **Step 2: Create `section-header.tsx`**

```tsx
/** Shared section header: eyebrow / title / count. Reused by the work,
 *  stack and background sections. */
export function SectionHeader({
  eyebrow,
  title,
  count,
}: {
  eyebrow: string;
  title: string;
  count: string;
}) {
  return (
    <div className="mb-10 grid grid-cols-[200px_1fr_auto] items-baseline gap-6 max-[960px]:grid-cols-1">
      <span className="font-mono text-[11px] uppercase tracking-[-0.22px] text-steel">
        {eyebrow}
      </span>
      <h2 className="font-cond text-[clamp(32px,4.5vw,62px)] uppercase leading-[0.95] tracking-[-0.04em] text-white">
        {title}
      </h2>
      <span className="font-mono text-[11px] uppercase tracking-[-0.22px] text-steel">
        {count}
      </span>
    </div>
  );
}
```

- [ ] **Step 3: Verify**

Run: `pnpm check`
Expected: no errors for the two new files.

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/background.tsx src/components/portfolio/section-header.tsx
git commit -m "feat: add Background and SectionHeader components"
```

---

## Task 7: SiteNav component

**Files:**
- Create: `src/components/portfolio/site-nav.tsx`

- [ ] **Step 1: Create `site-nav.tsx`**

```tsx
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";

/** Top navigation. `overlay` removes spacing and adds a text shadow so the
 *  nav can sit on top of the hero photo. */
export function SiteNav({ overlay = false }: { overlay?: boolean }) {
  return (
    <nav
      className={cn(
        "flex items-center justify-between",
        overlay ? "pt-0 mb-0" : "pt-3 mb-20",
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2.5 font-cond text-base uppercase leading-none tracking-[-0.02em]",
          overlay && "[text-shadow:0_1px_8px_rgba(0,0,0,0.6)]",
        )}
      >
        <span className="portfolio-pulse inline-block size-2 rounded-full bg-accent shadow-[0_0_12px_#cc6437]" />
        <span>
          Artem Kovalitskyi{" "}
          <span className="max-[560px]:hidden">— Full-Stack Engineer</span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Badge
          className={cn(
            "inline-flex items-center gap-1.5 rounded-pill border border-white/35 bg-transparent px-[11px] py-[5px] font-cond text-[14px] uppercase leading-[0.9] tracking-[-0.02em] text-white",
            overlay && "[text-shadow:0_1px_8px_rgba(0,0,0,0.6)]",
          )}
        >
          <span className="portfolio-pulse size-1.5 rounded-full bg-accent shadow-[0_0_8px_#cc6437]" />
          Available · Jun 2026
        </Badge>
        <Button
          asChild
          variant="outline"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-pill border border-white bg-transparent px-[18px] py-2.5 font-cond text-[14px] uppercase leading-none tracking-[-0.02em] text-white transition-colors hover:bg-white hover:text-charcoal max-[560px]:px-3.5 max-[560px]:py-2 max-[560px]:text-[13px]"
        >
          <a href="#contact">Get in touch</a>
        </Button>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Adapt to the generated Button API if needed**

If the generated `src/components/ui/button.tsx` does not accept `asChild`
(Base UI uses a `render` prop in some versions), replace the `<Button asChild …>`
wrapper with the Base UI form: `<Button variant="outline" className="…" render={<a href="#contact" />}>Get in touch</Button>`.
Check the generated file and use whichever it exposes.

- [ ] **Step 3: Verify**

Run: `pnpm check`
Expected: no errors for `site-nav.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/site-nav.tsx
git commit -m "feat: add SiteNav component"
```

---

## Task 8: Hero component

**Files:**
- Create: `src/components/portfolio/hero.tsx`

- [ ] **Step 1: Create `hero.tsx`**

```tsx
import { SiteNav } from "#/components/portfolio/site-nav";

/** Full-bleed hero — portrait background, "Anthem" title plate at the bottom. */
export function Hero() {
  return (
    <header className="relative flex h-screen min-h-[720px] flex-col overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/portrait.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover object-[50%_72%] grayscale contrast-[1.05] brightness-[0.78]"
        />
        <div className="hero-legibility" />
        <div className="hero-grain" />
      </div>

      <div className="relative z-[1] mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between px-8 pb-7 pt-6 max-[560px]:px-[18px]">
        <SiteNav overlay />

        <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[-0.22px] text-ash [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col gap-1">
            <span>Fig. 01</span>
            <span>Artem, in studio</span>
          </div>
          <div className="flex flex-col gap-1">
            <span>Lviv · 49.84°N 24.03°E</span>
          </div>
        </div>

        <div className="self-stretch">
          <span className="mb-[18px] inline-flex items-center gap-3 font-mono text-[13px] uppercase tracking-[-0.26px] text-ash">
            <span className="h-px w-7 shrink-0 bg-ash" />
            Full-Stack Engineer · MMXXVI
          </span>
          <div className="font-cond text-[clamp(80px,16vw,260px)] font-normal uppercase leading-[0.82] tracking-[-0.04em] text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.45)] max-[960px]:text-[clamp(56px,14vw,110px)]">
            <span className="block">ARTEM</span>
            <span className="block">KOVALITSKYI</span>
          </div>
        </div>

        <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[-0.22px] text-ash [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col gap-1">
            <span>Portfolio · v1.0</span>
            <span>MMXXVI</span>
          </div>
          <div className="flex flex-col items-end gap-1 text-right">
            <span>Scroll for index ↓</span>
            <span>04 sections</span>
          </div>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm check`
Expected: no errors for `hero.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/hero.tsx
git commit -m "feat: add Hero component"
```

---

## Task 9: HeroIntro component

**Files:**
- Create: `src/components/portfolio/hero-intro.tsx`

- [ ] **Step 1: Create `hero-intro.tsx`**

```tsx
const META = [
  { label: "Discipline", value: "Full-Stack Engineering" },
  { label: "Based in", value: "Lviv, Ukraine" },
  { label: "Stack", value: "TS · Next · Hono · LLMs" },
] as const;

/** Tagline + meta grid that sits directly below the hero. */
export function HeroIntro() {
  return (
    <section className="pb-[60px] pt-10">
      <div className="flex flex-wrap items-end justify-between gap-6 pb-6 pt-8">
        <p className="max-w-[620px] font-cond text-[clamp(20px,1.5vw,24px)] leading-[1.1] tracking-[-0.01em] text-ash">
          Full-stack engineer with{" "}
          <strong className="font-normal text-white">four years</strong>{" "}
          shipping production TypeScript end-to-end — from Postgres schema to RSC
          UI, with LLM APIs wired into the products people actually use.
        </p>
        <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[-0.22px] text-steel">
          Portfolio · v1.0 · MMXXVI
        </span>
      </div>

      <div className="grid grid-cols-4 gap-6 border-y border-white/12 py-6 max-[960px]:grid-cols-2">
        {META.map((m) => (
          <div className="flex flex-col gap-2" key={m.label}>
            <span className="font-mono text-[11px] uppercase leading-[1.1] tracking-[-0.22px] text-steel">
              {m.label}
            </span>
            <span className="font-cond text-base uppercase leading-[1.1] tracking-[-0.02em] text-white">
              {m.value}
            </span>
          </div>
        ))}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase leading-[1.1] tracking-[-0.22px] text-steel">
            Status
          </span>
          <span className="font-cond text-base uppercase leading-[1.1] tracking-[-0.02em] text-white">
            <span className="text-accent">●</span> Open to work
          </span>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm check`
Expected: no errors for `hero-intro.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/hero-intro.tsx
git commit -m "feat: add HeroIntro component"
```

---

## Task 10: WorkAccordion component

**Files:**
- Create: `src/components/portfolio/work-accordion.tsx`

- [ ] **Step 1: Create `work-accordion.tsx`**

This replaces the old `div role="button"` accessibility hack with the real
Base UI accordion. It is a **controlled single-open** accordion so the row can
rotate its `+` indicator based on open state.

```tsx
import { useState } from "react";
import { SectionHeader } from "#/components/portfolio/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "#/components/ui/accordion";
import { Badge } from "#/components/ui/badge";
import { cn } from "#/lib/utils";
import { WORK } from "#/data/cv";

export function WorkAccordion() {
  const [open, setOpen] = useState<string>("hoverla");

  return (
    <section className="border-t border-white/12 py-[60px]" id="work">
      <SectionHeader
        eyebrow="§ 01 · Selected work"
        title="Things I've shipped"
        count={`${WORK.length} entries`}
      />
      <Accordion
        type="single"
        collapsible
        value={open}
        onValueChange={(v) => setOpen(typeof v === "string" ? v : "")}
        className="flex flex-col"
      >
        {WORK.map((w, i) => {
          const isOpen = open === w.id;
          return (
            <AccordionItem
              key={w.id}
              value={w.id}
              className="group relative border-t border-white/12 last:border-b"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-x-100"
              />
              <AccordionTrigger className="grid w-full grid-cols-[60px_1.6fr_1fr_130px_40px] items-baseline gap-6 py-7 text-left hover:no-underline max-[960px]:grid-cols-[40px_1fr_auto_24px] max-[560px]:grid-cols-[30px_1fr_28px]">
                <span className="font-mono text-[11px] tracking-[-0.22px] text-steel">
                  № {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={cn(
                    "font-cond text-[clamp(28px,3.2vw,40px)] uppercase leading-none tracking-[-0.03em] text-white transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.1,1)]",
                    "group-hover:translate-x-2",
                  )}
                >
                  {w.company}
                </div>
                <div className="font-cond text-base uppercase tracking-[-0.02em] text-ash max-[960px]:hidden">
                  {w.role}
                </div>
                <div className="whitespace-nowrap text-right font-mono text-[14px] tracking-[-0.28px] text-ash max-[560px]:hidden">
                  {w.years}
                </div>
                <span
                  aria-hidden="true"
                  className={cn(
                    "w-5 justify-self-end text-center font-cond text-xl text-white transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] max-[560px]:text-lg",
                    isOpen && "rotate-45 text-accent",
                  )}
                >
                  +
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-[84px] pr-[64px] max-[960px]:pl-[64px] max-[960px]:pr-0 max-[560px]:pl-[54px]">
                <div className="grid grid-cols-[1.4fr_1fr] gap-8 pb-7 max-[960px]:grid-cols-1">
                  <div>
                    {w.body.map((p) => (
                      <p
                        key={p}
                        className="max-w-[60ch] font-mono text-[14px] leading-[1.5] tracking-[-0.28px] text-ash [&+p]:mt-3"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-wrap content-start gap-1.5">
                    {w.stack.map((s) => (
                      <Badge
                        key={s}
                        className="whitespace-nowrap rounded-pill border border-white/20 bg-transparent px-2.5 py-1.5 font-mono text-[11px] tracking-[-0.22px] text-ash"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
```

- [ ] **Step 2: Reconcile with the generated Accordion API**

Open `src/components/ui/accordion.tsx` (noted in Task 3 Step 3) and align the
`Accordion` props with what the generated wrapper actually accepts:
- If it uses the Radix-style API: keep `type="single" collapsible value={open} onValueChange={…}`.
- If it uses the Base UI-native API: replace with `value={[open]}` /
  `onValueChange={(arr) => setOpen(arr[0] ?? "")}` and drop `type`/`collapsible`
  (Base UI `Accordion` is single-open when `openMultiple` is omitted/false).

Keep the `isOpen` derivation and everything else identical.

- [ ] **Step 3: Verify the panel padding/animation visually after Task 14**

The old layout put the expanded body under columns 2-4 (between the index
column and the toggle). Since the trigger — not the item — is the grid, the
content is indented with `pl`/`pr` instead: `pl-[84px]` = 60px index column +
24px gap, `pr-[64px]` = 40px toggle column + 24px gap, with `max-[960px]`/
`max-[560px]` variants matching the narrower column widths. The `pb-7` on the
inner grid plus the trigger's `py-7` reproduce the vertical spacing. If the
generated `AccordionContent` adds its own padding, override it (the `pl`/`pr`
classes win via tailwind-merge; add `py-0` if it injects vertical padding).
Confirm during the Task 14 visual check.

- [ ] **Step 4: Verify**

Run: `pnpm check`
Expected: no errors for `work-accordion.tsx`.

- [ ] **Step 5: Commit**

```bash
git add src/components/portfolio/work-accordion.tsx
git commit -m "feat: add WorkAccordion built on the Base UI accordion"
```

---

## Task 11: StackGrid component

**Files:**
- Create: `src/components/portfolio/stack-grid.tsx`

- [ ] **Step 1: Create `stack-grid.tsx`**

```tsx
import { SectionHeader } from "#/components/portfolio/section-header";
import { STACK } from "#/data/cv";

export function StackGrid() {
  const total = STACK.reduce((n, g) => n + g.items.length, 0);

  return (
    <section className="border-t border-white/12 py-[60px]" id="stack">
      <SectionHeader
        eyebrow="§ 02 · Toolkit"
        title="Stack"
        count={`${total} tools`}
      />
      <div className="grid grid-cols-4 gap-px border border-white/12 bg-white/12 max-[960px]:grid-cols-2 max-[560px]:grid-cols-1">
        {STACK.map((g, i) => (
          <div
            className="relative flex min-h-[220px] flex-col gap-[18px] bg-charcoal px-6 py-7 transition-colors hover:bg-[#131313]"
            key={g.name}
          >
            <div className="flex items-baseline justify-between">
              <span className="font-cond text-xl uppercase tracking-[-0.02em]">
                {g.name}
              </span>
              <span className="shrink-0 whitespace-nowrap font-mono text-[11px] tracking-[-0.22px] text-steel">
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(STACK.length).padStart(2, "0")}
              </span>
            </div>
            <ul className="flex list-none flex-col gap-2">
              {g.items.map((it) => (
                <li
                  key={it}
                  className="flex items-baseline gap-2.5 font-mono text-[13px] leading-[1.2] tracking-[-0.26px] text-ash"
                >
                  <span className="h-px w-1 shrink-0 -translate-y-[3px] bg-steel" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm check`
Expected: no errors for `stack-grid.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/stack-grid.tsx
git commit -m "feat: add StackGrid component"
```

---

## Task 12: EducationLanguages component

**Files:**
- Create: `src/components/portfolio/education-languages.tsx`

- [ ] **Step 1: Create `education-languages.tsx`**

```tsx
import { SectionHeader } from "#/components/portfolio/section-header";
import { EDUCATION, LANGUAGES } from "#/data/cv";

export function EducationLanguages() {
  return (
    <section className="border-t border-white/12 py-[60px]" id="background">
      <SectionHeader
        eyebrow="§ 03 · Background"
        title="Education & tongues"
        count="since 2020"
      />
      <div className="grid grid-cols-2 gap-px border border-white/12 bg-white/12 max-[960px]:grid-cols-1">
        <div className="bg-charcoal p-8">
          <h3 className="mb-5 flex items-baseline justify-between font-cond text-xl uppercase tracking-[-0.02em]">
            Education{" "}
            <span className="font-mono text-[11px] tracking-[-0.22px] text-steel">
              {EDUCATION.length} entries
            </span>
          </h3>
          {EDUCATION.map((e) => (
            <div
              className="grid grid-cols-[100px_1fr] items-baseline gap-6 border-t border-white/8 py-4 first-of-type:border-t-0 first-of-type:pt-0"
              key={e.degree}
            >
              <span className="font-mono text-[11px] uppercase tracking-[-0.22px] text-steel">
                {e.years}
              </span>
              <div>
                <div className="font-cond text-lg uppercase tracking-[-0.02em]">
                  {e.degree}
                </div>
                <div className="mt-1.5 font-mono text-xs tracking-[-0.24px] text-ash">
                  {e.school}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-charcoal p-8">
          <h3 className="mb-5 flex items-baseline justify-between font-cond text-xl uppercase tracking-[-0.02em]">
            Languages{" "}
            <span className="font-mono text-[11px] tracking-[-0.22px] text-steel">
              {LANGUAGES.length} entries
            </span>
          </h3>
          <div className="flex flex-col gap-[18px]">
            {LANGUAGES.map((l) => (
              <div
                className="grid grid-cols-[1fr_2fr_auto] items-center gap-4"
                key={l.name}
              >
                <span className="font-cond text-base uppercase tracking-[-0.02em]">
                  {l.name}
                </span>
                <span className="relative h-0.5 overflow-hidden bg-white/10">
                  <span
                    className="absolute left-0 top-0 h-full bg-white"
                    style={{ width: `${l.pct}%` }}
                  />
                </span>
                <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[-0.22px] text-steel">
                  {l.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm check`
Expected: no errors for `education-languages.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/education-languages.tsx
git commit -m "feat: add EducationLanguages component"
```

---

## Task 13: Contact and SiteFooter components

**Files:**
- Create: `src/components/portfolio/contact.tsx`
- Create: `src/components/portfolio/site-footer.tsx`

- [ ] **Step 1: Create `contact.tsx`**

```tsx
import { CONTACTS } from "#/data/cv";

export function Contact() {
  return (
    <section
      className="grid grid-cols-2 items-end gap-12 border-t border-white/12 pb-[60px] pt-[100px] max-[960px]:grid-cols-1"
      id="contact"
    >
      <div>
        <h2 className="font-cond text-[clamp(48px,8vw,120px)] uppercase leading-[0.9] tracking-[-0.04em]">
          Let's
          <br />
          build
          <br />
          <span className="text-accent">/</span> something.
        </h2>
      </div>
      <div className="flex flex-col gap-3.5">
        {CONTACTS.map((c) => (
          <a
            key={c.lbl}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group grid grid-cols-[80px_1fr_16px] items-baseline gap-4 border-t border-white/12 py-3.5 transition-[padding] last:border-b hover:pl-2"
          >
            <span className="font-mono text-[11px] uppercase tracking-[-0.22px] text-steel">
              {c.lbl}
            </span>
            <span className="font-cond text-xl uppercase tracking-[-0.02em]">
              {c.val}
            </span>
            <span className="font-cond text-base transition-transform group-hover:translate-x-1 group-hover:text-accent">
              ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `site-footer.tsx`**

```tsx
export function SiteFooter() {
  return (
    <footer className="flex items-baseline justify-between border-t border-white/12 pt-10 font-mono text-[11px] uppercase tracking-[-0.22px] text-steel">
      <span>© MMXXVI · Artem Kovalitskyi</span>
      <span>Lviv 49.84°N 24.03°E</span>
      <span>Last updated · May 2026</span>
    </footer>
  );
}
```

- [ ] **Step 3: Verify**

Run: `pnpm check`
Expected: no errors for the two new files.

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/contact.tsx src/components/portfolio/site-footer.tsx
git commit -m "feat: add Contact and SiteFooter components"
```

---

## Task 14: Rewrite index.tsx and verify the whole page

**Files:**
- Modify: `src/routes/index.tsx` (full rewrite)

- [ ] **Step 1: Replace `src/routes/index.tsx`**

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Background } from "#/components/portfolio/background";
import { Contact } from "#/components/portfolio/contact";
import { EducationLanguages } from "#/components/portfolio/education-languages";
import { Hero } from "#/components/portfolio/hero";
import { HeroIntro } from "#/components/portfolio/hero-intro";
import { SiteFooter } from "#/components/portfolio/site-footer";
import { StackGrid } from "#/components/portfolio/stack-grid";
import { WorkAccordion } from "#/components/portfolio/work-accordion";
import portfolioCss from "../styles/portfolio.css?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Artem Kovalitskyi — Full-Stack Engineer" },
      {
        name: "description",
        content:
          "Artem Kovalitskyi — Full-stack engineer. Production TypeScript end-to-end, Next.js, Hono, Drizzle, LLM APIs. Based in Lviv, Ukraine.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300;700&family=Open+Sans:wght@400;500;600&family=Roboto+Mono:wght@400;500&display=swap",
      },
      { rel: "stylesheet", href: portfolioCss },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-charcoal font-mono text-[14px] leading-none tracking-[-0.28px] text-white antialiased">
      <Background />
      <Hero />
      <main className="relative z-[1] mx-auto max-w-[1400px] px-8 pb-[60px] max-[560px]:px-[18px]">
        <HeroIntro />
        <WorkAccordion />
        <StackGrid />
        <EducationLanguages />
        <Contact />
        <SiteFooter />
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Run Biome**

Run: `pnpm check`
Expected: PASS — no lint/format errors. Accept any auto-formatting.

- [ ] **Step 3: Run the type check**

Run: `pnpm exec tsc --noEmit`
Expected: no errors in any `src/components/**`, `src/data/**`, or
`src/routes/index.tsx` file. The 3 pre-existing `TS6133` unused-import warnings
in `src/router.tsx` are out of scope — ignore only those.

- [ ] **Step 4: Build**

Run: `pnpm build`
Expected: build succeeds — client + Nitro SSR bundles, no errors.

- [ ] **Step 5: SSR smoke test**

Run: `pnpm dev` in the background, then:
`curl -s http://localhost:3000/ | grep -c "KOVALITSKYI"`
Expected: `1` or more — the page server-renders with hero content. Also confirm
the response contains `portfolio.css` and `portrait.jpg`. Stop the dev server.

- [ ] **Step 6: Visual check**

Open `http://localhost:3000/` in a browser and compare against the
pre-refactor page (git stash / previous commit if needed):
- Hero portrait, "ARTEM / KOVALITSKYI" plate, frame markers.
- Work rows expand/collapse on click **and** keyboard (Tab + Enter/Space); the
  `+` rotates to `×` and turns orange; hover underline animates.
- Stack grid, education/language bars, contact hover states, footer.
- Navigate to `/hoverla-soft/li-banners` — confirm it is visually unchanged
  (not dark-themed).

- [ ] **Step 7: Commit**

```bash
git add src/routes/index.tsx
git commit -m "refactor: compose portfolio page from reusable components"
```

---

## Task 15: Final cleanup

**Files:**
- Reference only: `src/routes/index.tsx`, `src/styles/portfolio.css`

- [ ] **Step 1: Confirm no dead code**

Verify `src/routes/index.tsx` no longer contains the old inline components or
data arrays (it should match Task 14 Step 1 exactly), and that nothing imports
the removed symbols.

Run: `git grep -n "function WorkRow\|function SelectedWork\|function EduLang" src/`
Expected: no output.

- [ ] **Step 2: Confirm the styling surface shrank**

Run: `wc -l src/styles/portfolio.css`
Expected: roughly ~115 lines (down from 945).

- [ ] **Step 3: Final full verification**

Run: `pnpm check && pnpm build`
Expected: both pass.

- [ ] **Step 4: Commit (only if Steps 1-3 produced changes)**

```bash
git add -A
git commit -m "chore: portfolio refactor cleanup"
```

---

## Self-Review Notes

- **Spec coverage:** Setup (Task 1) · global `@theme` tokens (Task 2) · Base UI
  primitives accordion/button/badge (Task 3) · `components/ui` + `components/portfolio`
  split (Tasks 3, 6-13) · CV data module (Task 4) · slim route-scoped custom CSS
  with atmosphere + keyframe only (Task 5) · scoped dark base via the wrapper's
  utilities (Task 14) · 1:1 verification incl. other-routes check (Task 14 Step 6).
  All spec sections map to a task.
- **`Card`/`Separator`:** intentionally not used, per spec — hairline borders
  are plain `border-*` utilities.
- **Known uncertainty:** the exact prop API of the generated Base UI `Accordion`
  and `Button` depends on the installed shadcn version. Tasks 3, 7, and 10 each
  instruct the engineer to read the generated file and adapt — this is a
  documented two-branch decision against a file the engineer can see, not a
  placeholder.
