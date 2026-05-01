import type { Metadata } from "next";
import { Fraunces, Newsreader, JetBrains_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Chrome from "@/components/Chrome";
import { PlankraftStateProvider } from "@/lib/state";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Plankraft — Woodworking Plans",
  description:
    "Describe a project in plain language; receive a complete build plan with cut list, exploded view, build sequence, and bill of materials.",
  openGraph: {
    title: "Plankraft — Woodworking Plans",
    description: "AI woodworking plans · cut list, exploded view, build sequence.",
    type: "website",
    siteName: "Plankraft",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plankraft — Woodworking Plans",
    description: "AI woodworking plans · cut list, exploded view, build sequence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${newsreader.variable} ${jetbrainsMono.variable} ${instrumentSans.variable}`}
    >
      <body className="paper-bg">
        <PlankraftStateProvider>
          <Chrome />
          {children}
        </PlankraftStateProvider>
      </body>
    </html>
  );
}
