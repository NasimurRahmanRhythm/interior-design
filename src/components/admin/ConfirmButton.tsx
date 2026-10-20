"use client";

import { useTransition } from "react";
import { danger } from "./ui";

// Runs a server action after the admin confirms, e.g. a delete.
export default function ConfirmButton({ action, message, children }: { action: () => Promise<unknown>; message: string; children: React.ReactNode }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      className={danger}
      disabled={pending}
      onClick={() => {
        if (window.confirm(message)) start(() => action().then(() => undefined));
      }}
    >
      {pending ? "Working…" : children}
    </button>
  );
}
