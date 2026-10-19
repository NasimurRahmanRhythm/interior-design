import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getCopy, getSettings } from "@/lib/db/queries";

const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getCopy("home");
  return { title: meta.title, description: meta.description };
}

export const viewport: Viewport = {
  themeColor: "#151415",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, global] = await Promise.all([getSettings(), getCopy("global")]);
  return (
    // Browser extensions add their own attributes to <html>/<body> before React
    // hydrates; suppress the warning for these two elements only.
    <html lang="en" className={`${bodoni.variable} ${instrument.variable} ${hanken.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SmoothScroll>
          <Preloader brand={settings.brand} />
          <Cursor />
          <Header brand={settings.brand} contact={settings.contact} nav={settings.nav} copy={global.header} />
          <main>{children}</main>
          <Footer
            brand={settings.brand}
            contact={settings.contact}
            socials={settings.socials}
            nav={settings.nav}
            copy={global.footer}
          />
          <WhatsAppButton number={settings.contact.whatsapp} />
        </SmoothScroll>
      </body>
    </html>
  );
}
