import Link from "next/link";
import { OpportunityCard } from "./opportunity-card";
import { getOpportunities } from "@/lib/data/opportunities";
import { getCountries } from "@/lib/data/countries";
import { getLifecycle } from "@/lib/lifecycle";
import type { Opportunity } from "@/lib/types";

function pickFeatured(opportunities: Opportunity[]) {
  const withStatus = opportunities
    .filter((o) => o.category !== "migracion")
    .map((o) => ({ o, lc: o.closingDate ? getLifecycle(o.closingDate) : null }))
    .filter((x) => x.lc && x.lc.status !== "cerrada");

  withStatus.sort((a, b) => (a.lc!.status === "por-cerrar" ? -1 : 0) - (b.lc!.status === "por-cerrar" ? -1 : 0));
  return withStatus.slice(0, 5).map((x) => x.o);
}

export async function FeaturedOpportunities() {
  const [opportunities, countries] = await Promise.all([getOpportunities(), getCountries()]);
  const featured = pickFeatured(opportunities);
  const countryBySlug = new Map(countries.map((c) => [c.slug, c]));

  return (
    <section className="border-t border-line bg-surface-2/60 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-navy-light">
              Curadas por el equipo
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Oportunidades destacadas</h2>
          </div>
          <Link href="/oportunidades" className="text-sm font-semibold text-navy-light hover:underline">
            Ver todas →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((o) => (
            <OpportunityCard key={o.slug} opportunity={o} country={countryBySlug.get(o.countrySlug)} />
          ))}
        </div>
      </div>
    </section>
  );
}
