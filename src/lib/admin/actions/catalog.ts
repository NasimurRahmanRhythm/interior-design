"use server";

import { refresh } from "next/cache";
import { requireAdmin } from "../auth";
import { failed, json, number, optional, text } from "../form";
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
  const marquee = form.get("show_in_marquee") === "on";
  const row = {
    name: text(form, "name"),
    industry: optional(form, "industry"),
    show_in_marquee: marquee,
    marquee_row: marquee ? (number(form, "marquee_row") === 2 ? 2 : 1) : null,
    marquee_order: marquee ? number(form, "marquee_order") ?? 0 : null,
    sort_order: number(form, "sort_order") ?? 0,
  };
  if (!row.name) return { error: "Add the client's name." };
  const { error } = id ? await supabase.from("clients").update(row).eq("id", id) : await supabase.from("clients").insert(row);
  if (error) return failed(error);
  refresh();
  return { ok: true, message: id ? "Saved." : "Client added." };
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
