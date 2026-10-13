"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Button from "../Button";
import RevealText from "../RevealText";
import SplitTitle from "../SplitTitle";
import { brand, quote } from "@/lib/data";

const FIELD =
  "w-full border-b border-bone/30 bg-transparent pb-2 font-serif text-xl text-bone outline-none transition-colors duration-500 placeholder:text-bone/30 focus:border-bone";

const selects = [
  { name: "division", label: "Division", options: quote.divisions },
  { name: "budget", label: "Budget (BDT)", options: quote.budgets },
  { name: "timeline", label: "Timeline", options: quote.timelines },
] as const;

const inputs = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", placeholder: "Your name" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", placeholder: "+880" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@company.com" },
] as const;

// There is no form backend yet: the request opens as an email (or a WhatsApp
// message) addressed to the marketing team, filled in with the answers.
function compose(data: FormData) {
  const lines = [...selects, ...inputs].map((f) => `${f.label}: ${data.get(f.name) || "—"}`);
  lines.push("", String(data.get("message") || ""));
  return { subject: `Quote request — ${data.get("division") || "Integrity 360 Degree"}`, body: lines.join("\n") };
}

export default function Contact({ division }: { division?: string }) {
  const [sent, setSent] = useState(false);
  const [whatsapp, setWhatsapp] = useState(`https://wa.me/${brand.whatsapp}`);

  return (
    <section id="contact" data-theme="dark" className="bg-ink py-24 text-bone lg:py-36">
      <div className="grid-w gap-y-14">
        <div className="col-span-6 lg:col-span-12">
          <p className="t-label opacity-60">Get a free consultation</p>
          <h2 className="mt-4 flex flex-col">
            <SplitTitle text="Let's build" className="t-lrg" />
            <span className="flex flex-wrap items-baseline gap-x-[0.25em]">
              <SplitTitle text="your next" className="t-lrg" delay={0.08} />
              <SplitTitle text="project." className="t-lrg font-serif italic text-[#c9a07f]" delay={0.16} />
            </span>
          </h2>
        </div>

        <div className="col-span-6 lg:col-span-7">
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div
                key="done"
                role="status"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex min-h-80 flex-col justify-center border-t border-bone/30 pt-10"
              >
                <p className="t-h3">Your email is ready to send.</p>
                <p className="mt-4 max-w-md text-sm opacity-70">
                  We opened it in your mail app, addressed to {brand.email}. Prefer chat? Send the same request on
                  WhatsApp — we reply within 24 hours on business days.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={whatsapp}>Send on WhatsApp</Button>
                  <Button onClick={() => setSent(false)}>Edit request</Button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  const { subject, body } = compose(new FormData(e.currentTarget));
                  setWhatsapp(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`);
                  window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  setSent(true);
                }}
                className="grid grid-cols-1 gap-x-[var(--gap)] gap-y-8 sm:grid-cols-3"
              >
                {selects.map((field) => (
                  <label key={field.name} className="flex flex-col gap-2">
                    <span className="t-label opacity-60">{field.label}</span>
                    <select
                      name={field.name}
                      required
                      defaultValue={field.name === "division" && division ? division : ""}
                      className={`${FIELD} cursor-pointer appearance-none [&>option]:bg-ink`}>
                      <option value="" disabled>
                        Choose
                      </option>
                      {field.options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </label>
                ))}
                {inputs.map((field) => (
                  <label key={field.name} className="flex flex-col gap-2">
                    <span className="t-label opacity-60">{field.label}</span>
                    <input
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      required={field.name !== "email"}
                      className={FIELD}
                    />
                  </label>
                ))}
                <label className="flex flex-col gap-2 sm:col-span-3">
                  <span className="t-label opacity-60">Project</span>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="What you need, where, and when."
                    className={`${FIELD} resize-none`}
                  />
                </label>
                <div className="flex flex-wrap items-center gap-3 sm:col-span-3">
                  <Button type="submit" big>
                    Send request
                  </Button>
                  <Button href={whatsapp} big>
                    WhatsApp us
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="col-span-6 grid grid-cols-2 content-start gap-x-[var(--gap)] gap-y-8 text-sm lg:col-span-4 lg:col-start-9">
          <div className="col-span-2">
            <p className="t-label mb-2 opacity-50">Office</p>
            <RevealText className="leading-relaxed opacity-85">
              {brand.address[0]}
              <br />
              {brand.address[1]}
            </RevealText>
          </div>
          <div>
            <p className="t-label mb-2 opacity-50">Call</p>
            {brand.phones.map((p) => (
              <a key={p} href={`tel:${p}`} className="link-u block w-fit leading-relaxed opacity-85">
                {p}
              </a>
            ))}
          </div>
          <div>
            <p className="t-label mb-2 opacity-50">Hours</p>
            <p className="leading-relaxed opacity-85">{brand.hours}</p>
            <p className="leading-relaxed opacity-60">Friday closed</p>
          </div>
          <div className="col-span-2">
            <p className="t-label mb-2 opacity-50">Write</p>
            <a href={`mailto:${brand.email}`} className="link-u break-all opacity-85">
              {brand.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
