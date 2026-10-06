"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Button from "../Button";
import RevealText from "../RevealText";

const fields = [
  { name: "name", label: "Full Name", placeholder: "Nadia Rahman", type: "text", autoComplete: "name" },
  { name: "email", label: "Email Address", placeholder: "nadia@example.com", type: "email", autoComplete: "email" },
  { name: "country", label: "Country", placeholder: "Bangladesh", type: "text", autoComplete: "country-name" },
  { name: "city", label: "City", placeholder: "Dhaka", type: "text", autoComplete: "address-level2" },
];

export default function Admission() {
  const [sent, setSent] = useState(false);

  return (
    <section id="admission" data-theme="light" className="scroll-mt-0 bg-bone py-28 text-ink lg:py-44">
      <div className="grid-w gap-y-14">
        <div className="col-span-6 lg:col-span-4 lg:col-start-2">
          <h2 className="t-h1 flex flex-col">
            <RevealText as="span">Seek</RevealText>
            <RevealText as="span" className="ml-[1em] italic" delay={0.08}>
              Admission
            </RevealText>
          </h2>
          <RevealText className="mt-8 max-w-sm text-[0.95rem] leading-relaxed opacity-80">
            Tell us about the room you have in mind. We read every request and answer the ones we can serve well,
            usually within two weeks.
          </RevealText>
          <p className="t-label mt-10 opacity-50">Demo form — nothing is sent anywhere.</p>
        </div>

        <div className="col-span-6 lg:col-span-5 lg:col-start-7">
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div
                key="done"
                role="status"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex min-h-80 flex-col justify-center border-t border-ink pt-10"
              >
                <p className="t-h3">Received.</p>
                <p className="mt-4 max-w-sm text-sm opacity-70">
                  Your request is with the atelier. If there is a room for it, you will hear from us.
                </p>
                <Button className="mt-8 w-fit" onClick={() => setSent(false)}>
                  Send Another
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="grid grid-cols-1 gap-x-[var(--gap)] gap-y-8 sm:grid-cols-2"
              >
                {fields.map((field) => (
                  <label key={field.name} className="flex flex-col gap-2">
                    <span className="t-label opacity-60">{field.label}</span>
                    <input
                      required
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      className="border-b border-ink/30 bg-transparent pb-2 font-serif text-xl outline-none transition-colors duration-500 placeholder:text-ink/30 focus:border-ink"
                    />
                  </label>
                ))}
                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="t-label opacity-60">Context</span>
                  <textarea
                    name="context"
                    rows={3}
                    placeholder="The room, its light, and what you would like it to become."
                    className="resize-none border-b border-ink/30 bg-transparent pb-2 font-serif text-xl outline-none transition-colors duration-500 placeholder:text-ink/30 focus:border-ink"
                  />
                </label>
                <div className="flex items-center justify-between gap-6 sm:col-span-2">
                  <p className="max-w-[16rem] text-xs opacity-60">By submitting you accept that entry is considered, not assumed.</p>
                  <Button type="submit" big>
                    Submit Admission
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
