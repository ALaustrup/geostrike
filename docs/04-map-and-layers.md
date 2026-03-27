# 04 — Map and layers

## Environment

- **`NEXT_PUBLIC_MAPBOX_TOKEN`** — Public Mapbox token (`pk.`…). Required for live map; without it, `StrikeMap` shows a placeholder grid and instructions.
- Restrict token URLs in [Mapbox account settings](https://account.mapbox.com/) to `localhost` and your **Vercel** domains.

## StrikeMap (`src/components/map/StrikeMap.tsx`)

- Initializes **Mapbox GL** with `satellite-streets-v12`, **3D terrain** via `mapbox-dem` raster-dem source, `setTerrain` with exaggeration.
- **Resize**: `resize` on window `resize`, `ResizeObserver` on container, and once on `load` — required when parent is flex/absolute.
- **Cleanup**: removes map on unmount; clears `window.__GEOSTRIKE_MAP__` if set (debug hook).

## HUD layer toggles

Types live in `src/types/geostrike.ts` as **`HudMapLayerToggles`** with **`DEFAULT_HUD_LAYERS`**.

| Toggle key | Product meaning | Planned Mapbox layer id (in code) |
|------------|-----------------|-------------------------------------|
| `claimBoundaries` | BLM/state claim polygons | `geostrike-claims-fill` |
| `breadcrumbHeatmap` | Team search coverage | `geostrike-breadcrumb-heat` |
| `contactZones` | Lithology contacts | `geostrike-contacts-line` |
| `faultLines` | Fault traces | `geostrike-faults-line` |
| `stratigraphyOverlay` | Stratigraphy / DEM emphasis | `geostrike-strata-raster` |
| `indicatorHalos` | Gossan / quartz / black sand | `geostrike-halos-fill` |

When `map.getLayer(layerId)` exists, visibility is set to `visible` / `none`. **Until sources and layers are added** to the style, toggles are no-ops (safe).

## Adding real data

1. After `map` `load`, `addSource` (GeoJSON URL or vector tiles) and `addLayer` with ids matching **`HUD_LAYER_BINDINGS`** in `StrikeMap.tsx` (or update that map to match your ids).
2. For **PostGIS** → serve GeoJSON or vector tiles from **Next Route Handlers** or **Supabase** — keep CORS and auth in mind.
3. **Claim Guardian**: polygon intersection with user point → server or edge function; optional push notification / Electron bridge for haptics.

## Electron

`electron/main.cjs` sets **`setPermissionRequestHandler`** for **geolocation** so `getCurrentPosition` works when wrapped.
