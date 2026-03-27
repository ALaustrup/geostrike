"use client";

import { Layers } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { HudMapLayerToggles } from "@/types/geostrike";

const LAYER_CONFIG: {
  key: keyof HudMapLayerToggles;
  label: string;
  hint: string;
}[] = [
  {
    key: "claimBoundaries",
    label: "Claims",
    hint: "Claim Guardian — BLM / state boundaries",
  },
  {
    key: "breadcrumbHeatmap",
    label: "Coverage",
    hint: "Breadcrumb heat map — searched ground",
  },
  {
    key: "contactZones",
    label: "Contacts",
    hint: "Lithology contact zones",
  },
  {
    key: "faultLines",
    label: "Faults",
    hint: "Structural traces",
  },
  {
    key: "stratigraphyOverlay",
    label: "Strata",
    hint: "Live stratigraphy / 3D terrain emphasis",
  },
  {
    key: "indicatorHalos",
    label: "Halos",
    hint: "Iron stain, quartz, black sand indicators",
  },
];

interface HudMapLayersProps {
  layers: HudMapLayerToggles;
  onChange: (next: HudMapLayerToggles) => void;
}

export function HudMapLayers({ layers, onChange }: HudMapLayersProps) {
  return (
    <div className="pointer-events-none absolute left-2 right-2 top-2 z-20 flex max-h-[40vh] flex-col gap-2 md:left-4 md:right-auto md:max-h-none md:max-w-[min(100%,28rem)]">
      <div className="pointer-events-auto max-h-full overflow-y-auto rounded-lg border border-border bg-card/95 p-2 shadow-xl backdrop-blur-sm md:overflow-visible">
        <div className="mb-2 flex items-center gap-2 border-b border-border pb-2">
          <Layers className="h-4 w-4 shrink-0 text-amber-400" aria-hidden />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            HUD layers
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {LAYER_CONFIG.map(({ key, label, hint }) => (
            <Button
              key={key}
              type="button"
              size="sm"
              title={hint}
              variant={layers[key] ? "default" : "outline"}
              className={cn(
                "h-9 min-h-[44px] min-w-[4.5rem] px-2 text-[11px] font-semibold",
                !layers[key] && "border-dashed opacity-90",
              )}
              onClick={() => onChange({ ...layers, [key]: !layers[key] })}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
