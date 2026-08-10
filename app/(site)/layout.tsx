import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "../globals.css";

const SITE_URL = "https://caminando.lat";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Caminando.lat — Oportunidades internacionales para latinoamericanos",
    template: "%s | Caminando.lat",
  },
  description:
    "Becas, trabajo y rutas de migración para latinoamericanos. Las oportunidades existen — te ayudamos a encontrarlas.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Caminando.lat",
    url: SITE_URL,
  },
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("caminando-theme");
    var dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline theme-init script below sets the
    // "dark" class before hydration based on client-only state (localStorage /
    // matchMedia), so the server-rendered class attribute intentionally
    // differs from the client's first paint.
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Caminando.lat",
              url: SITE_URL,
              description: "Plataforma editorial de oportunidades internacionales para latinoamericanos.",
              founder: { "@type": "Person", name: "Pam Guerrero" },
            }),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
