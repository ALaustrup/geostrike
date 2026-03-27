"use client";

import { Layers } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MapLayerToggles } from "@/types/geostrike";

interface MapLayerToolbarProps {
  layers: MapLayerToggles;
  onChange: (next: MapLayerToggles) => void;
}

export function MapLayerToolbar({ layers, onChange }: MapLayerToolbarProps) {
  return (
    <div className="pointer-events-none absolute left-4 top-4 z-20 flex max-w-[calc(100%-2rem)] flex-wrap gap-2 md:left-6 md:top-6">
      <div className="pointer-events-auto flex items-center gap-2 rounded-md border border-border bg-card/95 px-2 py-1.5 shadow-lg backdrop-blur-sm">
        <Layers className="h-4 w-4 shrink-0 text-amber-400" aria-hidden />
        <span className="hidden font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:inline">
          Layers
        </span>
        <Button
          type="button"
          size="sm"
          variant={layers.officialClaims ? "default" : "outline"}
          className={cn("h-8 text-xs", !layers.officialClaims && "border-dashed")}
          onClick={() =>
            onChange({ ...layers, officialClaims: !layers.officialClaims })
          }
        >
          Official claims
        </Button>
        <Button
          type="button"
          size="sm"
          variant={layers.myLogs ? "default" : "outline"}
          className={cn("h-8 text-xs", !layers.myLogs && "border-dashed")}
          onClick={() => onChange({ ...layers, myLogs: !layers.myLogs })}
        >
          My logs
        </Button>
      </div>
    </div>
  );
}
