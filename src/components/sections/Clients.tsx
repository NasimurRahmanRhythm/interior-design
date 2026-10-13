import RevealText from "../RevealText";
import { clientNames } from "@/lib/data";

export default function Clients() {
  return (
    <section id="clients" data-theme="light" className="overflow-hidden bg-[#ece4d6] py-24 text-ink lg:py-36">
      <div className="grid-w">
        <p className="t-label col-span-6 text-center opacity-60 lg:col-span-12">Belief</p>
        <h2 className="t-h1 col-span-6 mt-6 text-center lg:col-span-10 lg:col-start-2">
          <RevealText as="span" className="block">
            We believe in first impression — our clients are our
          </RevealText>
          <RevealText as="span" className="block italic" delay={0.1}>
            real marketer.
          </RevealText>
        </h2>
      </div>

      <div className="mt-16 flex flex-col gap-4 lg:mt-24" aria-label="Some of our clients">
        {clientNames.map((row, r) => (
          <div key={r} className="overflow-hidden">
            <ul className={`marquee ${r % 2 ? "reverse" : ""}`}>
              {[...row, ...row].map((name, i) => (
                <li
                  key={`${name}${i}`}
                  aria-hidden={i >= row.length}
                  className={`shrink-0 px-[2.2vw] font-display text-[clamp(2rem,4vw,3.6rem)] leading-tight tracking-[-0.02em] ${
                    i % 3 === 1 ? "opacity-100" : "opacity-35"
                  }`}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
