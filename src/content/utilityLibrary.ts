/** Utility & Supply Library — searchable recovery tooling (static seed data). */

export interface UtilityRow {
  category: string;
  primaryUtility: string;
  geoStrikeProTip: string;
}

export const UTILITY_LIBRARY: UtilityRow[] = [
  {
    category: "Classifiers",
    primaryUtility:
      'Screens out large rocks to focus on "pay dirt."',
    geoStrikeProTip:
      'Always classify down to 1/8" before panning to increase speed by 400%.',
  },
  {
    category: "Sluice Boxes",
    primaryUtility:
      'Uses water flow to trap heavy gold in "rifles."',
    geoStrikeProTip:
      'Set at a 7–11° angle. Use V-Matting at the head to catch fine flour gold instantly.',
  },
  {
    category: "Highbankers",
    primaryUtility:
      "Portable wash plant that pumps its own water.",
    geoStrikeProTip:
      'Best for bench deposits (old river levels) far from the current waterline.',
  },
  {
    category: "Trommels",
    primaryUtility: "Rotating drums that scrub clay off gold.",
    geoStrikeProTip:
      'Essential for sticky clay regions where gold gets robbed by mud balls.',
  },
  {
    category: "Blue Bowls",
    primaryUtility: "Centrifugal water tool for fine gold.",
    geoStrikeProTip:
      'Use a drop of Jet Dry (surfactant) to stop fine gold from floating on surface tension.',
  },
];
