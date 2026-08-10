import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { OpportunityCard } from "@/components/opportunity-card";
import { getOpportunities } from "@/lib/data/opportunities";
import { getCountries, getCountry } from "@/lib/data/countries";
import { ROUTE_LABEL, ROUTE_DESCRIPTION, type MigrationRoute } from "@/lib/types";

export const metadata: Metadata = {
  title: "Rutas de migración explicadas paso a paso",
  description: "Cómo migrar de verdad: por estudio, por trabajo, por rentas propias o por reunificación familiar.",
  alternates: { canonical: "/migracion" },
};

const ROUTES: MigrationRoute[] = ["estudio-residencia", "trabajo-residencia", "rentas-pasivas", "reunificacion-familiar"];

type SearchParams = Promise<{ pais?: string }>;

export default async function MigracionPage({ searchParams }: { searchParams: SearchParams }) {
  const [{ pais }, opportunities, countries] = await Promise.all([searchParams, getOpportunities(), getCountries()]);
  const country = pais ? await getCountry(pais) : undefined;
  const countryBySlug = new Map(countries.map((c) => [c.slug, c]));

  const guides = opportunities.filter((o) => o.category === "migracion" && (country ? o.countrySlug === country.slug : true));

  return (
    <main>
      <PageHeader
        eyebrow="Oportunidades · Migración"
        title="Rutas de migración, explicadas paso a paso"
        dek="La migración casi nunca es una convocatoria con fecha de cierre — es una ruta. Organizamos nuestras guías por cómo se llega, no por cuándo cierra."
      />

      <div className="mx-auto max-w-6xl px-6 py-14">
        {country ? (
          <p className="mb-10 text-sm text-ink-muted">
            Mostrando rutas para <span className="font-semibold text-ink">{country.name}</span>.{" "}
            <Link href="/migracion" className="text-navy-light hover:underline">
              Ver todas
            </Link>
          </p>
        ) : null}

        {guides.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line-strong p-10 text-center">
            <p className="text-lg font-semibold">Todavía no tenemos una guía de migración para {country?.name}.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
              Publicamos guías nuevas cada semana.{" "}
              <Link href="/migracion" className="text-navy-light hover:underline">
                Explora las rutas disponibles
              </Link>
              .
            </p>
          </div>
        ) : (
          ROUTES.map((route) => {
            const routeGuides = guides.filter((g) => g.route === route);
            if (routeGuides.length === 0) return null;

            return (
              <section key={route} className="border-b border-line py-12 first:pt-0 last:border-b-0">
                <p className="font-body text-xs font-bold uppercase tracking-[0.12em] text-navy-light">
                  {ROUTE_LABEL[route]}
                </p>
                <p className="mt-2 max-w-xl text-sm text-ink-muted">{ROUTE_DESCRIPTION[route]}</p>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {routeGuides.map((g) => (
                    <OpportunityCard key={g.slug} opportunity={g} country={countryBySlug.get(g.countrySlug)} />
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>
    </main>
  );
}
