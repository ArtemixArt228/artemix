# Portfolio style refactor — Tailwind tokens + Base-UI shadcn components

**Date:** 2026-05-16
**Status:** Approved
**Scope:** `/` route (portfolio main page) only

## Goal

Refactor the portfolio page so it produces the **same pixel output** with a
healthier structure:

1. Design tokens live in `src/styles.css` as Tailwind v4 `@theme` tokens, the
   way a normal Tailwind project carries tokens.
2. Hand-written BEM-ish classes are replaced with Tailwind utilities. Custom
   CSS is kept **only** where it genuinely beats Tailwind.
3. A reusable component layer is built on shadcn/ui using **Base UI**
   primitives, with page sections extracted into their own files.

This is a structural refactor, not a redesign. The visual result is preserved
1:1.

## Current state

- `src/routes/index.tsx` (540 lines) — route definition plus 10 inline
  components (`Background`, `Nav`, `Hero`, `HeroBelow`, `WorkRow`,
  `SelectedWork`, `Stack`, `EduLang`, `Contact`, `Footer`) and all CV data
  arrays.
- `src/styles/portfolio.css` (945 lines) — route-scoped CSS: `:root` tokens and
  ~80 hand-written classes. Loaded only on `/` via `head()` links.
- `src/styles.css` — global, `@import "tailwindcss"` plus a small reset.
- Tailwind v4 (`@tailwindcss/vite`) is installed. No `components.json`, no
  shadcn yet.
- `package.json` defines the import map `"#/*": "./src/*"`.
- Other routes: `__root.tsx`, `hoverla-soft/li-banners.tsx` — must remain
  visually unaffected.

## Decisions (from brainstorming)

- **shadcn integration:** Full shadcn/ui on **Base UI** primitives.
- **File structure:** Primitives in `components/ui/`, page sections in
  `components/portfolio/`.
- **Token scope:** Design tokens go global (`@theme` in `styles.css`); the dark
  base/atmosphere stays scoped to the portfolio route.

## Design

### 1. Setup

- Run `npx shadcn@latest init --base`, selecting **Base UI** primitives, Vite,
  Tailwind v4. This creates `components.json`, `src/lib/utils.ts` (`cn()`), and
  installs `@base-ui-components/react`, `clsx`, `tailwind-merge`,
  `class-variance-authority`, `tw-animate-css`.
- `components.json` aliases reuse the existing `#/*` import map:
  `#/components/ui` and `#/lib/utils`. No new path-alias configuration needed;
  `src/lib/utils.ts` is created so `#/lib/utils` resolves.
- `components.json` `tailwind.css` points at `src/styles.css`,
  `cssVariables: true`.

### 2. Tokens — global `@theme` in `src/styles.css`

Ciridae brand tokens become real Tailwind utilities, available app-wide:

```css
@theme {
  --color-charcoal: #0b0b0b;
  --color-graphite: #272a2a;
  --color-ash: #cecece;
  --color-steel: #858585;
  --color-accent: #cc6437;
  --font-cond: "Open Sans Condensed", "Pragmatica Cond", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Roboto Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
```

This yields `bg-charcoal`, `text-ash`, `text-accent`, `font-cond`, `font-mono`,
etc.

shadcn's semantic tokens (`--background`, `--foreground`, `--border`, `--ring`,
`--radius`, …) keep their **neutral default** values in `:root` so the root
shell and the `hoverla-soft` route are unaffected. The portfolio route
overrides them to the dark Ciridae values inside a scoped `.portfolio { … }`
block, so shadcn components rendered on `/` adopt the dark theme.

Fluid type uses Tailwind arbitrary values, e.g. `text-[clamp(80px,16vw,260px)]`
— no custom CSS required for the `clamp()` sizing.

### 3. Reusable components — `src/components/ui/` (Base UI, restyled)

Only the three primitives that earn their place:

- **`accordion`** — backs the selected-work rows. Replaces the current
  `div + role="button"` keyboard-accessibility hack with real Base UI
  accessibility and the panel height-animation variable.
