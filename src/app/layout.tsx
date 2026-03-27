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
  title: "GeoStrike — Mining intelligence",
  description:
    "High-fidelity claim mapping, mineral logging, and offline-first sync for field operations.",
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
