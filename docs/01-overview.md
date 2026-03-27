# 01 — Overview

## Vision

GeoStrike is an **Expedition & Mining OS**: a map-first, minimal HUD for **gold-seeking teams** that bridges **regional geological intelligence** and **field execution**. It emphasizes:

- **Sunlight-readable** UI (contrast toggle) and **large touch targets** for one-handed use.
- **Coverage discipline** (breadcrumb / heat map mental model) to avoid redundant detector passes.
- **Claim awareness** (Claim Guardian — boundaries and future geofence alerts).
- **Offline-first** capture (Dexie Vault) with **cloud sync** when online (Supabase).

## Glossary

| Term | Meaning |
|------|---------|
| **HUD** | Heads-Up Display — the main map-centric interface (`/`) |
| **Vault** | Local IndexedDB store (Dexie) for logs when offline or before sync |
| **Digital Assay Book** | Field log flow (FAB) — GPS, mineral context, notes; photos via Storage later |
| **Claim Guardian** | Product concept: warn near active claim boundaries (data + UX hooks) |
| **Indicator halos** | Regional signals (gossans, quartz, black sand) — knowledge UI + future rasters |

## Non-goals (current codebase)

- GeoStrike does **not** provide legal advice, claim validity, or filing services by itself.
- **No automated BLM/MLRS scrape** in-repo; ingest pipelines are **your** responsibility and must respect ToS.
- **Haptic / native geofence** on web is limited; full behavior targets **Electron** or native shells.

## Compliance

Verify **claims, permits, land status, and environmental rules** with agencies and counsel before operating. The **Legal** screen documents planned integrations only.
