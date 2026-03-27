"use client";

import { useCallback, useRef, useState } from "react";
import type mapboxgl from "mapbox-gl";

import { DEFAULT_HUD_LAYERS, type HudMapLayerToggles } from "@/types/geostrike";

export function useMap() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [layers, setLayers] = useState<HudMapLayerToggles>(DEFAULT_HUD_LAYERS);

  const setLayer = useCallback(
    (key: keyof HudMapLayerToggles, value: boolean) => {
      setLayers((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return {
    mapRef,
    containerRef,
    layers,
    setLayer,
    setLayers,
  };
}
