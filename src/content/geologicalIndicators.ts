/** Geological Indicators — "Gold-Seeker's Eyes" (copy + integration hooks). */

export interface IndicatorHalo {
  id: string;
  title: string;
  summary: string;
  dataSources: string;
}

export const GEOLOGICAL_INDICATORS: IndicatorHalo[] = [
  {
    id: "gossan",
    title: "Iron staining (gossans)",
    summary:
      "Red/yellow rusty soil from oxidizing sulfides — often pathfinder terrain upstream of gold.",
    dataSources:
      "Regional geology rasters, hyperspectral where licensed; local samples calibrate halos.",
  },
  {
    id: "quartz",
    title: "Quartz vein outcrops",
    summary:
      "Buck quartz vs mineralized quartz — vuggy, stained, sulfide-specked quartz hosts free gold.",
    dataSources:
      "Outcrop mapping, drone photogrammetry, field photos tied to GPS in Digital Assay Book.",
  },
  {
    id: "blacksand",
    title: "Black sand accumulations",
    summary:
      "Magnetite / hematite lag in riverbeds — heavy fraction pathfinders for placer pay streaks.",
    dataSources:
      "Magnetic anomaly surveys (ground / drone), stream-sediment grids, pan concentrates.",
  },
];
