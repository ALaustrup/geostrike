/** Expedition Log — seed data for Supply Sync & Item Wiki (replace with Supabase later). */

export interface SupplyItem {
  id: string;
  owner: string;
  gear: string;
}

export interface WikiEntry {
  id: string;
  item: string;
  useCase: string;
  outcome: string;
}

export const SEED_SUPPLIES: SupplyItem[] = [
  { id: "1", owner: "Team lead", gear: "Highbanker — 2\" intake" },
  { id: "2", owner: "Team lead", gear: "8000 Series PI detector" },
  { id: "3", owner: "Sniper", gear: "4-stage classifiers (2\" → 1/8\")" },
  { id: "4", owner: "Sniper", gear: "Blue Bowl + Jet Dry" },
];

export const SEED_WIKI: WikiEntry[] = [
  {
    id: "w1",
    item: '1/4" classifier',
    useCase: "Clay-heavy bench above inside bend — ran wet into highbanker.",
    outcome: "3 g picker in first tray; clay broke down after 2nd pass.",
  },
];
