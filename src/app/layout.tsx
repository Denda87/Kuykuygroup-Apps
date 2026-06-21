import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kuykuy Group - Spa & Massage",
  description: "Pelayanan Mewah, Pengalaman Tak Terlupakan",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
