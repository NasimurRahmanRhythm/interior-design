"use client";

import { useTransition } from "react";
import { setRequestStatus } from "@/lib/admin/actions/requests";
import { input } from "@/components/admin/ui";

export default function StatusSelect({ id, status }: { id: string; status: string }) {
  const [pending, start] = useTransition();
  return (
    <select
      aria-label="Status"
      defaultValue={status}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value;
        start(() => setRequestStatus(id, next));
      }}
      className={`${input} w-auto`}
    >
      <option value="new">New</option>
      <option value="contacted">Contacted</option>
      <option value="closed">Closed</option>
    </select>
  );
}
