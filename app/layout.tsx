import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CINESTRO 2026",
  description: "CINESTRO 2026 · Festival de cine de terror.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
