"use server";

import { refresh } from "next/cache";
import { requireAdmin } from "../auth";
import { failed, json } from "../form";
import type { Result } from "../result";

const SETTINGS = ["brand", "contact", "trust_stats", "quote_options", "reach"] as const;
export type SettingsColumn = (typeof SETTINGS)[number];

export async function saveSettings(column: SettingsColumn, _prev: Result, form: FormData): Promise<Result> {
  if (!SETTINGS.includes(column)) return { error: "Unknown setting." };
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("site_settings").update({ [column]: json(form, "value") }).eq("id", 1);
  if (error) return failed(error);
  refresh();
  return { ok: true };
}
