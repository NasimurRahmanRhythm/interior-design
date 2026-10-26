import Link from "next/link";
import type { Copy, Settings } from "@/lib/db/types";

type Props = Pick<Settings, "brand" | "contact" | "socials" | "nav"> & { copy: Copy };

export default function Footer({ brand, contact, socials, nav, copy }: Props) {
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-ink pb-8 pt-16 text-bone lg:pt-24">
      <div className="grid-w gap-y-12">
        <div className="col-span-6 lg:col-span-4">
          <p className="t-label mb-4 opacity-50">{copy.labels.index}</p>
          <ul className="t-h3 flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="link-u">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 sm:col-span-3 lg:col-span-2 lg:col-start-7">
          <p className="t-label mb-4 opacity-50">{copy.labels.office}</p>
          <a href={contact.map} target="_blank" rel="noreferrer" className="link-u block w-fit text-sm opacity-70" aria-label="Open our office in Google Maps">
            {contact.address.flatMap((line, i) => (i ? [<br key={i} />, line] : [line]))}
          </a>
          <p className="mt-3 text-sm opacity-50">{contact.hours_short}</p>
        </div>

        <div className="col-span-3 lg:col-span-2">
          <p className="t-label mb-4 opacity-50">{copy.labels.reach}</p>
          {contact.phones.map((p) => (
            <a key={p} href={`tel:${p}`} className="link-u block w-fit text-sm opacity-70">
              {p}
            </a>
          ))}
          <a href={`mailto:${contact.email}`} className="link-u mt-2 inline-block break-all text-sm">
            {contact.email}
          </a>
        </div>

        <div className="col-span-3 lg:col-span-2">
          <p className="t-label mb-4 opacity-50">{copy.labels.follow}</p>
          <ul className="flex flex-col gap-1 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="link-u opacity-70">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid-w mt-14 border-t border-bone/15 pt-5 lg:mt-20">
        <span className="t-label col-span-3 opacity-50 lg:col-span-6">© 2026 {brand.name}</span>
        <Link href={copy.cta.href} className="t-label link-u col-span-3 w-fit justify-self-end lg:col-span-6">
          {copy.cta.label}
        </Link>
      </div>
    </footer>
  );
}
