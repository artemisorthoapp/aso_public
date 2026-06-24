# Artemis Ortho App — real dashboard UI frames

Pixel-accurate captures of the **actual** Artemis dashboard interface, for the
design agent to replace the marketing-site mockups with the real UI.

Captured 2026-06-24 at 1440×900 (full-page), from the live React app.

## Frames
- `01-today.jpeg` — **Today** (the briefing): 5-verb sidebar, top bar, briefing
  cards, "Practice vitals" KPI tiles, schedule.
- `02-people.jpeg` — **People** (treatment funnel): stage rows with progress
  bars, tabbed sub-nav, AI "how are we doing" summary, KPI chips.
- `03-growth.jpeg` — **Growth** (channel scoreboard / leads / SEO / social).
- `04-money.jpeg` — **Money** (cash flow): fiscal-year selector, AI summary,
  case-value / insurance-mix / adjustments cards, AR row.
- `05-operations.jpeg` — **Operations** (team + schedule).

## ⚠️ About the data (read this)
These are the real **UI / layout / components / type / color**, but the
underlying tenant is an **empty synthetic sandbox** (a non-production test
practice with zero records), so every metric reads `0` / `$0` and the AI
summaries say "no data yet." **The numbers/labels are placeholders — populate
them with your own realistic demo data.** No real patient information appears in
any frame (the capture was scoped to the empty test tenant; there is no PHI
here).

Branding shows "Artemis Smiles" (the default practice logo) and the signed-in
user's first name ("Dr. Bennie") — swap both for whatever the hero should show.
