import type { Metadata } from "next";
import { Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SEED_SUPPLIES, SEED_WIKI } from "@/content/expedition";

export const metadata: Metadata = {
  title: "Expedition log",
};

export default function ExpeditionPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 pb-24">
      <div>
        <h1 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
          Expedition log
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Team management — supply sync, item wiki, and the Digital Assay Book
          (use the HUD FAB for field entries).
        </p>
      </div>

      <Card className="border-border bg-card/80">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Supply sync</CardTitle>
          <CardDescription>
            Shared inventory — who carries what on the line.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {SEED_SUPPLIES.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between gap-2 rounded-md border border-border/60 bg-secondary/40 px-3 py-2 text-sm"
            >
              <span className="font-medium text-foreground">{s.gear}</span>
              <Badge variant="outline">{s.owner}</Badge>
            </div>
          ))}
          <Button type="button" variant="tactical" size="sm" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add gear
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border bg-card/80">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Item use-case wiki</CardTitle>
          <CardDescription>
            How gear was used — bench notes for the next shift.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {SEED_WIKI.map((w) => (
            <div key={w.id} className="rounded-md border border-border/50 p-3">
              <p className="text-xs font-semibold text-primary">{w.item}</p>
              <p className="mt-1 text-sm text-foreground">{w.useCase}</p>
              <Separator className="my-2" />
              <p className="text-xs text-emerald-400/90">{w.outcome}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border bg-card/80">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Digital Assay Book</CardTitle>
          <CardDescription>
            High-res finds, weights, GPS — logged from the HUD quick action.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Field entries sync through the Vault when offline; Supabase stores
            canonical assays when connected.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
