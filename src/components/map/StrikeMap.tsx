"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { cn } from "@/lib/utils";
import type { HudMapLayerToggles } from "@/types/geostrike";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

/** Mapbox layer IDs to wire when GeoJSON/raster sources are loaded (Claim Guardian, breadcrumbs, etc.). */
const HUD_LAYER_BINDINGS: Partial<
  Record<keyof HudMapLayerToggles, string>
> = {
  claimBoundaries: "geostrike-claims-fill",
  breadcrumbHeatmap: "geostrike-breadcrumb-heat",
  contactZones: "geostrike-contacts-line",
  faultLines: "geostrike-faults-line",
  stratigraphyOverlay: "geostrike-strata-raster",
  indicatorHalos: "geostrike-halos-fill",
};

export interface StrikeMapProps {
  className?: string;
  layers: HudMapLayerToggles;
}

/**
 * Mapbox GL HUD — satellite + 3D terrain. Layer toggles bind to sources as they are onboarded.
 */
export function StrikeMap({ className, layers }: StrikeMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || !TOKEN) return;

    mapboxgl.accessToken = TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [-115.5, 39.5],
      zoom: 9,
      pitch: 55,
      bearing: -12,
      antialias: true,
    });

    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");

    map.on("load", () => {
      if (!map.getSource("mapbox-dem")) {
        map.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
      }
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.25 });
    });

    mapRef.current = map;
    if (typeof window !== "undefined") {
      window.__GEOSTRIKE_MAP__ = map;
    }

    const onResize = () => {
      map.resize();
    };
    window.addEventListener("resize", onResize);
    map.once("load", () => {
      map.resize();
    });

    const container = containerRef.current;
    const ro =
      typeof ResizeObserver !== "undefined" && container
        ? new ResizeObserver(() => {
            map.resize();
          })
        : null;
    if (container && ro) ro.observe(container);

    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", onResize);
      map.remove();
      mapRef.current = null;
      if (typeof window !== "undefined") {
        delete window.__GEOSTRIKE_MAP__;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;
    try {
      (Object.entries(HUD_LAYER_BINDINGS) as [keyof HudMapLayerToggles, string][]).forEach(
        ([key, layerId]) => {
          if (map.getLayer(layerId)) {
            map.setLayoutProperty(
              layerId,
              "visibility",
              layers[key] ? "visible" : "none",
            );
          }
        },
      );
    } catch {
      /* layers not yet added */
    }
  }, [layers]);

  if (!TOKEN) {
    return (
      <div
        className={cn(
          "relative flex min-h-0 w-full flex-col items-center justify-center overflow-hidden bg-slate-950",
          className,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(148 163 184 / 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.35) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <p className="relative z-10 max-w-md px-6 text-center font-mono text-xs text-slate-400">
          Set{" "}
          <code className="text-amber-400">NEXT_PUBLIC_MAPBOX_TOKEN</code> to
          enable the Strike Map (Mapbox GL JS + 3D terrain).
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative min-h-0 w-full min-w-0 overflow-hidden bg-slate-950 [&_.mapboxgl-ctrl]:font-sans",
        className,
      )}
      role="application"
      aria-label="GeoStrike map"
    />
  );
}
