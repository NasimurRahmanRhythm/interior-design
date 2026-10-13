import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/sections/Contact";
import { brand } from "@/lib/data";
import { contactDetails } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Contact — Integrity 360 Degree",
  description: `Get a free consultation. ${brand.address.join(", ")}. ${brand.phones.join(", ")}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact" accent="Us" label="Get a free consultation" text={contactDetails.response} />
      <Contact />

      <section data-theme="light" className="bg-bone py-20 text-ink lg:py-28">
        <div className="grid-w gap-y-12">
          <div className="col-span-6 lg:col-span-4">
            <p className="t-label mb-4 opacity-50">Visit</p>
            <p className="t-h3">
              {brand.address[0]}
              <br />
              {brand.address[1]}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-70">{contactDetails.landmarks}</p>
            <a href={contactDetails.map} target="_blank" rel="noreferrer" className="t-label link-u mt-6 inline-block">
              Open in Google Maps →
            </a>
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-3 lg:col-start-6">
            <p className="t-label mb-4 opacity-50">Hours</p>
            <dl className="flex flex-col gap-3 text-sm">
              {contactDetails.hours.map((h) => (
                <div key={h.day}>
                  <dt className="opacity-60">{h.day}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-4 lg:col-start-9">
            <p className="t-label mb-4 opacity-50">Email</p>
            <dl className="flex flex-col gap-3 text-sm">
              {contactDetails.emails.map((e) => (
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
            <p className="t-label mb-3 mt-8 opacity-50">Call or WhatsApp</p>
            {brand.phones.map((p) => (
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
