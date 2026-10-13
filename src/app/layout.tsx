import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import WhatsAppButton from "@/components/WhatsAppButton";

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
  title: "Integrity 360 Degree — Events, Exhibitions, Interiors & Brand",
  description:
    "Integrity 360 Degree is a Dhaka-based 360° agency, established in 2010: event and fair management, exhibition stalls, interior and architectural design, PR, media and digital.",
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
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
