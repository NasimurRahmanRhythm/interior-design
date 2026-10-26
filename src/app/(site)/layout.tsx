import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import WhatsAppButton from "@/components/WhatsAppButton";
import { COPY } from "@/lib/copy";
import { getSettings } from "@/lib/db/queries";

export const metadata: Metadata = { title: COPY.home.meta.title, description: COPY.home.meta.description };

// The public site: smooth scroll, preloader, header and footer around every page.
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  // The blog came after the menu was set up, so it is added here when missing.
  const nav = settings.nav.some((l) => l.href === "/blog") ? settings.nav : [...settings.nav, { label: "Blog", href: "/blog" }];
  const global = COPY.global;

  return (
    <SmoothScroll>
      <Preloader brand={settings.brand} />
      <Cursor />
      <Header brand={settings.brand} contact={settings.contact} nav={nav} copy={global.header} />
      <main>{children}</main>
      <Footer
        brand={settings.brand}
        contact={settings.contact}
        socials={settings.socials}
        nav={nav}
        copy={global.footer}
      />
      <WhatsAppButton number={settings.contact.whatsapp} />
    </SmoothScroll>
  );
}
