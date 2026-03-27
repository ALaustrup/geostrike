"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { useGeoSync } from "@/hooks/useGeoSync";
import type { MapLayerToggles } from "@/types/geostrike";

import { LogHistorySidebar } from "./LogHistorySidebar";
import { MapLayerToolbar } from "./MapLayerToolbar";
import { QuickLogFab } from "./QuickLogFab";

const StrikeMap = dynamic(
  () =>
    import("@/components/map/StrikeMap").then((mod) => mod.StrikeMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-full border-2 border-amber-500/40 border-t-amber-400" />
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Loading map…
          </p>
        </div>
      </div>
    ),
  },
);

export function GeoStrikeDashboard() {
  const { online, pendingCount, saveLogLocally } = useGeoSync();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [layers, setLayers] = useState<MapLayerToggles>({
    officialClaims: true,
    myLogs: true,
  });

  return (
    <div className="flex h-[100dvh] min-h-0 w-full overflow-hidden bg-background">
      <LogHistorySidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
        online={online}
        pendingCount={pendingCount}
      />
      <main className="relative isolate flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="relative min-h-0 min-w-0 flex-1">
          <MapLayerToolbar layers={layers} onChange={setLayers} />
          <StrikeMap layers={layers} className="absolute inset-0" />
        </div>
      </main>
      <QuickLogFab saveLogLocally={saveLogLocally} online={online} />
    </div>
  );
}
