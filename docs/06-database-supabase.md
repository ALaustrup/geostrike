# 06 — Database (Supabase)

## Migrations

| File | Purpose |
|------|---------|
| `supabase/migrations/001_geostrike_bedrock.sql` | PostGIS, `mineral_category` enum, `users`, `geostrike_logs`, `geostrike_claims`, `geostrike_offline_queue`, spatial indexes, **`geostrike_push_log` RPC** |
| `supabase/migrations/002_expedition_os_extension.sql` | Commented optional tables (supplies, wiki, geofence events) — enable when productizing |

## Core tables

- **`geostrike_logs`**: `location` as **GEOGRAPHY(POINT,4326)**; GIST index for map queries.
- **`geostrike_claims`**: `boundary` **GEOMETRY(POLYGON,4326)** for official claim cache.
- **`users`**: Profile keyed to `auth.users`.

## RPC: `geostrike_push_log`

- **SECURITY DEFINER** — runs with definer rights; **`auth.uid()`** sets `user_id`.
- Inserts point with `ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography`.
- Grants: `authenticated`, `service_role`; revoked from `PUBLIC`.

## Row Level Security

**Not fully defined in migrations** — before production, add RLS policies for:

- `geostrike_logs` (read/write own rows)
- `geostrike_claims` (often read-only for all authenticated, or public read)
- `geostrike_offline_queue`

Use Supabase dashboard or additional migration SQL.

## Extensions

- **`postgis`** — required for geography/geometry columns.
