import type { Metadata } from "next";
import ActionForm from "@/components/admin/ActionForm";
import JsonEditor from "@/components/admin/JsonEditor";
import PageTitle from "@/components/admin/PageTitle";
import { card } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { saveSettings, type SettingsColumn } from "@/lib/admin/actions/content";

export const metadata: Metadata = { title: "Settings" };

const SECTIONS: { column: SettingsColumn; title: string; text: string }[] = [
  { column: "brand", title: "Brand", text: "Name, the three logo lines, tagline and belief." },
  { column: "contact", title: "Contact details", text: "Address, phones, WhatsApp number (digits only), emails and hours, used across the site." },
  { column: "nav", title: "Menu", text: "Links in the menu and footer." },
  { column: "socials", title: "Social links", text: "" },
  { column: "hero_panels", title: "Landing hero photos", text: "The photos floating in the landing page hero." },
  { column: "trust_stats", title: "Landing figures", text: "The numbers that count up under the hero." },
  { column: "quote_options", title: "Quote form choices", text: "Keep the first four divisions in the same order as the divisions, so each division page picks its own." },
];

export default async function Settings() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  if (error) throw new Error(error.message);
  return (
    <>
      <PageTitle title="Settings" text="Site-wide details. Each section saves on its own." />
      <nav className="mb-6 flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <a key={s.column} href={`#${s.column}`} className="t-label rounded-sm border border-ink/20 px-3 py-2 hover:border-ink">
            {s.title}
          </a>
        ))}
      </nav>
      <div className="flex flex-col gap-8">
        {SECTIONS.map((s) => (
          <section key={s.column} id={s.column} className={`${card} scroll-mt-6`}>
            <h2 className="font-serif text-2xl">{s.title}</h2>
            {s.text && <p className="mt-1 text-sm text-ink/60">{s.text}</p>}
            <ActionForm action={saveSettings.bind(null, s.column)} submit={`Save ${s.title.toLowerCase()}`} className="mt-5">
              <JsonEditor name="value" value={data[s.column]} folder="site" />
            </ActionForm>
          </section>
        ))}
      </div>
    </>
  );
}
