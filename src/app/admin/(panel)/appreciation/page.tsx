import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/admin/PageTitle";
import WritingList from "@/components/admin/WritingList";
import { button } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Client appreciation" };

export default async function Page() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("appreciations").select("id, title, image_path, created_at").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (
    <>
      <PageTitle title="Client appreciation" text="What clients say about working with you, shown on the landing page.">
        <Link href="/admin/appreciation/new" className={button}>
          New appreciation
        </Link>
      </PageTitle>
      <WritingList items={data} base="/admin/appreciation" empty="Nothing here yet." />
    </>
  );
}
