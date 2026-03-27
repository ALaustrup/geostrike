# 11 — Roadmap (integration backlog)

Prioritized engineering tasks to fully realize the product vision:

## Map & data

1. **Ingest BLM/MLRS or state claim GeoJSON** into `geostrike_claims` + tile or GeoJSON source in Mapbox (`geostrike-claims-fill`).
2. **Team GPS tracks** → PostGIS `LineString` / heat raster → `geostrike-breadcrumb-heat` layer.
3. **Regional geology / faults** — USGS or state WMS/vector endpoints (license permitting).
4. **Indicator rasters** — gossan/quartz/black sand scoring from public datasets or your models.

## Claim Guardian

1. Server **proximity check** (point-in-polygon / distance to claim edge).
2. **Push or in-app alert**; **Electron** or Capacitor for **haptic** on mobile.

## Assay & media

1. **Supabase Storage** bucket for high-res photos; link URLs in `image_paths`.
2. **Weight** and **depth** fields on logs (partially typed in `GeoStrikeLogInput`).

## Expedition OS tables

1. Uncomment / implement `002_expedition_os_extension.sql` tables; CRUD UI for supplies and wiki.

## Legal

1. **County recorder** deep links (jurisdiction-specific) behind feature flags.
2. **Regulation feed** (RSS/API) with cached effective dates and map overlays.

## Hardening

1. **E2E tests** (Playwright) for HUD navigation and Assay happy path.
2. **Error boundaries** around map and sync.
