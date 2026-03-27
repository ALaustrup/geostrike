import Dexie, { type Table } from "dexie";

import type { MineralCategory } from "@/types/geostrike";

/** Local-first log row before Supabase insert */
export interface VaultLogRow {
  id: string;
  userId?: string;
  lat: number;
  lng: number;
  elevation?: number;
  mineralType: MineralCategory;
  purityEstimate?: number;
  notes?: string;
  imagePaths?: string[];
  createdAt: number;
  synced: boolean;
}

/** Queued payload when offline or sync failed */
export interface OfflineQueueRow {
  id: string;
  payload: Record<string, unknown>;
  createdAt: number;
  attempts: number;
}

class GeoStrikeVault extends Dexie {
  logs!: Table<VaultLogRow, string>;
  offlineQueue!: Table<OfflineQueueRow, string>;

  constructor() {
    super("geostrike_vault");
    this.version(1).stores({
      logs: "id, userId, synced, createdAt",
      offlineQueue: "id, createdAt",
    });
  }
}

export const vaultDb = new GeoStrikeVault();
