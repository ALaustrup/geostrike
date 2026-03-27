"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { QuickLogFab } from "@/components/dashboard/QuickLogFab";
import { useGeoSync } from "@/hooks/useGeoSync";
import { DEFAULT_HUD_LAYERS, type HudMapLayerToggles } from "@/types/geostrike";

import { HudMapLayers } from "./HudMapLayers";
import { HudStatusRail } from "./HudStatusRail";

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
            Initializing HUD…
          </p>
        </div>
      </div>
    ),
  },
);

export function MapHudView() {
  const { online, pendingCount, saveLogLocally } = useGeoSync();
  const [railCollapsed, setRailCollapsed] = useState(false);
  const [layers, setLayers] = useState<HudMapLayerToggles>(DEFAULT_HUD_LAYERS);

  return (
    <div className="flex h-full min-h-0 w-full overflow-hidden bg-background">
      <HudStatusRail
        collapsed={railCollapsed}
        onToggle={() => setRailCollapsed((c) => !c)}
        online={online}
        pendingCount={pendingCount}
      />
      <div className="relative min-h-0 min-w-0 flex-1">
        <HudMapLayers layers={layers} onChange={setLayers} />
        <StrikeMap layers={layers} className="absolute inset-0" />
        <QuickLogFab saveLogLocally={saveLogLocally} online={online} />
      </div>
    </div>
  );
}
