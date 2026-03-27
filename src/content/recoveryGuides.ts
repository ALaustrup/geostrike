/** Smart Recovery Assistant — deposit-type playbooks. */

export interface RecoveryGuide {
  id: string;
  title: string;
  tagline: string;
  steps: string[];
}

export const PLACER_GUIDE: RecoveryGuide = {
  id: "placer",
  title: "Placer deposits (river gold)",
  tagline: "Hydraulic logic — where flood energy dropped heavies.",
  steps: [
    "Work inside bends where energy dropped — pay streaks hug the inner curve toe.",
    "Behind large obstructions — eddies trap gold in low-pressure pockets.",
    "Leading edge of gravel bars — new flood overtops deposit fresh lag on the upstream lip.",
    "Classify to 1/8\" before panning; sample vertically through bar stratigraphy.",
  ],
};

export const LODE_GUIDE: RecoveryGuide = {
  id: "lode",
  title: "Lode deposits (hard rock)",
  tagline: "Crush & pan — estimate grams per tonne in the field.",
  steps: [
    "Channel sample across vein width — note wall rock and alteration halos.",
    "Crush representative split to sand, pan concentrates, weigh recovered gold.",
    "g/t ≈ (gold grams ÷ sample mass tonnes); triplicate samples for confidence.",
    "Map structures — faults and secondaries control shoot plunge.",
  ],
};

export const BORAX_GUIDE: RecoveryGuide = {
  id: "borax",
  title: "The Borax method (eco-friendly)",
  tagline: "Smelt concentrates with borax — avoid mercury in camp.",
  steps: [
    "Burn sulfides in open dish to drive off sulfur; keep ventilation extreme.",
    "Mix concentrates with borax glass — proportion by melt volume, not guess.",
    "Heat to borax melt — gold collects as bead; pour into cone mold.",
    "Treat spills as hot glass — PPE always; check local open-burn rules.",
  ],
};

export const ALL_RECOVERY_GUIDES = [PLACER_GUIDE, LODE_GUIDE, BORAX_GUIDE];
