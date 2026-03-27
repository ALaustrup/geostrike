"use client";

import { ChevronLeft, ChevronRight, Radio, Shield } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface HudStatusRailProps {
  collapsed: boolean;
  onToggle: () => void;
  online: boolean;
  pendingCount: number;
}

export function HudStatusRail({
  collapsed,
  onToggle,
  online,
  pendingCount,
}: HudStatusRailProps) {
  return (
    <aside
      className={cn(
        "flex h-full min-h-0 shrink-0 flex-col border-r border-border bg-card/95 shadow-[2px_0_24px_-12px_rgba(0,0,0,0.65)] backdrop-blur-sm transition-[width] duration-200 ease-out",
        collapsed ? "w-14" : "w-72 max-md:absolute max-md:inset-y-0 max-md:left-0 max-md:z-40",
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border px-2 py-3">
        {!collapsed && (
          <div className="min-w-0 pl-1">
            <p className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Field status
            </p>
            <p className="truncate text-xs font-semibold text-foreground">
              HUD telemetry
            </p>
          </div>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={onToggle}
          aria-label={collapsed ? "Expand status rail" : "Collapse status rail"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {!collapsed && (
        <>
          <div className="flex flex-wrap items-center gap-2 px-3 py-2">
            <Badge variant={online ? "success" : "outline"} className="gap-1">
              <Radio className="h-3 w-3" />
              {online ? "Sync" : "Vault"}
            </Badge>
            {pendingCount > 0 && (
              <Badge variant="default">Queue · {pendingCount}</Badge>
            )}
            <Badge variant="outline" className="gap-1 border-emerald-500/40">
              <Shield className="h-3 w-3 text-emerald-400" />
              Claim Guardian
            </Badge>
          </div>
          <Separator />
          <ScrollArea className="flex-1 px-3 py-3">
            <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
              Geofence alerts (haptic on supported devices) fire when approaching
              active claim boundaries. Breadcrumb heat map builds from GPS tracks
              — wire team devices to eliminate double-swing lanes.
            </p>
          </ScrollArea>
        </>
      )}
    </aside>
  );
}
