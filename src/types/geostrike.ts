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
}

export interface MapLayerToggles {
  officialClaims: boolean;
  myLogs: boolean;
}
