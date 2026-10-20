"use client";

import { useRef, useState, useTransition } from "react";
import { addProjectImages, deleteProjectImage, saveProjectImages } from "@/lib/admin/actions/projects";
import { uploadImage } from "@/lib/admin/upload";
import { mediaUrl } from "@/lib/db/media";
import { button, card, ghost, input } from "@/components/admin/ui";

type Image = { id: string; path: string; width: number; height: number; alt: string };

// The project's photos: upload, reorder (the first is the cover), describe, remove.
export default function ProjectImages({ projectId, slug, title, images }: { projectId: string; slug: string; title: string; images: Image[] }) {
  const [list, setList] = useState(images);
  // Photos added or removed on the server: start again from the saved list.
  const ids = images.map((i) => i.id).sort().join();
  const [seen, setSeen] = useState(ids);
  if (ids !== seen) {
    setSeen(ids);
    setList(images);
  }
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const file = useRef<HTMLInputElement>(null);
  const changed = list.some((img, i) => img.id !== images[i]?.id || img.alt !== images[i]?.alt);

  const move = (from: number, to: number) =>
    setList((l) => {
      const next = [...l];
      next.splice(to, 0, next.splice(from, 1)[0]);
      return next;
    });

  async function upload(files: File[]) {
    setMessage(null);
    const done = [];
    try {
      for (const [i, f] of files.entries()) {
        setBusy(`Uploading ${i + 1} of ${files.length}…`);
        const up = await uploadImage(f, `projects/${slug}`);
        done.push({ ...up, alt: `${title} — photo ${list.length + done.length + 1}` });
      }
    } catch (err) {
      setMessage({ ok: false, text: err instanceof Error ? err.message : "Upload failed." });
    }
    if (done.length) {
      const res = await addProjectImages(projectId, done);
      setMessage(res.error ? { ok: false, text: res.error } : { ok: true, text: `${done.length} photo(s) added.` });
    }
    setBusy("");
  }

  return (
    <section className={`${card} mt-8`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl">Photos</h2>
          <p className="mt-1 text-sm text-ink/60">The first photo is the cover. JPG, PNG, WebP or AVIF, up to 15 MB each.</p>
        </div>
        <button type="button" className={button} disabled={Boolean(busy)} onClick={() => file.current?.click()}>
          {busy || "Upload photos"}
        </button>
        <input
          ref={file}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={(e) => {
            const files = [...(e.target.files ?? [])];
            e.target.value = "";
            if (files.length) upload(files);
          }}
        />
      </div>

      {list.length === 0 && <p className="mt-6 text-sm text-ink/60">No photos yet. A project needs at least one to show a cover.</p>}
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((img, i) => (
          <li key={img.id} className="rounded-sm border border-ink/10 bg-bone/60 p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-ink/10">
              <img src={mediaUrl(img.path)} alt="" className="h-full w-full object-cover" loading="lazy" />
              {i === 0 && <span className="t-label absolute left-2 top-2 rounded-sm bg-ink px-2 py-1 text-bone">Cover</span>}
            </div>
            <p className="mt-2 text-xs text-ink/50">
              {img.width} × {img.height}
            </p>
            <input
              value={img.alt}
              onChange={(e) => setList((l) => l.map((x) => (x.id === img.id ? { ...x, alt: e.target.value } : x)))}
              placeholder="Describe the photo"
              aria-label="Photo description"
              className={`${input} mt-2`}
            />
            <div className="mt-2 flex gap-1">
              <button type="button" className={ghost} disabled={i === 0} onClick={() => move(i, i - 1)} aria-label="Move earlier">
                ←
              </button>
              <button type="button" className={ghost} disabled={i === list.length - 1} onClick={() => move(i, i + 1)} aria-label="Move later">
                →
              </button>
              <button
                type="button"
                className={`${ghost} ml-auto`}
                disabled={pending}
                onClick={() => {
                  if (window.confirm("Remove this photo from the project?")) start(() => deleteProjectImage(img.id));
                }}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        {list.length > 1 || changed ? (
          <button
            type="button"
            className={button}
            disabled={!changed || pending}
            onClick={() =>
              start(async () => {
                const res = await saveProjectImages(projectId, list.map((x) => ({ id: x.id, alt: x.alt })));
                setMessage(res.error ? { ok: false, text: res.error } : { ok: true, text: res.message ?? "Saved." });
              })
            }
          >
            {pending ? "Saving…" : "Save order & descriptions"}
          </button>
        ) : null}
        {message && <p className={`text-sm ${message.ok ? "text-[#3d6b3f]" : "text-[#b3261e]"}`}>{message.text}</p>}
      </div>
    </section>
  );
}
