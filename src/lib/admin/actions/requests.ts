"use server";

import { refresh } from "next/cache";
import { requireAdmin } from "../auth";

const STATUSES = ["new", "contacted", "closed"];

export async function setRequestStatus(id: string, status: string) {
  if (!STATUSES.includes(status)) return;
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("quote_requests").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function deleteRequest(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("quote_requests").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}
