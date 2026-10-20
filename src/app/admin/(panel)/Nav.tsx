"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/requests", label: "Quote requests" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/divisions", label: "Divisions" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/journey", label: "Journey" },
  { href: "/admin/content", label: "Page content" },
  { href: "/admin/settings", label: "Settings" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:pb-0">
      {LINKS.map((l) => {
        const on = l.href === "/admin" ? path === "/admin" : path.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`shrink-0 rounded-sm px-3 py-2 text-sm transition-colors ${on ? "bg-ink text-bone" : "hover:bg-ink/5"}`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
