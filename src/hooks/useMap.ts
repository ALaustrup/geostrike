"use client";

import { useCallback, useRef, useState } from "react";
import type mapboxgl from "mapbox-gl";

import type { MapLayerToggles } from "@/types/geostrike";

export function useMap() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [layers, setLayers] = useState<MapLayerToggles>({
    officialClaims: true,
    myLogs: true,
  });

  const setLayer = useCallback(
    (key: keyof MapLayerToggles, value: boolean) => {
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
