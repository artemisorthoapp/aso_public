# Artemis — public marketing site (`aso_public`)

Marketing site for the Artemis orthodontic practice dashboard. Static site built
with **Astro + Tailwind v4**, deployed to **Cloudflare Pages**.

## Stack

- **Astro 5** — file-based routing, ships ~zero JS for these content pages.
- **Tailwind v4** via `@tailwindcss/vite` — CSS-first theme in `src/styles/global.css`
  (brand tokens mirror the dashboard: primary `#67A4A1`, accent `#69C9CC`, ink `#1B1A22`).
- **Static output** (`dist/`) — no server runtime needed.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run preview    # serve the built dist/ locally
```

Requires Node 18.20+ / 20.3+ / 22+.

## Structure

```
src/
├── layouts/Base.astro       # html shell, SEO meta, Inter font, Nav + Footer
├── components/Nav.astro, Footer.astro
├── pages/
│   ├── index.astro          # landing
│   ├── features.astro       # the 5 verbs (Today/People/Growth/Money/Operations)
│   ├── pricing.astro        # tiers + FAQ
│   ├── about.astro
│   └── signup.astro         # trial lead form
└── styles/global.css        # Tailwind import + @theme brand tokens + .btn helpers
public/                      # favicon + static assets
```

Add a page by dropping a `.astro` file in `src/pages/` — the route follows the filename.

## Deploy — Cloudflare Pages

Connect the repo in the Cloudflare dashboard (Workers & Pages → Create → Pages →
connect to Git) with:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Production branch:** `main`

Cloudflare auto-builds on push and gives every branch/PR a preview URL. No adapter
is needed — the site is fully static.

## Forms / backend (TODO)

`signup.astro` currently hands off to the dashboard app's signup. To capture
leads on this site instead, wire the form `action` to a **Cloudflare Pages
Function** (`functions/api/trial.js`) or a form provider (Formspree/HubSpot).
