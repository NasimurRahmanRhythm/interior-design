import type { Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#151415",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Browser extensions add their own attributes to <html>/<body> before React
    // hydrates; suppress the warning for these two elements only.
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
