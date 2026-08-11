import type { Metadata } from "next";
import Link from "next/link";
import { EditorialPhoto } from "@/components/editorial-photo";
import { getSiteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Sobre Pam Guerrero",
  description: "Quién fundó Caminando.lat y por qué — la historia detrás de la plataforma.",
  alternates: { canonical: "/sobre-pam" },
};

const TIMELINE = [
  {
    year: "Antes",
    text: "Pam construye su propio camino fuera de Latinoamérica, sin mapa y sin la persona que hoy pregunta \"¿cómo le hiciste?\".",
  },
  {
    year: "El problema",
    text: "La misma pregunta, una y otra vez, de gente con talento que no sabía por dónde empezar a buscar.",
  },
  {
    year: "Caminando.lat",
    text: "Lo que antes eran respuestas privadas se convierte en una plataforma pública: becas reales, procesos de visa, lo que nadie cuenta.",
  },
];

export default async function SobrePamPage() {
  const settings = await getSiteSettings();

  return (
    <main>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1fr] lg:items-start lg:py-24">
        <EditorialPhoto
          src={settings.founderImageUrl}
          alt={settings.founderImageAlt ?? "Pam Guerrero"}
          dataAttribute={settings.founderImageDataAttribute}
          tone="warm"
          className="aspect-[4/5]"
        />

        <div>
          <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-navy-light">La fundadora</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl">Sobre Pam Guerrero</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            Pam Guerrero construyó su propio camino fuera de Latinoamérica y descubrió, en el proceso, que la
            información que más importa casi nunca está donde uno la busca primero. Caminando.lat existe para cerrar
            esa distancia: convertir años de aprender a las malas en un lugar donde ese primer paso no dependa de
            conocer a la persona correcta.
          </p>
          <p className="mt-4 text-ink-muted">
            La misión es simple: que ningún latinoamericano con talento se quede sin intentarlo por no saber que la
            oportunidad ya existía.
          </p>

          <Link
            href="/prensa"
            className="mt-8 inline-flex rounded-lg bg-sun px-5 py-2.5 font-body text-sm font-bold text-navy-deep"
          >
            Kit de prensa
          </Link>
        </div>
      </div>

      <div className="border-t border-line bg-surface-2/60 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-navy-light">El camino</p>
          <div className="mt-6 space-y-8">
            {TIMELINE.map((t) => (
              <div key={t.year} className="flex gap-6">
                <span className="w-24 shrink-0 font-data text-sm text-ink-muted">{t.year}</span>
                <p className="text-ink">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-navy-light">Menciones en medios</p>
        <p className="mx-auto mt-4 max-w-md text-ink-muted">
          Todavía no tenemos menciones que mostrar aquí — esta sección se llenará a medida que medios e instituciones
          citen a Caminando.lat. Si eres periodista, el kit de prensa está siempre disponible.
        </p>
      </div>
    </main>
  );
}
