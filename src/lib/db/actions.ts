"use server";

import { createPublicClient } from "@/lib/supabase/public";

export type QuoteState = { status: "idle" | "sent" | "error"; message?: string };

const LIMITS = { division: 200, budget: 200, timeline: 200, name: 200, phone: 50, email: 320, message: 5000, source_page: 200 };

// Saves a quote request from the contact form. The public key may only insert
// new requests; reading them back is limited to admins.
export async function sendQuote(_prev: QuoteState, form: FormData): Promise<QuoteState> {
  const row: Record<string, string | null> = {};
  for (const [field, max] of Object.entries(LIMITS)) {
    const value = String(form.get(field) ?? "").trim();
    if (value.length > max) return { status: "error", message: `The ${field.replace("_", " ")} is too long.` };
    row[field] = value || null;
  }
  if (!row.name) return { status: "error", message: "Please add your name." };
  if (!row.phone && !row.email) return { status: "error", message: "Please add a phone number or an email." };
  if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) return { status: "error", message: "Please check the email address." };

  const { error } = await createPublicClient().from("quote_requests").insert(row as never);
  if (error) {
    console.error("Quote request failed:", error.message);
    return { status: "error", message: "We could not send your request. Please try again or reach us on WhatsApp." };
  }
  return { status: "sent" };
}
