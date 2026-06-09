import type { ReactNode } from "react";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
