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

## Deploy — Cloudflare Pages (free tier)

Connect the repo in the Cloudflare dashboard (Workers & Pages → Create → Pages →
connect to Git). Settings (also captured in `wrangler.toml`):

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Production branch:** `main`

Cloudflare auto-builds on push and gives every branch/PR a preview URL. Static
assets are unlimited on the free plan; the one Function below runs on the
Workers free plan (100k req/day) — far beyond a marketing form's needs. No
adapter is needed (static output).

## Forms — signup lead capture (Pages Function)

`signup.astro` POSTs to `functions/api/trial.js` (route `POST /api/trial`). The
Function validates the submission (with a honeypot for spam), optionally
forwards the lead to a webhook, then 303-redirects the visitor to the dashboard
app to finish account creation (email + plan prefilled).

Optional Pages **environment variables** (Settings → Variables — both optional):

| Var | Effect |
|---|---|
| `LEAD_WEBHOOK_URL` | If set, the lead JSON is POSTed here (Slack / Make / Zapier / CRM). |
| `APP_SIGNUP_URL` | Override the app signup hand-off (default `https://artemissmiles.artemisorthoapp.com/signup`). |

The form works with **no** variables set and **without JavaScript** (plain form
POST → redirect). Test the Function locally:

```bash
npm run build
npx wrangler pages dev dist   # serves site + functions at http://localhost:8788
```
