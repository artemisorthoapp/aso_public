# Artemis Ortho App — real dashboard UI frames

Pixel-accurate captures of the **actual** Artemis dashboard interface, for the
design agent to replace the marketing-site mockups with the real UI. Captured
2026-06-24 at 1440×900 (full-page), from the live React app, signed in to a
**synthetic, PHI-free sandbox tenant** seeded with realistic demo data.

## ⚠️ Data & safety
- This is the real **UI / layout / components / type / color**. The tenant is a
  non-production test practice seeded with **invented** patients and numbers
  (no real patient information appears anywhere — there is no PHI here).
- Names like "Aiden Barnes" / "Dr. Bennie" and all figures are **placeholders** —
  swap them for whatever the hero should show. Branding shows "Artemis Smiles".

## `gallery/` — 30 feature screens
Full-page captures across the whole product. Highlights (see `_manifest.txt` for
the full path map):
- Verbs: `01-today`, `02-people-funnel`, `08-growth`, `16-money`, `19-operations`
- **Social / Instagram reels**: `09-growth-social-reels` (Social Planner +
  Content Generation, platform connects, content calendar)
- **Insurance check**: `06-people-insurance-check` (Form Submissions /
  Eligibility Check / Claims)
- **Inventory**: `20-operations-inventory`
- **Photos upload**: `26-photos-upload` (records upload)
- **Snap / Canva poster**: `28-snap-canva` (patient picker → Canva design step)
- **Direct mail**, **Blog campaign** (`12`), **SEO** (`11`), **Scheduling**
  (`03`), **Communication** (`04`), **Cases** (`05`), **Patients** (`07`),
  **Financials** (`17`), **QuickBooks/Expenses** (`18`), **Training** (`21`),
  **Payroll** (`22`), **Employee reviews** (`23`), **Automations / Job schedules**
  (`25`), **Settings** (`29`), and more.

Some feature pages render as their real **empty / connect-an-account** state
(e.g. insurance has no submissions, social platforms show "connect") — that's the
genuine first-run UI; populate as needed.

## Scroll-through assets (for the Apple-style scrubbed hero)
- `walkthrough.webm` — headless screen recording scrolling through all five verbs
  (1440×900, VP8; re-encode to mp4 for broader playback).
- `today-scrub/frame-000.jpg … frame-026.jpg` — 27 evenly-spaced frames of the
  **Today** page scrolling top→bottom, populated. Drive a scroll-scrub by mapping
  scroll position → frame index.
