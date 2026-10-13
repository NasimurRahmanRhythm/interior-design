"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "../SmoothScroll";
import type { ProjectImage } from "@/lib/projects";

// Project photos; a click opens them full screen, arrows and Escape work there.
export default function Gallery({ images, title }: { images: ProjectImage[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (open === null) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, images.length, lenis]);

  return (
    <>
      <div className="grid-w gap-y-[var(--gap)]">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open photo ${i + 1} of ${title}`}
            className={`group relative col-span-6 overflow-hidden bg-stone ${images.length === 1 ? "lg:col-span-12" : i % 3 === 0 ? "lg:col-span-12" : "lg:col-span-6"}`}
            style={{ aspectRatio: `${img.w} / ${img.h}` }}
          >
            <Image
              src={img.src}
              alt={`${title} — photo ${i + 1}`}
              fill
              sizes={i % 3 === 0 ? "100vw" : "(min-width:1024px) 50vw, 100vw"}
              className="object-cover transition-transform duration-1000 ease-cubic group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} photos`}
            className="fixed inset-0 z-[160] flex items-center justify-center bg-ink/95 p-[var(--margin)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <div className="relative h-full w-full">
              <Image src={images[open].src} alt={`${title} — photo ${open + 1}`} fill sizes="100vw" className="object-contain" />
            </div>
            <p className="t-label absolute bottom-6 left-1/2 -translate-x-1/2 text-bone/70">
              {open + 1} / {images.length} — Esc to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
