"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { vaultDb, type VaultLogRow } from "@/lib/dexieStore";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type SyncState = "idle" | "syncing" | "error";

export function useGeoSync() {
  // Must match SSR + first client paint: never read navigator.onLine in useState
  // (server has no navigator → true; client could be offline → false = hydration error).
  const [online, setOnline] = useState(true);
  const [syncState, setSyncState] = useState<SyncState>("idle");
  const [pendingCount, setPendingCount] = useState(0);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refreshPending = useCallback(async () => {
    const unsynced = await vaultDb.logs.filter((l) => !l.synced).count();
    setPendingCount(unsynced);
  }, []);

  useEffect(() => {
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  const pushVaultToSupabase = useCallback(async () => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase || !navigator.onLine) return;

    setSyncState("syncing");
    try {
      const unsynced = await vaultDb.logs.filter((l) => !l.synced).toArray();
      for (const row of unsynced) {
        const { error } = await supabase.rpc("geostrike_push_log", {
          p_lat: row.lat,
          p_lng: row.lng,
          p_elevation: row.elevation ?? null,
          p_mineral_type: row.mineralType,
          p_purity_estimate: row.purityEstimate ?? null,
          p_notes: row.notes ?? null,
          p_image_paths: row.imagePaths ?? [],
        });
        if (error) throw error;
        await vaultDb.logs.update(row.id, { synced: true });
      }
      setSyncState("idle");
    } catch {
      setSyncState("error");
    } finally {
      await refreshPending();
    }
  }, [refreshPending]);

  useEffect(() => {
    void refreshPending();
  }, [refreshPending]);

  useEffect(() => {
    if (online) void pushVaultToSupabase();
  }, [online, pushVaultToSupabase]);

  useEffect(() => {
    heartbeatRef.current = setInterval(() => {
      if (navigator.onLine) void pushVaultToSupabase();
    }, 45_000);
    return () => {
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    };
  }, [pushVaultToSupabase]);

  const saveLogLocally = useCallback(
    async (row: Omit<VaultLogRow, "id" | "createdAt" | "synced">) => {
      const id = crypto.randomUUID();
      const entry: VaultLogRow = {
        ...row,
        id,
        createdAt: Date.now(),
        synced: false,
      };
      await vaultDb.logs.add(entry);
      await vaultDb.offlineQueue.add({
        id,
        payload: { type: "log", ...row },
        createdAt: Date.now(),
        attempts: 0,
      });
      await refreshPending();
      if (navigator.onLine) void pushVaultToSupabase();
      return id;
    },
    [pushVaultToSupabase, refreshPending],
  );

  return {
    online,
    syncState,
    pendingCount,
    saveLogLocally,
    pushVaultToSupabase,
    refreshPending,
  };
}
