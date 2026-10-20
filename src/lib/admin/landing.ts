import "server-only";
import type { requireAdmin } from "./auth";

type Supabase = Awaited<ReturnType<typeof requireAdmin>>["supabase"];

const slugWord = (w: string) =>
  w
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "");

// The web address of a new project or service: the first three words of its
// title ("Yolo Fest Concert Dhaka" -> "yolo-fest-concert"), numbered if taken.
export async function uniqueSlug(supabase: Supabase, table: "projects" | "divisions", title: string) {
  const column = table === "projects" ? "slug" : "id";
  const base = title.split(/\s+/).map(slugWord).filter(Boolean).slice(0, 3).join("-") || "item";
  const { data } = await supabase.from(table).select(column).like(column, `${base}%`);
  const taken = new Set((data ?? []).map((r: Record<string, string>) => r[column]));
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}

// The landing page position for "Show on landing page": kept if already shown,
// the next free one when newly ticked, or null when unticked.
export async function landingOrder(
  supabase: Supabase,
  table: "projects" | "divisions",
  id: string | null,
  show: boolean,
  limit: number
): Promise<{ order: number | null } | { error: string }> {
  if (!show) return { order: null };
  if (id) {
    const { data } = await supabase.from(table).select("featured_order").eq("id", id).maybeSingle();
    if (data?.featured_order != null) return { order: data.featured_order };
  }
  const { data: shown, error } = await supabase.from(table).select("featured_order").not("featured_order", "is", null);
  if (error) return { error: error.message };
  if (shown.length >= limit) {
    const what = table === "projects" ? "projects" : "services";
    return { error: `The landing page already shows ${limit} ${what}. Untick one of them first.` };
  }
  return { order: Math.max(0, ...shown.map((r) => r.featured_order as number)) + 1 };
}
