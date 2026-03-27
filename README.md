# GeoStrike

Mining intelligence and geospatial logging: Next.js 14 (App Router), Mapbox GL, Dexie offline vault, Supabase-ready schema.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_MAPBOX_TOKEN` (and Supabase keys when used).

## GitHub

This repository is initialized on branch `main`. To connect it to GitHub:

1. On [GitHub](https://github.com/new), create a **new empty repository** (e.g. `GeoStrike`). Do **not** add a README, `.gitignore`, or license (this repo already has them).

2. Add the remote and push:

```bash
cd /path/to/GeoStrike
git remote add origin https://github.com/YOUR_USERNAME/GeoStrike.git
git push -u origin main
```

Use SSH if you prefer: `git@github.com:YOUR_USERNAME/GeoStrike.git`

### GitHub CLI (optional)

If you install the [GitHub CLI](https://cli.github.com/) (`gh`) and run `gh auth login`, you can create and push in one step:

```bash
gh repo create GeoStrike --private --source=. --remote=origin --push
```

## Deploy on Vercel

See `package.json` scripts `vercel:login`, `vercel:link`, `vercel:prod`. Set the same `NEXT_PUBLIC_*` variables in the Vercel project settings.
