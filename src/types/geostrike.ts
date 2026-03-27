/** GeoStrike — Expedition & Mining OS domain types */

export type MineralCategory =
  | "Gold"
  | "Quartz"
  | "Silver"
  | "Copper"
  | "Black Sand"
  | "Other";

export type ClaimStatus = "Active" | "Closed" | "Pending";

export interface GeoStrikeLogInput {
  lat: number;
  lng: number;
  elevation?: number;
  mineralType: MineralCategory;
  purityEstimate?: number;
  notes?: string;
  imagePaths?: string[];
  /** Digital Assay Book — optional find metadata */
  weightGrams?: number;
  depthMeters?: number;
}

/**
 * HUD map overlays — toggles drive future Mapbox layers / PostGIS feeds.
 * Wire sources: stratigraphy DEM, team GeoJSON, BLM/MLRS claims, breadcrumb heatmap.
 */
export interface HudMapLayerToggles {
  /** BLM / state claim boundaries — Claim Guardian geofence source */
  claimBoundaries: boolean;
  /** Team search coverage — anti double-swing heat map */
  breadcrumbHeatmap: boolean;
  /** Contact zones — lithology contacts (GeoJSON / regional geology service) */
  contactZones: boolean;
  /** Fault traces — structural nurseries for gold */
  faultLines: boolean;
  /** Live stratigraphy / DEM overlay (3D terrain emphasis) */
  stratigraphyOverlay: boolean;
  /** Indicator halos — iron stain, quartz, black sand (raster or vector) */
  indicatorHalos: boolean;
}

export const DEFAULT_HUD_LAYERS: HudMapLayerToggles = {
  claimBoundaries: true,
  breadcrumbHeatmap: true,
  contactZones: false,
  faultLines: true,
  stratigraphyOverlay: true,
  indicatorHalos: false,
};

export type HudRoute =
  | "/"
  | "/expedition"
  | "/knowledge"
  | "/recovery"
  | "/legal";
