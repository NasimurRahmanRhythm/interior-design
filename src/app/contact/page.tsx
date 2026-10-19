import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/sections/Contact";
import { getCopy, getSettings } from "@/lib/db/queries";

export async function generateMetadata(): Promise<Metadata> {
  const [{ meta, hero }, { contact }] = await Promise.all([getCopy("contact"), getSettings()]);
  return { title: meta.title, description: `${hero.label}. ${contact.address.join(", ")}. ${contact.phones.join(", ")}.` };
}

export default async function ContactPage() {
  const [settings, copy, home] = await Promise.all([getSettings(), getCopy("contact"), getCopy("home")]);
  const { contact } = settings;
  const labels = copy.details.labels;

  return (
    <>
      <PageHero title={copy.hero.title} accent={copy.hero.accent} label={copy.hero.label} text={contact.response} />
      <Contact contact={contact} quote={settings.quote} copy={home.contact} />

      <section data-theme="light" className="bg-bone py-20 text-ink lg:py-28">
        <div className="grid-w gap-y-12">
          <div className="col-span-6 lg:col-span-4">
            <p className="t-label mb-4 opacity-50">{labels.visit}</p>
            <p className="t-h3">
              {contact.address.flatMap((line, i) => (i ? [<br key={i} />, line] : [line]))}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-70">{contact.landmarks}</p>
            <a href={contact.map} target="_blank" rel="noreferrer" className="t-label link-u mt-6 inline-block">
              {copy.details.map_cta}
            </a>
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-3 lg:col-start-6">
            <p className="t-label mb-4 opacity-50">{labels.hours}</p>
            <dl className="flex flex-col gap-3 text-sm">
              {contact.hours.map((h) => (
                <div key={h.day}>
                  <dt className="opacity-60">{h.day}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-4 lg:col-start-9">
            <p className="t-label mb-4 opacity-50">{labels.email}</p>
            <dl className="flex flex-col gap-3 text-sm">
              {contact.emails.map((e) => (
                <div key={e.value}>
                  <dt className="opacity-60">{e.label}</dt>
                  <dd>
                    <a href={`mailto:${e.value}`} className="link-u break-all">
                      {e.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="t-label mb-3 mt-8 opacity-50">{labels.call}</p>
            {contact.phones.map((p) => (
              <a key={p} href={`tel:${p}`} className="link-u block w-fit text-sm">
                {p}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
