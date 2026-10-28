"use client";

import { useActionState, useState } from "react";
import { addressLine } from "@/lib/address";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Button from "../Button";
import RevealText from "../RevealText";
import SplitTitle from "../SplitTitle";
import { sendQuote, type QuoteState } from "@/lib/db/actions";
import type { Copy, Settings } from "@/lib/db/types";

const FIELD =
  "w-full border-b border-bone/30 bg-transparent pb-2 font-serif text-xl text-bone outline-none transition-colors duration-500 placeholder:text-bone/30 focus:border-bone";

const SELECTS = [
  { name: "division", options: "divisions" },
  { name: "budget", options: "budgets" },
  { name: "timeline", options: "timelines" },
] as const;

const INPUTS = [
  { name: "name", type: "text", autoComplete: "name" },
  { name: "phone", type: "tel", autoComplete: "tel" },
  { name: "email", type: "email", autoComplete: "email" },
] as const;

type Props = {
  contact: Settings["contact"];
  quote: Settings["quote"];
  copy: Copy;
  division?: string;
};

// The same answers as a WhatsApp message, for people who prefer chat.
function whatsappLink(number: string, copy: Copy, data?: FormData) {
  if (!data) return `https://wa.me/${number}`;
  const lines = [...SELECTS, ...INPUTS].map((f) => `${copy.labels[f.name]}: ${data.get(f.name) || "—"}`);
  lines.push("", String(data.get("message") || ""));
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function Contact({ contact, quote, copy, division }: Props) {
  // Remounting the form clears it for another request.
  const [round, setRound] = useState(0);

  return (
    <section id="contact" data-theme="dark" className="bg-ink py-24 text-bone lg:py-36">
      <div className="grid-w gap-y-14">
        <div className="col-span-6 lg:col-span-12">
          <p className="t-eyebrow opacity-60">{copy.eyebrow}</p>
          <h2 className="mt-4 flex flex-col">
            <SplitTitle text={copy.title[0]} className="t-lrg" />
            <span className="flex flex-wrap items-baseline">
              <SplitTitle text={copy.title[1]} className="t-lrg" delay={0.08} />
              <SplitTitle text={copy.title[2]} className="t-lrg text-[#c9a07f]" delay={0.16} />
            </span>
          </h2>
        </div>

        <div className="col-span-6 lg:col-span-7">
          <QuoteForm key={round} {...{ contact, quote, copy, division }} onAgain={() => setRound((r) => r + 1)} />
        </div>

        <div className="col-span-6 grid grid-cols-2 content-start gap-x-[var(--gap)] gap-y-8 text-sm lg:col-span-4 lg:col-start-9">
          <div className="col-span-2">
            <p className="t-label mb-2 opacity-50">{copy.labels.office}</p>
            <a href={contact.map} target="_blank" rel="noreferrer" className="group block w-fit" aria-label="Open our office in Google Maps">
              <RevealText className="leading-relaxed opacity-85 transition-opacity group-hover:opacity-100">
                {contact.address.map(addressLine).flatMap((line, i) => (i ? [<br key={i} />, line] : [line]))}
              </RevealText>
              <span className="t-label link-u mt-2 inline-block opacity-70">Open in Google Maps ↗</span>
            </a>
          </div>
          <div>
            <p className="t-label mb-2 opacity-50">{copy.labels.call}</p>
            {contact.phones.map((p) => (
              <a key={p} href={`tel:${p}`} className="link-u block w-fit leading-relaxed opacity-85">
                {p}
              </a>
            ))}
          </div>
          <div>
            <p className="t-label mb-2 opacity-50">{copy.labels.hours}</p>
            <p className="leading-relaxed opacity-85">{contact.hours_short}</p>
            <p className="leading-relaxed opacity-60">{copy.closed_day}</p>
          </div>
          <div className="col-span-2">
            <p className="t-label mb-2 opacity-50">{copy.labels.write}</p>
            <a href={`mailto:${contact.email}`} className="link-u break-all opacity-85">
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteForm({ contact, quote, copy, division, onAgain }: Props & { onAgain: () => void }) {
  const pathname = usePathname();
  const [whatsapp, setWhatsapp] = useState(() => whatsappLink(contact.whatsapp, copy));
  const [state, action, pending] = useActionState(async (prev: QuoteState, data: FormData) => {
    setWhatsapp(whatsappLink(contact.whatsapp, copy, data));
    return sendQuote(prev, data);
  }, { status: "idle" });

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.status === "sent" ? (
        <motion.div
          key="done"
          role="status"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex min-h-80 flex-col justify-center border-t border-bone/30 pt-10"
        >
          <p className="t-h3">{copy.sent_title}</p>
          <p className="mt-4 max-w-md text-sm opacity-70">{copy.sent_text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={whatsapp}>{copy.whatsapp_sent}</Button>
            <Button onClick={onAgain}>{copy.again}</Button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          action={action}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 gap-x-[var(--gap)] gap-y-8 sm:grid-cols-3"
        >
          <input type="hidden" name="source_page" value={pathname} />
          {SELECTS.map((field) => (
            <label key={field.name} className="flex flex-col gap-2">
              <span className="t-label opacity-60">{copy.labels[field.name]}</span>
              <select
                name={field.name}
                required
                defaultValue={field.name === "division" && division ? division : ""}
                className={`${FIELD} cursor-pointer appearance-none [&>option]:bg-ink`}
              >
                <option value="" disabled>
                  {copy.placeholders.choose}
                </option>
                {quote[field.options].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          ))}
          {INPUTS.map((field) => (
            <label key={field.name} className="flex flex-col gap-2">
              <span className="t-label opacity-60">{copy.labels[field.name]}</span>
              <input
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={copy.placeholders[field.name]}
                required={field.name !== "email"}
                maxLength={field.name === "email" ? 320 : field.name === "phone" ? 50 : 200}
                className={FIELD}
              />
            </label>
          ))}
          <label className="flex flex-col gap-2 sm:col-span-3">
            <span className="t-label opacity-60">{copy.labels.message}</span>
            <textarea
              name="message"
              rows={3}
              maxLength={5000}
              placeholder={copy.placeholders.message}
              className={`${FIELD} resize-none`}
            />
          </label>
          {state.status === "error" && (
            <p role="alert" className="text-sm text-[#c9a07f] sm:col-span-3">
              {state.message}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 sm:col-span-3">
            <Button type="submit" big disabled={pending}>
              {pending ? copy.sending : copy.submit}
            </Button>
            <Button href={whatsapp} big>
              {copy.whatsapp}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
