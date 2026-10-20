"use client";

import { createClient } from "@/lib/supabase/client";
import { signUpload } from "./actions/media";

const TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX = 15 * 1024 * 1024;

export type Uploaded = { path: string; width: number; height: number };

// Uploads an image from the browser to the "media" bucket through a signed URL
// from the server, and returns where it went and its size.
export async function uploadImage(file: File, folder: string): Promise<Uploaded> {
  if (!TYPES.includes(file.type)) throw new Error(`${file.name}: use a JPG, PNG, WebP or AVIF image.`);
  if (file.size > MAX) throw new Error(`${file.name}: images can be up to 15 MB.`);

  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;
  bitmap.close();

  const { path, token } = await signUpload(folder, file.name, file.type);
  const { error } = await createClient()
    .storage.from("media")
    .uploadToSignedUrl(path, token, file, { contentType: file.type, cacheControl: "31536000" });
  if (error) throw new Error(`${file.name}: ${error.message}`);
  return { path, width, height };
}
