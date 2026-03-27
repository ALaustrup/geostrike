# 05 — Offline Vault and sync

## Dexie (`src/lib/dexieStore.ts`)

- Database name: **`geostrike_vault`**.
- **Tables**:
  - **`logs`** — `VaultLogRow`: local field entries (`id`, `lat`, `lng`, `mineralType`, `synced`, …).
  - **`offlineQueue`** — queued payloads for retry (paired with server queue conceptually).

Indexes: `logs` by `id`, `userId`, `synced`, `createdAt`; `offlineQueue` by `id`, `createdAt`.

## useGeoSync (`src/hooks/useGeoSync.ts`)

Behavior:

1. **`online`**: Starts `true` for SSR/hydration safety; updated in `useEffect` from `navigator.onLine` + `online`/`offline` events.
2. **`pendingCount`**: Count of `logs` where `synced === false`.
3. **`pushVaultToSupabase`**: If Supabase client exists and browser is online, loads unsynced logs, calls **`geostrike_push_log`** RPC per row, marks row `synced` on success.
4. **Heartbeat**: Interval (~45s) triggers push when online.
5. **`saveLogLocally`**: Writes to Dexie + offline queue row, refreshes pending, attempts push if online.

## Supabase client (`src/lib/supabase/client.ts`)

- Uses **`createBrowserClient`** from `@supabase/ssr` when `NEXT_PUBLIC_SUPABASE_URL` and **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** are set; otherwise returns **`null`** (local-only mode).

## Failure modes

- RPC errors set internal **`syncState`** to `error` — UX surfacing can be extended (toast, rail badge).
- Without auth session, **`auth.uid()`** in RPC may be null — ensure RLS policies match your product rules.

## Service worker

- `public/sw.js` — minimal install/activate; **`ServiceWorkerRegister`** registers in **production** only.
