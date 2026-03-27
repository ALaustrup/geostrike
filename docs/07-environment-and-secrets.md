# 07 — Environment and secrets

## Local development

Copy **`.env.example`** → **`.env.local`** (gitignored).

| Variable | Required | Notes |
|----------|----------|--------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | For map | Public `pk.` token; never put secret server keys in `NEXT_PUBLIC_*` |
| `NEXT_PUBLIC_SUPABASE_URL` | For cloud sync | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For cloud sync | Anon key — still treat as client-exposed; RLS must protect data |

## Vercel

Project → **Settings → Environment Variables**: mirror the same keys for **Production**, **Preview**, and **Development** as needed.

After changing env vars, **redeploy** so Next.js embeds new `NEXT_PUBLIC_*` values at build time.

## Security practices

- Do **not** commit `.env.local`.
- Use **Mapbox URL restrictions** on tokens.
- Use **Supabase RLS** for all user-specific tables.
- For server-only secrets (future API routes), use **non-**`NEXT_PUBLIC_` vars and read them only in **server** code.
