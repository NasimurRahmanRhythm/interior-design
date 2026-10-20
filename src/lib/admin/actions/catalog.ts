"use server";

import { refresh } from "next/cache";
import { requireAdmin } from "../auth";
import { failed, json, optional, text } from "../form";
import type { Result } from "../result";

type Supabase = Awaited<ReturnType<typeof requireAdmin>>["supabase"];

// Replaces the rows of a list: the new rows go in first and the old ones are
// removed only once that worked, so a failed save leaves the list as it was.
async function replaceRows(supabase: Supabase, table: string, match: Record<string, string> | null, rows: Record<string, unknown>[]) {
  let old = supabase.from(table).select("id");
  if (match) old = old.match(match);
  const { data: before, error: readError } = await old;
  if (readError) return readError;
  if (rows.length) {
    const { error } = await supabase.from(table).insert(rows);
    if (error) return error;
  }
  const ids = (before ?? []).map((r: { id: string }) => r.id);
  if (ids.length) {
    const { error } = await supabase.from(table).delete().in("id", ids);
    if (error) return error;
  }
  return null;
}

export async function saveClient(id: string | null, _prev: Result, form: FormData): Promise<Result> {
  const { supabase } = await requireAdmin();
  const row = {
    name: text(form, "name"),
    industry: optional(form, "industry"),
    logo_path: json<string | null>(form, "logo_path") || null,
  };
  if (!row.name) return { error: "Add the client's name." };
  const note = row.logo_path ? "" : " Without a logo it does not show on the landing page.";
  if (id) {
    const { error } = await supabase.from("clients").update(row).eq("id", id);
    if (error) return failed(error);
  } else {
    const { data: last } = await supabase.from("clients").select("sort_order").order("sort_order", { ascending: false }).limit(1);
    const { error } = await supabase.from("clients").insert({ ...row, sort_order: (last?.[0]?.sort_order ?? -1) + 1 });
    if (error) return failed(error);
  }
  refresh();
  return { ok: true, message: (id ? "Saved." : "Client added.") + note };
}

export async function deleteClient(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function saveJourney(_prev: Result, form: FormData): Promise<Result> {
  const { supabase } = await requireAdmin();
  const items = json<{ year: string; title: string; detail: string; image_path: string | null }[]>(form, "value");
  const rows = items
    .map((m, i) => ({ year: m.year.trim(), title: m.title.trim(), detail: m.detail.trim(), image_path: m.image_path || null, sort_order: i }))
    .filter((m) => m.year && m.title);
  if (rows.length < 2) return { error: "The journey needs at least two milestones." };
  const error = await replaceRows(supabase, "journey_milestones", null, rows);
  if (error) return failed(error);
  refresh();
  return { ok: true };
}
