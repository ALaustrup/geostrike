import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GEOLOGICAL_INDICATORS } from "@/content/geologicalIndicators";
import { UTILITY_LIBRARY } from "@/content/utilityLibrary";

export const metadata: Metadata = {
  title: "Knowledgebase",
};

export default function KnowledgePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-6 pb-24">
      <div>
        <h1 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
          Mining knowledgebase
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Geological indicators and the Utility &amp; Supply Library — field
          reference, offline-safe.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
          Geological indicators (halos)
        </h2>
        <div className="grid gap-3 md:grid-cols-1">
          {GEOLOGICAL_INDICATORS.map((g) => (
            <Card key={g.id} className="border-border bg-card/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{g.title}</CardTitle>
                <CardDescription>{g.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{g.dataSources}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
          Utility &amp; supply library
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-foreground">Category</TableHead>
                <TableHead className="text-foreground">Primary utility</TableHead>
                <TableHead className="max-w-[280px] text-foreground">
                  GeoStrike pro tip
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {UTILITY_LIBRARY.map((row) => (
                <TableRow key={row.category} className="border-border">
                  <TableCell className="align-top font-medium">
                    {row.category}
                  </TableCell>
                  <TableCell className="align-top text-sm text-muted-foreground">
                    {row.primaryUtility}
                  </TableCell>
                  <TableCell className="align-top text-sm text-amber-200/90">
                    {row.geoStrikeProTip}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
