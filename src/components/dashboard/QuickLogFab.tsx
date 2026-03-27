"use client";

import { useEffect, useState } from "react";
import { Crosshair, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { VaultLogRow } from "@/lib/dexieStore";
import type { MineralCategory } from "@/types/geostrike";

const MINERALS: MineralCategory[] = [
  "Gold",
  "Quartz",
  "Silver",
  "Copper",
  "Black Sand",
  "Other",
];

/**
 * getCurrentPosition is supposed to honor `timeout`, but some Chromium builds
 * never call success/error — this Promise would hang forever and keep "Locating…"
 * visible. We always enforce a hard wall-clock cap and ignore late callbacks.
 */
function readPositionCapped(
  options: PositionOptions | undefined,
  hardCapMs: number,
): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(
        Object.assign(new Error("Geolocation stalled (browser did not respond)"), {
          code: 3,
        }),
      );
    }, hardCapMs);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(pos);
      },
      (err) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        reject(err);
      },
      options,
    );
  });
}

/** Some browsers return a fix only after watchPosition (desktop / flaky drivers). */
function watchFirstPosition(timeoutMs: number): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }
    let done = false;
    const finish = (fn: () => void) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      fn();
    };
    const timer = setTimeout(() => {
      finish(() => {
        navigator.geolocation.clearWatch(watchId);
        reject(Object.assign(new Error("watch timeout"), { code: 3 }));
      });
    }, timeoutMs);

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        finish(() => {
          navigator.geolocation.clearWatch(watchId);
          resolve(pos);
        });
      },
      (err) => {
        finish(() => {
          navigator.geolocation.clearWatch(watchId);
          reject(err);
        });
      },
      { enableHighAccuracy: false, maximumAge: 0 },
    );
  });
}

/**
 * Last resort when the Geolocation API cannot get a fix (common on desktops).
 * City/region accuracy only; requires network. ipapi.co allows browser CORS.
 */
