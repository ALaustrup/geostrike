# GeoStrike — Expedition & Mining OS

GeoStrike is a **high-performance, minimal-interface operating system** for gold-seeking teams. It connects **raw geological intelligence** with **boots-on-the-ground execution**: map-centric HUD, expedition logistics, recovery playbooks, and an offline-first Vault.

## Product pillars

| Module | Role |
|--------|------|
| **HUD (Heads-Up Display)** | Gesture-friendly, map-first UI tuned for **sunlight** and **one-handed** use (toggle “sunlight” contrast in the header). |
| **Live stratigraphy & structure** | Toggles for **contact zones**, **fault lines**, and **stratigraphy** overlays — bind Mapbox layers as PostGIS / GeoJSON sources land. |
| **Breadcrumb precision** | **Coverage heat map** of searched ground — reduces double-swinging detectors and enforces full lane coverage. |
| **Claim Guardian** | **BLM / state claim boundaries** — geofence + haptic alert hooks as native/Electron layers land. |
| **Expedition Log** | **Supply Sync**, **Item Wiki**, **Digital Assay Book** (FAB on the HUD). |
| **Knowledgebase** | Indicator halos (gossans, quartz, black sand) + **Utility & Supply Library** (classifiers → blue bowls). |
| **Smart Recovery** | Placer hydraulic logic, hard-rock g/t mindset, Borax smelting guide (mercury-free). |
| **Legal & regional** | Placeholders for county filing deep links and regulation feeds (implement with counsel). |

## Stack

- **Next.js 14** (App Router) · **TypeScript** · **Tailwind** · Radix/shadcn-style UI  
- **Mapbox GL JS** — 3D terrain + satellite HUD  
- **Dexie (IndexedDB)** — Vault + sync manager  
- **Supabase** — PostgreSQL / Auth / Storage (schema under `supabase/migrations/`)  
- **Vercel** — `vercel.json` + `npm run vercel:prod`  
- **Electron** — `electron/main.cjs` for desktop shell  

## Routes

| Path | Screen |
|------|--------|
| `/` | Map HUD + layers + status rail + Assay FAB |
| `/expedition` | Supply sync, wiki, Digital Assay Book copy |
| `/knowledge` | Geological indicators + utility table |
| `/recovery` | Smart Recovery assistant |
| `/legal` | Legal & regional integration placeholders |

## Setup

```bash
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_MAPBOX_TOKEN (and Supabase keys when used)
npm run dev
```

## Deploy

```bash
npm run vercel:prod
```

Set the same `NEXT_PUBLIC_*` variables in the Vercel project. Mapbox URL restrictions should include your `*.vercel.app` host.

## Repo

GitHub: [github.com/ALaustrup/geostrike](https://github.com/ALaustrup/geostrike)  

---

GeoStrike is not legal or investment advice. Verify claims, permits, and environmental rules with qualified professionals and agencies before field work.
