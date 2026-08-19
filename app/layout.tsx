import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cinestro.signaltandem.com"),
  title: "CINESTRO 2026",
  description: "CINESTRO 2026 · Festival de cine de terror.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CINESTRO 2026",
    description: "CINESTRO 2026 · Festival de cine de terror.",
    locale: "es_MX",
    type: "website",
    images: [{ url: "/cinestro-referencia.jpeg", width: 1366, height: 645, alt: "CINESTRO 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CINESTRO 2026",
    description: "CINESTRO 2026 · Festival de cine de terror.",
    images: ["/cinestro-referencia.jpeg"],
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07090c",
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
