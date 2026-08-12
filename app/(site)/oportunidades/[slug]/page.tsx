import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LifecycleChip, APPLY_LABEL } from "@/components/opportunity-card";
import { getOpportunities, getOpportunity } from "@/lib/data/opportunities";
import { getCountry } from "@/lib/data/countries";
import { findSimilarActive, isActiveOrClosing } from "@/lib/lifecycle";
import { CATEGORY_LABEL, ROUTE_LABEL, ROUTE_DESCRIPTION } from "@/lib/types";

const HUB_PATH = { beca: "/becas", trabajo: "/trabajo", migracion: "/migracion" } as const;

export async function generateStaticParams() {
  const opportunities = await getOpportunities();
  return opportunities.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const opportunity = await getOpportunity(slug);
  if (!opportunity) return {};

  const country = await getCountry(opportunity.countrySlug);
  return {
    title: `${opportunity.title} — ${CATEGORY_LABEL[opportunity.category]} en ${country?.name ?? opportunity.countrySlug}`,
    description: opportunity.summary,
    alternates: { canonical: `/oportunidades/${opportunity.slug}` },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });
}

export default async function OpportunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [opportunity, opportunities] = await Promise.all([getOpportunity(slug), getOpportunities()]);
  if (!opportunity) notFound();

  const country = await getCountry(opportunity.countrySlug);
  const closed = !isActiveOrClosing(opportunity);
  const similar = closed ? findSimilarActive(opportunity, opportunities) : [];
  const hubPath = HUB_PATH[opportunity.category];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: opportunity.title,
            description: opportunity.summary,
            articleSection: CATEGORY_LABEL[opportunity.category],
          }),
        }}
      />

      <div className="mx-auto max-w-3xl px-6 pb-6 pt-16">
        <Link href={hubPath} className="text-sm font-semibold text-navy-light hover:underline">
          ← {CATEGORY_LABEL[opportunity.category]}
        </Link>

        <div className="mt-6 flex items-start justify-between gap-4">
          <p className="font-body text-xs font-bold uppercase tracking-[0.12em] text-navy-light">
            {CATEGORY_LABEL[opportunity.category]} ·{" "}
            {country ? (
              <Link href={`/paises/${country.slug}`} className="hover:underline">
                {country.name}
              </Link>
            ) : (
              opportunity.countrySlug
            )}
          </p>
          <LifecycleChip opportunity={opportunity} />
        </div>

        <h1 className="mt-3 text-3xl font-semibold leading-[1.15] sm:text-4xl">{opportunity.title}</h1>
        <p className="mt-5 text-lg text-ink-muted">{opportunity.summary}</p>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <dl className="grid grid-cols-1 gap-6 border-y border-line py-8 sm:grid-cols-2">
          {opportunity.level ? (
            <div>
              <dt className="font-body text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">Nivel</dt>
              <dd className="mt-1.5 text-ink">{opportunity.level}</dd>
            </div>
          ) : null}
          {opportunity.fundingNote ? (
            <div>
              <dt className="font-body text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">Qué cubre</dt>
              <dd className="mt-1.5 text-ink">{opportunity.fundingNote}</dd>
            </div>
          ) : null}
          {opportunity.closingDate ? (
            <div>
              <dt className="font-body text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">
                Fecha de cierre
              </dt>
              <dd className="mt-1.5 text-ink">{formatDate(opportunity.closingDate)}</dd>
            </div>
          ) : null}
          {opportunity.lastReviewed ? (
            <div>
              <dt className="font-body text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">
                Última revisión editorial
              </dt>
              <dd className="mt-1.5 text-ink">{formatDate(opportunity.lastReviewed)}</dd>
            </div>
          ) : null}
          {opportunity.route ? (
            <div className="sm:col-span-2">
              <dt className="font-body text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">
                Ruta migratoria
              </dt>
              <dd className="mt-1.5 text-ink">{ROUTE_LABEL[opportunity.route]}</dd>
              <dd className="mt-1 text-sm text-ink-muted">{ROUTE_DESCRIPTION[opportunity.route]}</dd>
            </div>
          ) : null}
          <div>
            <dt className="font-body text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">Fuente</dt>
            <dd className="mt-1.5 text-ink">{opportunity.sourceName}</dd>
          </div>
        </dl>

        {!closed && opportunity.applicationUrl ? (
          <a
            href={opportunity.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-sun px-6 py-3.5 font-body text-sm font-bold text-navy-deep transition-transform hover:-translate-y-px"
          >
            {APPLY_LABEL[opportunity.category]} ↗
          </a>
        ) : null}

        {closed ? (
          <p className="mt-8 rounded-2xl border border-dashed border-line-strong p-6 text-sm text-ink-muted">
            Esta convocatoria ya cerró. La dejamos publicada porque el contenido sigue siendo útil como referencia —
            debajo tienes alternativas activas ahora mismo.
          </p>
        ) : null}

        {similar.length > 0 ? (
          <div className="mt-10 border-t border-line pt-8">
            <p className="font-body text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">Te puede interesar</p>
            <ul className="mt-3 space-y-2">
              {similar.map((s) => (
                <li key={s.slug}>
                  <Link href={`/oportunidades/${s.slug}`} className="text-sm font-semibold text-navy-light hover:underline">
                    {s.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </main>
  );
}
