import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getCopy, getSettings } from "@/lib/db/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getCopy("home");
  return { title: meta.title, description: meta.description };
}

// The public site: smooth scroll, preloader, header and footer around every page.
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, global] = await Promise.all([getSettings(), getCopy("global")]);

  return (
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
  );
}
