"use server";

import { requireAdmin } from "../auth";

const TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif" };

// A one-time URL the browser uploads a photo to, so the file goes straight to
// storage instead of through the server.
export async function signUpload(folder: string, name: string, type: string) {
  const ext = TYPES[type];
  if (!ext) throw new Error("Use a JPG, PNG, WebP or AVIF image.");
  const safeFolder = folder.replace(/[^a-z0-9/-]/gi, "").replace(/^\/+|\/+$/g, "") || "uploads";
  const base = name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "image";
  const path = `${safeFolder}/${Date.now().toString(36)}-${base}.${ext}`;

  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.storage.from("media").createSignedUploadUrl(path);
  if (error) throw new Error(error.message);
  return { path: data.path, token: data.token };
}
