"use client";

import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";

// A Quill editor for a plain form: the HTML goes in a hidden field. The toolbar
// matches what the site keeps when it saves (see src/lib/richtext.ts).
export default function RichEditor({ name, value = "" }: { name: string; value?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState(value);

  useEffect(() => {
    let alive = true;
    let quill: import("quill").default | null = null;
    import("quill").then(({ default: Quill }) => {
      if (!alive || !box.current) return;
      const el = document.createElement("div");
      box.current.replaceChildren(el);
      quill = new Quill(el, {
        theme: "snow",
        placeholder: "Write here…",
        modules: {
          toolbar: [[{ header: [2, 3, false] }], ["bold", "underline", "link"], [{ list: "ordered" }, { list: "bullet" }], ["blockquote"], [{ align: [] }], ["clean"]],
        },
        formats: ["header", "bold", "underline", "link", "list", "blockquote", "align"],
      });
      if (value) quill.setContents(quill.clipboard.convert({ html: value }), "silent");
      quill.on("text-change", () => setHtml(quill!.getSemanticHTML()));
    });
    return () => {
      alive = false;
      quill = null;
    };
    // The editor keeps its own state after the first load.
  }, []);

  return (
    <div className="rich-editor rounded-sm bg-white">
      <div ref={box} className="min-h-56" />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
