"use client";

import { useRef, useState } from "react";
import { mediaUrl } from "@/lib/db/media";
import { uploadImage } from "@/lib/admin/upload";
import { ghost } from "./ui";

type Props = { value: string | null; onChange: (path: string | null) => void; folder?: string };

// A storage path with a preview, an upload button and a way to clear it.
export default function ImageField({ value, onChange, folder = "uploads" }: Props) {
  const file = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="flex items-start gap-4">
      <div className="h-20 w-28 shrink-0 overflow-hidden rounded-sm bg-ink/10">
        {value && <img src={mediaUrl(value)} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs text-ink/60">{value || "No image"}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button type="button" className={ghost} disabled={busy} onClick={() => file.current?.click()}>
            {busy ? "Uploading…" : value ? "Replace" : "Upload"}
          </button>
          {value && (
            <button type="button" className={ghost} onClick={() => onChange(null)}>
              Remove
            </button>
          )}
        </div>
        {error && <p className="mt-2 text-xs text-[#b3261e]">{error}</p>}
        <input
          ref={file}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            e.target.value = "";
            if (!f) return;
            setBusy(true);
            setError("");
            try {
              onChange((await uploadImage(f, folder)).path);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Upload failed.");
            } finally {
              setBusy(false);
            }
          }}
        />
      </div>
    </div>
  );
}
