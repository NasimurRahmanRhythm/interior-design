import { NextResponse } from "next/server";
import { isSupabaseConfigured, SUPABASE_KEY, SUPABASE_URL } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

// Quick check after setting the Vercel env vars: are they present, and does
// Supabase answer with that URL and key? Reveals no secrets.
export async function GET() {
  if (!isSupabaseConfigured) return NextResponse.json({ configured: false, reachable: false });

  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/health`, {
      headers: { apikey: SUPABASE_KEY! },
      cache: "no-store",
    });
    return NextResponse.json({ configured: true, reachable: res.ok, status: res.status });
  } catch {
    return NextResponse.json({ configured: true, reachable: false });
  }
}
