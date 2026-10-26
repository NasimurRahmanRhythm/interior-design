"use client";

import { useState } from "react";
import ImageField from "./ImageField";
import { ghost, input, label } from "./ui";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

// Keys holding a storage path get an image picker.
const IMAGE_KEYS = new Set(["image", "image_path", "cover_image", "logo_path"]);
// Short lists whose length the page layout depends on (heading lines and the like).
const FIXED_KEYS = new Set(["title", "lines", "place"]);
// Keys whose text runs to sentences.
const LONG_KEYS = /text|detail|summary|intro|overview|mission|promise|lead|response|landmarks|note/;

// The database keeps JSON keys sorted by length, so fields are shown in this
// order instead; anything not listed follows.
const ORDER = [
  "name", "year", "value", "unit", "suffix", "title", "accent", "label", "href", "eyebrow", "lines", "tagline", "belief",
  "lead", "text", "detail", "address", "phones", "whatsapp", "email", "hr_email", "hours_short", "emails", "hours",
  "response", "landmarks", "map", "image", "image_path", "alt",
];
const rank = (k: string) => {
  const i = ORDER.indexOf(k);
  return i < 0 ? ORDER.length : i;
};

const LABELS: Record<string, string> = { image: "Photo", image_path: "Photo", href: "Link", lat: "Latitude", lon: "Longitude" };
const human = (key: string) => LABELS[key] ?? (key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g, " ");

// An empty value of the same shape, for a new list item.
function blank(v: Json): Json {
  if (Array.isArray(v)) return [];
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)]));
  if (typeof v === "number") return 0;
  if (typeof v === "boolean") return false;
  return "";
}

const move = <T,>(list: T[], from: number, to: number) => {
  const next = [...list];
  next.splice(to, 0, next.splice(from, 1)[0]);
  return next;
};

type FieldProps = { k: string; value: Json; onChange: (v: Json) => void; folder: string; hide?: string[] };

function Field({ k, value, onChange, folder, hide = [] }: FieldProps) {
  if (IMAGE_KEYS.has(k) && (value === null || typeof value === "string")) {
    return <ImageField value={value} onChange={onChange} folder={folder} />;
  }
  if (Array.isArray(value)) return <List k={k} value={value} onChange={onChange} folder={folder} hide={hide} />;
  if (value && typeof value === "object") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {Object.entries(value)
          .filter(([key]) => !hide.includes(key))
          .sort(([a], [b]) => rank(a) - rank(b))
          .map(([key, v]) => (
          <div key={key} className={Array.isArray(v) || (v && typeof v === "object") || LONG_KEYS.test(key) ? "sm:col-span-2" : ""}>
            <span className={label}>{human(key)}</span>
            <Field k={key} value={v} folder={folder} hide={hide} onChange={(next) => onChange({ ...value, [key]: next })} />
          </div>
          ))}
      </div>
    );
  }
  if (typeof value === "boolean") {
    return <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-umber" />;
  }
  if (typeof value === "number") {
    return <input type="number" step="any" value={value} onChange={(e) => onChange(e.target.valueAsNumber || 0)} className={input} />;
  }
  const text = value ?? "";
  if (LONG_KEYS.test(k) || text.length > 70) {
    return <textarea value={text} rows={Math.min(8, Math.max(2, Math.ceil(text.length / 80)))} onChange={(e) => onChange(e.target.value)} className={input} />;
  }
  return <input value={text} onChange={(e) => onChange(e.target.value)} className={input} />;
}

function List({ k, value, onChange, folder, hide }: Omit<FieldProps, "value"> & { value: Json[] }) {
  const fixed = FIXED_KEYS.has(k) && value.every((v) => typeof v !== "object");
  const objects = value.some((v) => v && typeof v === "object");
  const template: Json = value.length ? blank(value[value.length - 1]) : "";

  return (
    <div className="flex flex-col gap-2">
      {value.map((item, i) => (
        <div key={i} className={objects ? "rounded-sm border border-ink/10 bg-bone/60 p-4" : "flex items-start gap-2"}>
          {objects && <p className="t-label mb-3 text-ink/40">{i + 1}</p>}
          <div className={objects ? "" : "flex-1"}>
            <Field k={k} value={item} folder={folder} hide={hide} onChange={(v) => onChange(value.map((x, j) => (j === i ? v : x)))} />
          </div>
          {!fixed && (
            <div className={`flex gap-1 ${objects ? "mt-3" : ""}`}>
              <button type="button" className={ghost} disabled={i === 0} onClick={() => onChange(move(value, i, i - 1))} aria-label="Move up">
                ↑
              </button>
              <button type="button" className={ghost} disabled={i === value.length - 1} onClick={() => onChange(move(value, i, i + 1))} aria-label="Move down">
                ↓
              </button>
              <button type="button" className={ghost} onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="Remove">
                ✕
              </button>
            </div>
          )}
        </div>
      ))}
      {!fixed && (
        <button type="button" className={`${ghost} self-start`} onClick={() => onChange([...value, template])}>
          + Add
        </button>
      )}
    </div>
  );
}

type Props = { name: string; value: unknown; folder?: string; k?: string; hide?: string[] };

// Edits stored JSON (settings, lists) as a form with the same shape, and sends it
// as one hidden field. Keys in `hide` are kept as they are but not shown.
export default function JsonEditor({ name, value, folder = "uploads", k = "", hide }: Props) {
  const [state, setState] = useState<Json>(value as Json);
  return (
    <>
      <Field k={k} value={state} onChange={setState} folder={folder} hide={hide} />
      <input type="hidden" name={name} value={JSON.stringify(state)} />
    </>
  );
}
