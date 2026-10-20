import type { Metadata } from "next";
import Link from "next/link";
import Nav from "./Nav";

export const metadata: Metadata = { title: { default: "Admin", template: "%s — Admin" }, robots: { index: false } };

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    // Pointer cursor on every control in the panel; disabled ones show they cannot be used.
    <div
      className="min-h-svh bg-bone text-ink lg:flex [&_button:disabled]:cursor-not-allowed [&_button:not(:disabled)]:cursor-pointer [&_input[type=checkbox]]:cursor-pointer [&_select]:cursor-pointer"
    >
      <aside className="border-b border-ink/10 bg-[#ece4d6] lg:sticky lg:top-0 lg:flex lg:h-svh lg:w-60 lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-4 lg:block lg:py-6">
          <Link href="/admin" className="block font-serif text-xl leading-none">
            Integrity 360
            <span className="t-label mt-1 block text-ink/50">Admin</span>
          </Link>
          <Link href="/" target="_blank" className="t-label underline underline-offset-4 lg:mt-4 lg:inline-block">
            View site ↗
          </Link>
        </div>
        <Nav />
      </aside>
      <main className="min-w-0 flex-1 px-4 py-8 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}
