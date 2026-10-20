import type { Viewport } from "next";
import { Bodoni_Moda, Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#151415",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Browser extensions add their own attributes to <html>/<body> before React
    // hydrates; suppress the warning for these two elements only.
    <html lang="en" className={`${bodoni.variable} ${instrument.variable} ${hanken.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
