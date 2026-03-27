# 09 — Content modules

Static, typed seed data lives under **`src/content/`** — swap for CMS or Supabase queries later.

| Module | File | Consumed by |
|--------|------|-------------|
| Expedition seeds | `expedition.ts` | `/expedition` |
| Geological indicators | `geologicalIndicators.ts` | `/knowledge` |
| Utility library | `utilityLibrary.ts` | `/knowledge` (table) |
| Recovery guides | `recoveryGuides.ts` | `/recovery` |

## Product screens (summary)

- **Expedition**: Supply list + wiki cards + Digital Assay Book description — FAB on HUD performs actual capture.
- **Knowledge**: Three indicator cards + full utility table (classifiers → blue bowls).
- **Recovery**: Placer, lode, Borax step lists.
- **Legal**: County clerk + regulations **placeholders** — implement with legal review.

## Extending

- Add **image uploads** to Assay flow → Supabase Storage bucket + `image_paths` on logs.
- Replace seed arrays with **React Server Components** + `fetch` to Supabase when tables exist.
