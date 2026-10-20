import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ActionForm from "@/components/admin/ActionForm";
import JsonEditor from "@/components/admin/JsonEditor";
import PageTitle from "@/components/admin/PageTitle";
import { card } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { saveBlock } from "@/lib/admin/actions/content";

export const metadata: Metadata = { title: "Edit content" };

export default async function EditBlock({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("content_blocks").select("key, content").eq("key", key).maybeSingle();
  if (!data) notFound();
  return (
    <>
      <PageTitle title={key.replace(/_/g, " ")}>
        <Link href="/admin/content" className="t-label underline underline-offset-4">
          ← All content
        </Link>
      </PageTitle>
      <ActionForm action={saveBlock.bind(null, key)} className={card}>
        <JsonEditor name="value" value={data.content} folder="pages" />
      </ActionForm>
    </>
  );
}
