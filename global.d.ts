import type { Map as MapboxMap } from "mapbox-gl";

declare global {
  interface Window {
    /** Optional dev hook for map inspection (Electron / debugging). */
    __GEOSTRIKE_MAP__?: MapboxMap;
  }
}

export {};
