import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConfirmButton from "@/components/admin/ConfirmButton";
import PageTitle from "@/components/admin/PageTitle";
import WritingForm, { type Writing } from "@/components/admin/WritingForm";
import { ghost } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { deletePost, savePost } from "@/lib/admin/actions/writing";

export const metadata: Metadata = { title: "Edit" };

export default async function Page({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data: item } = await supabase.from("blog_posts").select("id, slug, title, body, image_path").eq("id", id).maybeSingle();
  if (!item) notFound();
  return (
    <>
      <PageTitle title={item.title} text={(await searchParams).created ? "Saved. It is on the website now." : undefined}>
        <Link href={`/blog/${item.slug}`} target="_blank" className={ghost}>
          View on site ↗
        </Link>
      </PageTitle>
      <WritingForm
        key={item.id}
        action={savePost.bind(null, item.id)}
        item={item as Writing}
        folder="blog"
        submit="Save post"
        titleLabel="Title"
        extra={
          <ConfirmButton action={deletePost.bind(null, item.id)} message={`Delete “${item.title}”?`}>
            Delete
          </ConfirmButton>
        }
      />
    </>
  );
}
