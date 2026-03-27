"use client";

import { Sun, SunDim } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "HUD", short: "Map" },
  { href: "/expedition", label: "Expedition", short: "Team" },
  { href: "/knowledge", label: "Knowledge", short: "Intel" },
  { href: "/recovery", label: "Recovery", short: "Recovery" },
  { href: "/legal", label: "Legal", short: "Legal" },
] as const;

export function HudShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sunlit, setSunlit] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("geostrike-sunlit");
    if (v === "1") {
      setSunlit(true);
      document.documentElement.classList.add("hud-sunlit");
    }
  }, []);

  const toggleSunlit = () => {
    const next = !sunlit;
    setSunlit(next);
    document.documentElement.classList.toggle("hud-sunlit", next);
    localStorage.setItem("geostrike-sunlit", next ? "1" : "0");
  };

  return (
    <div className="flex h-[100dvh] min-h-0 flex-col overflow-hidden bg-background">
      <header className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2 md:px-4">
        <div className="min-w-0">
          <Link
            href="/"
            className="block font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-amber-500"
          >
            GeoStrike
          </Link>
          <p className="truncate text-[11px] text-muted-foreground">
            Expedition &amp; Mining OS
          </p>
        </div>
        <Button
          type="button"
          variant="tactical"
          size="icon"
          className="shrink-0"
          onClick={toggleSunlit}
          aria-pressed={sunlit}
          aria-label={sunlit ? "Reduce contrast for shade" : "High contrast for sunlight"}
          title="Sunlight-readable HUD"
        >
          {sunlit ? (
            <Sun className="h-4 w-4 text-amber-300" />
          ) : (
            <SunDim className="h-4 w-4" />
          )}
        </Button>
      </header>

      <div className="relative min-h-0 flex-1">{children}</div>

      <nav
        className="flex shrink-0 items-stretch justify-around gap-1 border-t border-border bg-card/90 px-1 py-2 backdrop-blur-md md:justify-center md:gap-2 md:px-4"
        aria-label="Primary"
      >
        {NAV.map(({ href, label, short }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-h-[44px] min-w-[56px] flex-1 flex-col items-center justify-center rounded-md px-2 text-[10px] font-semibold uppercase tracking-wide transition-colors md:min-w-[72px] md:flex-none",
                active
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <span className="md:hidden">{short}</span>
              <span className="hidden md:inline">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
