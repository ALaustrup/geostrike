import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ALL_RECOVERY_GUIDES } from "@/content/recoveryGuides";

export const metadata: Metadata = {
  title: "Smart recovery",
};

export default function RecoveryPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 pb-24">
      <div>
        <h1 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
          Smart recovery assistant
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Deposit-type playbooks — placer hydraulic logic, hard-rock g/t checks,
          and Borax smelting without mercury in camp.
        </p>
      </div>

      <div className="space-y-4">
        {ALL_RECOVERY_GUIDES.map((g) => (
          <Card key={g.id} className="border-border bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{g.title}</CardTitle>
              <CardDescription>{g.tagline}</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal space-y-2 pl-4 text-sm text-foreground">
                {g.steps.map((step, i) => (
                  <li key={i} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
