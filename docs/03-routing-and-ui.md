# 03 — Routing and UI

## Routes

| URL | File | Purpose |
|-----|------|---------|
| `/` | `src/app/(hud)/page.tsx` | Map HUD — `MapHudView` |
| `/expedition` | `src/app/(hud)/expedition/page.tsx` | Supply sync, wiki, Digital Assay Book copy |
| `/knowledge` | `src/app/(hud)/knowledge/page.tsx` | Geological indicators + utility table |
| `/recovery` | `src/app/(hud)/recovery/page.tsx` | Smart Recovery guides |
| `/legal` | `src/app/(hud)/legal/page.tsx` | Legal / regional placeholders |

The route group `(hud)` does not appear in the URL. All these pages use `src/app/(hud)/layout.tsx`, which renders **`HudShell`**.

## HudShell (`src/components/hud/HudShell.tsx`)

- **Header**: Brand line “GeoStrike” / “Expedition & Mining OS”, **sunlight toggle** (adds `html.hud-sunlit` + `localStorage` key `geostrike-sunlit`).
- **Main**: Scrollable or full-bleed child (map fills available height).
- **Bottom navigation**: Links to `/`, `/expedition`, `/knowledge`, `/recovery`, `/legal` — active state from `usePathname()`.

## Map view (`MapHudView`)

- **`HudStatusRail`**: Collapsible left rail — sync/Vault badges, Claim Guardian messaging.
- **`HudMapLayers`**: Scrollable panel of layer toggles (see [04-map-and-layers.md](./04-map-and-layers.md)).
- **`StrikeMap`**: Full-bleed map (`absolute inset-0`).
- **`QuickLogFab`**: Fixed FAB — Digital Assay Book entry.

## Root layout

- `src/app/layout.tsx`: Fonts (Inter, Roboto Mono), `ServiceWorkerRegister`, global metadata.
- Global styles: `src/app/globals.css` — design tokens, `hud-sunlit` overrides.

## Metadata

- Root `metadata.title` uses a **template** (`%s | GeoStrike`).
- Per-route `metadata` is exported from several `(hud)/*/page.tsx` files for document titles.
