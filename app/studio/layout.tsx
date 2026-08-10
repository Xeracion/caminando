import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel de contenido — Caminando.lat",
  robots: { index: false, follow: false },
};

/**
 * Own root layout (no <SiteHeader>/<SiteFooter>) — the Studio is a full-screen
 * app with its own chrome, deliberately separate from app/(site)/layout.tsx.
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
