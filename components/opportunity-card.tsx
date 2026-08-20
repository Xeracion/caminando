import Link from "next/link";
import { CATEGORY_HUB_PATH, CATEGORY_LABEL, type Country, type Opportunity, type OpportunityCategory } from "@/lib/types";
import { getLifecycle } from "@/lib/lifecycle";

export const APPLY_LABEL: Record<OpportunityCategory, string> = {
  beca: "Solicitar esta beca",
  trabajo: "Postular a este empleo",
  migracion: "Ver fuente oficial",
};

export function LifecycleChip({ opportunity }: { opportunity: Opportunity }) {
  if (!opportunity.closingDate) {
    return (
      <span className="rounded-full border border-line-strong px-3 py-1 font-data text-xs text-ink-muted">
        Guía revisada · {opportunity.lastReviewed}
      </span>
    );
  }

  const { status, label } = getLifecycle(opportunity.closingDate);

  if (status === "cerrada") {
    return (
      <span className="rounded-full border border-dashed border-line-strong px-3 py-1 font-data text-xs text-ink-muted">
        {label}
      </span>
    );
  }
  if (status === "por-cerrar") {
    return (
      <span className="rounded-full bg-urgent-bg px-3 py-1 font-data text-xs font-semibold text-urgent-text">
        {label}
      </span>
    );
  }
  return (
    <span className="rounded-full border border-line-strong px-3 py-1 font-data text-xs text-ink-muted">
      {label}
    </span>
  );
}

export function OpportunityCard({
  opportunity,
  country,
  similar = [],
}: {
  opportunity: Opportunity;
  /** Resolved by the caller (sync lookup) — keeps this component usable from the client-side explorer. */
  country?: Country;
  similar?: Opportunity[];
}) {
  const closed = opportunity.closingDate ? getLifecycle(opportunity.closingDate).status === "cerrada" : false;

  return (
    <article data-reveal className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <p className="font-body text-xs font-bold uppercase tracking-[0.12em] text-navy-light">
          <Link href={CATEGORY_HUB_PATH[opportunity.category]} className="hover:underline">
            {CATEGORY_LABEL[opportunity.category]}
          </Link>{" "}
          ·{" "}
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

      <h3 className="mt-3 text-xl font-semibold leading-snug">
        <Link href={`/oportunidades/${opportunity.slug}`} className="hover:text-navy-light">
          {opportunity.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-4 text-[0.95rem] text-ink-muted">{opportunity.summary}</p>

      {opportunity.level || opportunity.fundingNote ? (
        <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-ink-muted">
          {opportunity.level ? (
            <div className="flex gap-1.5">
              <dt className="font-semibold text-ink">Nivel:</dt>
              <dd>{opportunity.level}</dd>
            </div>
          ) : null}
          {opportunity.fundingNote ? (
            <div className="flex gap-1.5">
              <dt className="font-semibold text-ink">Cubre:</dt>
              <dd>{opportunity.fundingNote}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      {closed && similar.length > 0 ? (
        <div className="mt-5 border-t border-line pt-4">
          <p className="font-body text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">
            Te puede interesar
          </p>
          <ul className="mt-2 space-y-1">
            {similar.map((s) => (
              <li key={s.slug}>
                <Link href={`/oportunidades/${s.slug}`} className="text-sm text-navy-light hover:underline">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-auto pt-5">
        <Link
          href={`/oportunidades/${opportunity.slug}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2.5 font-body text-sm font-semibold text-ink transition-colors hover:border-navy-light hover:text-navy-light"
        >
          Más información
        </Link>
      </div>
    </article>
  );
}
