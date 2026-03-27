import type { Metadata } from "next";

import { MapHudView } from "@/components/hud/MapHudView";

export const metadata: Metadata = {
  title: "HUD",
  description:
    "Map-centric OSGeo view: stratigraphy, contacts, faults, claim guardian, breadcrumb coverage, indicator halos.",
};

export default function HudMapPage() {
  return <MapHudView />;
}
