import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

export const metadata: Metadata = {
  title: "Umbra Atelier — Interiors Shaped Quietly",
  description:
    "Umbra Atelier is an independent interior design practice shaping private rooms and the objects formed within them.",
};

export const viewport: Viewport = {
  themeColor: "#151415",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Browser extensions add their own attributes to <html>/<body> before React
    // hydrates; suppress the warning for these two elements only.
    <html lang="en" className={`${bodoni.variable} ${instrument.variable} ${hanken.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SmoothScroll>
          <Preloader />
          <Cursor />
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