- **`button`** — the "Get in touch" ghost button and the contact-list links
  (via a variant).
- **`badge`** — the "Available · Jun 2026" badge and the work-stack chips.

`Card` and `Separator` are deliberately **not** used: the stack cells and
education/language panels form a 1px-gap hairline grid, where a `Card` border
would double up. Those stay as plain section markup with Tailwind utilities.

Each primitive is generated via `npx shadcn@latest add …`, then restyled to the
Ciridae look using the theme tokens.

### 4. Page sections — `src/components/portfolio/`

`index.tsx` shrinks to: the route definition, `head()`, and a `<Home>` that
composes the sections. Each section becomes its own file:

- `background.tsx` — atmospheric layer
- `site-nav.tsx` — top nav (uses `Button`, `Badge`)
- `hero.tsx` — full-bleed hero
- `hero-intro.tsx` — tagline + meta grid (was `HeroBelow`)
- `work-accordion.tsx` — selected work, built on `ui/accordion` (was
  `SelectedWork` + `WorkRow`)
- `stack-grid.tsx` — stack grid (was `Stack`)
- `education-languages.tsx` — education + languages (was `EduLang`)
- `contact.tsx` — contact strip
- `site-footer.tsx` — footer
- `section-header.tsx` — shared eyebrow / title / count header, reused by the
  work, stack, and background sections

CV data and its types (`WORK`, `STACK`, `EDUCATION`, `LANGUAGES`, `CONTACTS`)
move to `src/data/cv.ts`.

### 5. Custom CSS that remains — `src/styles/portfolio.css`

The file drops from ~945 lines to roughly ~120, keeping only what Tailwind
cannot express cleanly:

- The `.portfolio { … }` block overriding shadcn semantic tokens to the dark
  Ciridae theme for this route.
- **Atmospheric background**: blob radial-gradients with `blur(120px)` and
  `mix-blend-mode: screen`, grid-lines with a radial `mask-image`, the
  noise/grain SVG data-URIs, and the cursor-light positioned by the
  `--cx`/`--cy` custom properties.
- A `pulse` keyframe for the live status dots (Tailwind's `animate-pulse` only
  animates opacity; this one also scales).

It stays route-scoped, loaded via the route `head()` `links` as today.

Everything else — layout grids, spacing, typography, borders, and hover states
(the work-row underline via a `group` + a `<span>`) — becomes Tailwind
utilities. The `--lvl` language-bar fill and `--cx`/`--cy` cursor values stay
as inline CSS custom properties set from React.

### 6. Routing / loading

- Google Fonts continue to load via the route `head()` `links`.
- `portfolio.css` continues to load route-scoped via `head()` `links`, so it
  does not leak into other routes.

## Approach

- Work on a new branch off `main`.
- Big-bang refactor — single route, fixed visual target.
- Visual output preserved 1:1.

## Verification

- `pnpm build` succeeds (client + Nitro SSR bundles).
- SSR smoke test: `/` returns HTTP 200 with complete HTML, both stylesheets,
  the portrait preload, all CV data, and ARIA-correct accordion rows.
- `pnpm check` (Biome) stays green.
- Manual visual check of `/` against the pre-refactor page.
- The `hoverla-soft/li-banners` route and root shell are visually unchanged.

## Risks / notes

- `shadcn init` edits `src/styles.css` (adds its `@theme inline` mapping and a
  base layer). The default `:root` semantic tokens must stay neutral so other
  routes do not inherit the dark theme; only `.portfolio` overrides them.
- Tailwind v4 is CSS-first (no `tailwind.config.js`); shadcn v4 supports this.
- shadcn 4.7+ supports `package.json#imports`, so the existing `#/*` alias is
  usable directly in `components.json`.

## Out of scope

- Any visual/design change to the portfolio.
- Changes to other routes beyond confirming they are unaffected.
- The pre-existing unused-import TS warnings in `src/router.tsx`.
