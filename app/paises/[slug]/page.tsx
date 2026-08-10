import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { OpportunityCard } from "@/components/opportunity-card";
import { StoryCard } from "@/components/story-card";
import { countries, getCountry } from "@/lib/data/countries";
import { getOpportunitiesByCountry } from "@/lib/data/opportunities";
import { getStoriesByCountry } from "@/lib/data/stories";
import { CATEGORY_LABEL } from "@/lib/types";

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) return {};
  return {
    title: `Oportunidades en ${country.name} para latinoamericanos`,
    description: country.tagline,
    alternates: { canonical: `/paises/${country.slug}` },
  };
}

const SUB_HUBS = ["Becas", "Trabajo", "Migración", "Costo de vida"];

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();

  const countryOpportunities = getOpportunitiesByCountry(country.slug);
  const activeCount = countryOpportunities.length;
  const countryStories = getStoriesByCountry(country.slug);

  return (
    <main>
      <PageHeader
        eyebrow={`Países · ${country.name}`}
        title={`Oportunidades en ${country.name} para latinoamericanos`}
        dek={country.tagline}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Países", item: "/paises" },
              { "@type": "ListItem", position: 2, name: country.name, item: `/paises/${country.slug}` },
            ],
          }),
        }}
      />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-wrap gap-2">
          {SUB_HUBS.map((hub) => (
            <span
              key={hub}
              className="rounded-full border border-dashed border-line-strong px-3.5 py-1.5 text-sm text-ink-muted"
            >
              {hub}
            </span>
          ))}
        </div>

        {activeCount === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-line-strong p-10 text-center">
            <p className="text-lg font-semibold">
              Aún no tenemos oportunidades publicadas en {country.name}.
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
              Este hub se está construyendo. Suscríbete al boletín y te avisamos en cuanto publiquemos la primera
              oportunidad de {country.name}.
            </p>
            <Link
              href="/#newsletter"
              className="mt-6 inline-flex rounded-lg bg-sun px-5 py-2.5 font-body text-sm font-bold text-navy-deep"
            >
              Avísenme
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {countryOpportunities.map((o) => (
              <OpportunityCard key={o.slug} opportunity={o} />
            ))}
          </div>
        )}

        {countryStories.length > 0 ? (
          <div className="mt-16 border-t border-line pt-12">
            <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-navy-light">
              Historias en {country.name}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {countryStories.map((s) => (
                <StoryCard key={s.slug} story={s} />
              ))}
            </div>
          </div>
        ) : null}

        <p className="mt-16 text-xs text-ink-muted">
          Categorías disponibles al momento:{" "}
          {[...new Set(countryOpportunities.map((o) => CATEGORY_LABEL[o.category]))].join(", ") || "ninguna todavía"}
        </p>
      </div>
    </main>
  );
}
