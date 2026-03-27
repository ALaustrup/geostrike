import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";

import { ServiceWorkerRegister } from "@/components/providers/ServiceWorkerRegister";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "GeoStrike — Expedition & Mining OS",
    template: "%s | GeoStrike",
  },
  description:
    "Operating-system HUD for gold-seeking teams: OSGeo mapping, Claim Guardian, expedition log, recovery intelligence, and offline Vault sync.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body
        className={`${inter.variable} ${robotoMono.variable} min-h-[100dvh] font-sans antialiased`}
      >
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
