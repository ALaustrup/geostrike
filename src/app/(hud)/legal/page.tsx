import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Legal & regional",
};

export default function LegalPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 pb-24">
      <div>
        <h1 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
          Legal &amp; regional intelligence
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Not legal advice — integrate county filings and regulation feeds your
          counsel approves.
        </p>
      </div>

      <Card className="border-amber-500/30 bg-card/80">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">County clerk integration</CardTitle>
          <CardDescription>
            Planned: deep links to file Notice of Location or Affidavit of
            Annual Assessment from the field (jurisdiction-specific).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Wire your state/county recorder endpoints behind authenticated API
            routes; never scrape protected systems without permission.
          </p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card/80">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Mining regulations feed</CardTitle>
          <CardDescription>
            Planned: live updates — suction dredge bans, seasonal closures,
            spawning windows.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Map agency RSS / API into a read-only cache with effective dates;
            surface alerts on the HUD when operating inside affected HUCs.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
