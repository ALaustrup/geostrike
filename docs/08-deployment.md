# 08 — Deployment

## GitHub

- Remote: [github.com/ALaustrup/geostrike](https://github.com/ALaustrup/geostrike)
- Default branch: **`main`**
- Commit author should use GitHub **noreply** email if “block push exposing email” is enabled.

## Vercel

- **Config**: `vercel.json` — framework Next.js, install/build commands.
- **CLI** (project linked locally): `npm run vercel:prod` → `vercel deploy --prod --yes`
- **Git integration**: Connecting the repo triggers deploys on push to `main` (when enabled in Vercel).

### Production checklist

1. Env vars set on Vercel (Mapbox + Supabase).
2. Supabase migrations applied to production project.
3. Mapbox token allows production hostname.
4. Smoke test: HUD loads, map tiles, Assay dialog opens, no console errors.

## Electron (optional)

- `npm run electron:dev` — runs Next dev + Electron loading `http://localhost:3000`.
- `electron/main.cjs` — enables **geolocation** permission for Chromium.

## Build

- `npm run build` — must pass locally and on Vercel.
- Node **`engines.node >= 20`** in `package.json` — Vercel uses compatible runtime.
