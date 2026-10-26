import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/admin/PageTitle";
import WritingList from "@/components/admin/WritingList";
import { button } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Blog" };

export default async function Page() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("blog_posts").select("id, title, image_path, created_at").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (
    <>
      <PageTitle title="Blog" text="Posts show on the landing page (latest three) and on /blog.">
        <Link href="/admin/blog/new" className={button}>
          New post
        </Link>
      </PageTitle>
      <WritingList items={data} base="/admin/blog" empty="No posts yet." />
    </>
  );
}
