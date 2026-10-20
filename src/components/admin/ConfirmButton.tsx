"use client";

import { useTransition } from "react";
import { danger } from "./ui";

// Runs a server action after the admin confirms, e.g. a delete. An action that
// returns { error } shows it.
export default function ConfirmButton({ action, message, children }: { action: () => Promise<unknown>; message: string; children: React.ReactNode }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      className={danger}
      disabled={pending}
      onClick={() => {
        if (!window.confirm(message)) return;
        start(async () => {
          const res = (await action()) as { error?: string } | undefined;
          if (res?.error) window.alert(res.error);
        });
      }}
    >
      {pending ? "Working…" : children}
    </button>
  );
}
