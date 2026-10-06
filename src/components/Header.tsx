"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Button from "./Button";
import { useLenis } from "./SmoothScroll";
import { brand, nav } from "@/lib/data";

const EASE = [0.69, 0, 0, 1] as const;

export default function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // The header takes its colour from whichever [data-theme] section sits under it.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > window.innerHeight * 0.6);
      const sections = document.querySelectorAll<HTMLElement>("[data-theme]");
      let current: "dark" | "light" = "dark";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 40 && rect.bottom > 40) current = section.dataset.theme === "light" ? "light" : "dark";
      });
      setTheme(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const light = theme === "light" && !open;

  return (
    <>
      <header
        data-tone={light ? "light" : "dark"}
        className={`pointer-events-none fixed inset-x-0 top-0 z-[110] pb-16 pt-3 transition-colors duration-700 ease-cubic lg:pt-4 ${
          light ? "text-ink" : "text-bone"
        }`}
      >
        <div className="grid-w items-center">
          <Link
            href="/"
            aria-label={`${brand.name} — home`}
            className="pointer-events-auto col-span-3 flex flex-col justify-self-start font-serif text-[1.35rem] leading-[0.85] lg:col-span-2 lg:text-[1.55rem]"
          >
            {brand.lines.map((line, i) => (
              <span key={line} style={{ marginLeft: `${[0.85, 0, 1][i]}em` }}>
                {line}
              </span>
            ))}
          </Link>

          <span className="hidden h-8 w-px justify-self-center bg-current opacity-30 lg:col-start-4 lg:block" />

          <nav className="pointer-events-auto hidden items-center gap-[var(--gap)] lg:col-span-3 lg:col-start-5 lg:flex">
            <Button href="/spaces">Spaces</Button>
            <Button href="/objects">Objects</Button>
          </nav>

          <div className="pointer-events-auto col-span-3 col-start-4 flex items-center justify-end gap-[var(--gap)] lg:col-span-4 lg:col-start-9">
            <div
              className={`hidden transition-[translate,opacity] duration-700 ease-cubic sm:block ${
                scrolled && !open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
              }`}
            >
              <Button href="/#admission">Seek Admission</Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group flex items-center gap-3 border border-current px-4 py-2.5 t-label"
            >
              <span className="relative flex h-2 w-6 flex-col justify-between">
                <span
                  className={`h-px w-full bg-current transition-transform duration-500 ease-cubic ${
                    open ? "translate-y-[3.5px] rotate-[20deg]" : "group-hover:translate-x-1"
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-transform duration-500 ease-cubic ${
                    open ? "-translate-y-[3.5px] -rotate-[20deg]" : "group-hover:-translate-x-1"
                  }`}
                />
              </span>
              <span className="w-9 text-left">{open ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            className="fixed inset-0 z-[105] flex flex-col justify-end overflow-y-auto bg-ink text-bone"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="grid-w pb-10 pt-32">
              <ul className="col-span-6 lg:col-span-8">
                {nav.map((item, i) => (
                  <li key={item.label} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-110%" }}
                      transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease: [0.2, 0.75, 0.35, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-4 font-display text-[clamp(3rem,10vw,8.5rem)] leading-[0.92] tracking-[-0.035em] transition-colors duration-500 hover:text-umber"
                      >
                        <span className="t-label w-6 opacity-40">0{i + 1}</span>
                        <span className="transition-transform duration-700 ease-cubic group-hover:translate-x-[0.12em]">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div
                className="col-span-6 mt-12 flex flex-col justify-end gap-6 lg:col-span-3 lg:col-start-10 lg:mt-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="t-label opacity-50">{brand.tagline}</p>
                <p className="text-sm opacity-70">
                  Seven rooms in operation. Their addresses are shared after admission, never before.
                </p>
                <a href={`mailto:${brand.email}`} className="link-u w-fit text-sm">
                  {brand.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