async function fetchApproximateLocationFromIp(): Promise<{
  lat: number;
  lng: number;
}> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12_000);
  try {
    const res = await fetch("https://ipapi.co/json/", {
      signal: ctrl.signal,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as {
      latitude?: number | null;
      longitude?: number | null;
      error?: boolean;
    };
    if (
      data.error ||
      typeof data.latitude !== "number" ||
      typeof data.longitude !== "number"
    ) {
      throw new Error("No coordinates in response");
    }
    return { lat: data.latitude, lng: data.longitude };
  } finally {
    clearTimeout(timer);
  }
}

function formatGeoError(err: unknown): string {
  if (err && typeof err === "object" && "code" in err) {
    const code = (err as GeolocationPositionError).code;
    if (code === 1) {
      return "Location permission denied. Allow location for this site in your browser (or Electron) settings.";
    }
    if (code === 2) {
      return "Position unavailable. Try outdoors, enable Wi‑Fi, or try again.";
    }
    if (code === 3) {
      return "Location request timed out. Check signal or try again.";
    }
  }
  if (err instanceof Error) return err.message;
  return "Could not read GPS coordinates.";
}

function formatAllAttemptsFailedMessage(): string {
  return (
    "Could not get a GPS fix. On Windows: Settings → Privacy & security → Location → " +
    "Location services ON, and allow your browser. " +
    "Try Wi‑Fi (helps Wi‑Fi positioning) or type coordinates manually below."
  );
}

interface QuickLogFabProps {
  saveLogLocally: (
    row: Omit<VaultLogRow, "id" | "createdAt" | "synced">,
  ) => Promise<string>;
  online: boolean;
}

export function QuickLogFab({ saveLogLocally, online }: QuickLogFabProps) {
  const [open, setOpen] = useState(false);
  const [lat, setLat] = useState<string>("");
  const [lng, setLng] = useState<string>("");
  const [elevation, setElevation] = useState<string>("");
  const [mineral, setMineral] = useState<MineralCategory>("Gold");
  const [purity, setPurity] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [locationHint, setLocationHint] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setGpsError(null);
      setLocationHint(null);
    } else {
      setGpsLoading(false);
    }
  }, [open]);

  const applyPosition = (pos: GeolocationPosition) => {
    setLat(pos.coords.latitude.toFixed(6));
    setLng(pos.coords.longitude.toFixed(6));
    const alt = pos.coords.altitude;
    if (alt != null && Number.isFinite(alt)) {
      setElevation(alt.toFixed(1));
    }
  };

  const captureGps = async () => {
    setGpsError(null);
    setLocationHint(null);
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported in this environment.");
      return;
    }
    if (typeof window !== "undefined" && !window.isSecureContext) {
      setGpsError(
        "Location needs a secure context. Use https:// or http://localhost (not a raw LAN IP over http).",
      );
      return;
    }

    setGpsLoading(true);
    const attempts: Array<() => Promise<GeolocationPosition>> = [
      () =>
        readPositionCapped(
          {
            enableHighAccuracy: true,
            timeout: 10_000,
            maximumAge: 0,
          },
          12_000,
        ),
      () =>
        readPositionCapped(
          {
            enableHighAccuracy: false,
            timeout: 10_000,
            maximumAge: 120_000,
          },
          12_000,
        ),
      () =>
        readPositionCapped(
          {
            enableHighAccuracy: false,
            timeout: 10_000,
            maximumAge: 86_400_000,
          },
          12_000,
        ),
      () => watchFirstPosition(18_000),
    ];

    try {
      for (const run of attempts) {
        try {
          const pos = await run();
          applyPosition(pos);
          return;
        } catch {
          /* try next strategy */
        }
      }

      if (typeof navigator !== "undefined" && navigator.onLine) {
        try {
          const ip = await fetchApproximateLocationFromIp();
          setLat(ip.lat.toFixed(6));
          setLng(ip.lng.toFixed(6));
          setElevation("");
          setLocationHint(
            "Approximate location from your network (IP)—city/region accuracy, not survey-grade. For real GPS, turn on Windows Location services and Wi‑Fi, or enter coordinates manually.",
          );
          return;
        } catch {
          /* fall through */
        }
      }

      setGpsError(formatAllAttemptsFailedMessage());
    } catch (err) {
      setGpsError(formatGeoError(err));
    } finally {
      setGpsLoading(false);
    }
  };

  const submit = async () => {
    const la = Number(lat);
    const ln = Number(lng);
    if (Number.isNaN(la) || Number.isNaN(ln)) return;
    setBusy(true);
    try {
      await saveLogLocally({
        lat: la,
        lng: ln,
        elevation: elevation ? Number(elevation) : undefined,
        mineralType: mineral,
        purityEstimate: purity ? Number(purity) : undefined,
        notes: notes || undefined,
      });
      setOpen(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="lg"
          className="fixed bottom-6 right-6 z-30 h-14 rounded-full px-6 shadow-lg shadow-amber-500/20 md:bottom-8 md:right-8"
        >
          <Crosshair className="mr-2 h-5 w-5" />
          Assay
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Digital Assay Book</DialogTitle>
          <DialogDescription>
            GPS, mineral context, and notes — written to the Vault first; sync
            when {online ? "connected" : "back online"}. Photos attach in a
            follow-up storage hook.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="tactical"
                size="sm"
                onClick={() => void captureGps()}
                disabled={gpsLoading}
              >
                {gpsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Locating…
                  </>
                ) : (
                  "Auto GPS"
                )}
              </Button>
            </div>
            {gpsError && (
              <p className="text-xs text-destructive" role="alert">
                {gpsError}
              </p>
            )}
            {locationHint && !gpsError && (
              <p className="text-xs text-emerald-400/90" role="status">
                {locationHint}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="lat">Latitude</Label>
              <Input
                id="lat"
                inputMode="decimal"
                placeholder="39.123456"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lng">Longitude</Label>
              <Input
                id="lng"
                inputMode="decimal"
                placeholder="-115.123456"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="elev">Elevation (m)</Label>
            <Input
              id="elev"
              inputMode="decimal"
              value={elevation}
              onChange={(e) => setElevation(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Mineral type</Label>
            <Select
              value={mineral}
              onValueChange={(v) => setMineral(v as MineralCategory)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select mineral" />
              </SelectTrigger>
              <SelectContent>
                {MINERALS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="purity">Purity estimate (0–1)</Label>
            <Input
              id="purity"
              inputMode="decimal"
              placeholder="0.35"
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Soil color, quartz stringers, water…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={submit} disabled={busy || !lat || !lng}>
            {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save to Vault
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
