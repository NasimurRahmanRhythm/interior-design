import RevealText from "../RevealText";
import type { Copy } from "@/lib/db/types";

type Logo = { name: string; logo: string };

export default function Clients({ rows, copy }: { rows: Logo[][]; copy: Copy }) {
  return (
    <section id="clients" data-theme="light" className="overflow-hidden bg-[#ece4d6] py-24 text-ink lg:py-36">
      <div className="grid-w">
        <p className="t-label col-span-6 text-center opacity-60 lg:col-span-12">{copy.eyebrow}</p>
        <h2 className="t-h1 col-span-6 mt-6 text-center lg:col-span-10 lg:col-start-2">
          <RevealText as="span" className="block">
            {copy.title[0]}
          </RevealText>
          <RevealText as="span" className="block italic" delay={0.1}>
            {copy.title[1]}
          </RevealText>
        </h2>
      </div>

      {/* Client logos run in two rows, the first right to left and the second left to right. */}
      {rows.length > 0 && (
        <div className="mt-16 flex flex-col gap-8 lg:mt-24 lg:gap-12" aria-label="Some of our clients">
          {rows.map((row, r) => {
            // Repeat short rows so a loop is always wider than the screen, then double it for the seamless wrap.
            const loop = Array.from({ length: Math.ceil(10 / row.length) }, () => row).flat();
            return (
              <div key={r} className="overflow-hidden">
                <ul className={`marquee items-center ${r % 2 ? "reverse" : ""}`} style={{ animationDuration: `${loop.length * 3}s` }}>
                  {[...loop, ...loop].map((client, i) => (
                    <li key={`${client.name}${i}`} aria-hidden={i >= row.length} className="flex h-14 shrink-0 items-center px-6 lg:h-20 lg:px-10">
                      <img
                        src={client.logo}
                        alt={i < row.length ? client.name : ""}
                        loading="lazy"
                        className="max-h-full w-auto max-w-[9rem] object-contain lg:max-w-[12rem]"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
