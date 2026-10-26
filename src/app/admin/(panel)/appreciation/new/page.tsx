import type { Metadata } from "next";
import PageTitle from "@/components/admin/PageTitle";
import WritingForm from "@/components/admin/WritingForm";
import { saveAppreciation } from "@/lib/admin/actions/writing";

export const metadata: Metadata = { title: "New appreciation" };

export default function Page() {
  return (
    <>
      <PageTitle title="New appreciation" />
      <WritingForm action={saveAppreciation.bind(null, null)} folder="appreciation" submit="Add" titleLabel="Title (e.g. the client or person)" />
    </>
  );
}
