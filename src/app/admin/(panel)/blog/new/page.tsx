import type { Metadata } from "next";
import PageTitle from "@/components/admin/PageTitle";
import WritingForm from "@/components/admin/WritingForm";
import { savePost } from "@/lib/admin/actions/writing";

export const metadata: Metadata = { title: "New post" };

export default function Page() {
  return (
    <>
      <PageTitle title="New post" />
      <WritingForm action={savePost.bind(null, null)} folder="blog" submit="Publish post" titleLabel="Title" />
    </>
  );
}
