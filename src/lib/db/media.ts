import { SUPABASE_URL } from "@/lib/supabase/env";

// Public URL of a file in the "media" storage bucket.
export function mediaUrl(path: string): string;
export function mediaUrl(path: string | null | undefined): string | undefined;
export function mediaUrl(path: string | null | undefined) {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  return `${SUPABASE_URL}/storage/v1/object/public/media/${path.split("/").map(encodeURIComponent).join("/")}`;
}
