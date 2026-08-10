"use client";

import { useMemo, useState } from "react";
import { OpportunityCard } from "./opportunity-card";
import { CATEGORY_LABEL, type Opportunity, type OpportunityCategory, type Country } from "@/lib/types";
import { findSimilarActive, isActiveOrClosing } from "@/lib/lifecycle";

type Props = {
  opportunities: Opportunity[];
  countries: Country[];
  initialQuery?: string;
  initialCategory?: string;
  initialCountry?: string;
};

const CATEGORIES: OpportunityCategory[] = ["beca", "trabajo", "migracion"];

export function OpportunitiesExplorer({ opportunities, countries, initialQuery, initialCategory, initialCountry }: Props) {
  const [query, setQuery] = useState(initialQuery ?? "");
  const [category, setCategory] = useState<OpportunityCategory | "todas">(
    CATEGORIES.includes(initialCategory as OpportunityCategory) ? (initialCategory as OpportunityCategory) : "todas",
  );
  const [country, setCountry] = useState(initialCountry ?? "todos");
  const [showClosed, setShowClosed] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return opportunities
      .filter((o) => (category === "todas" ? true : o.category === category))
      .filter((o) => (country === "todos" ? true : o.countrySlug === country))
      .filter((o) => (showClosed ? true : isActiveOrClosing(o)))
      .filter((o) => (q ? `${o.title} ${o.summary}`.toLowerCase().includes(q) : true))
      .sort((a, b) => Number(isActiveOrClosing(b)) - Number(isActiveOrClosing(a)));
  }, [opportunities, category, country, showClosed, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por palabra clave…"
          className="w-full max-w-sm rounded-lg border border-line bg-surface px-4 py-2.5 text-sm placeholder:text-ink-muted focus:border-navy-light"
        />

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
            className="rounded-lg border border-line bg-surface px-3 py-2.5 text-sm"
          >
            <option value="todas">Todas las categorías</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABEL[c]}
              </option>
            ))}
          </select>

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="rounded-lg border border-line bg-surface px-3 py-2.5 text-sm"
          >
            <option value="todos">Todos los países</option>
            {countries.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2 text-sm text-ink-muted">
            <input
              type="checkbox"
              checked={showClosed}
              onChange={(e) => setShowClosed(e.target.checked)}
              className="h-4 w-4 rounded border-line-strong"
            />
            Incluir cerradas
          </label>
        </div>
      </div>

      <p className="mt-6 font-data text-sm text-ink-muted">
        {filtered.length} resultado{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line-strong p-10 text-center">
          <p className="text-lg font-semibold">Todavía no tenemos oportunidades con esos filtros.</p>
          <p className="mt-2 text-sm text-ink-muted">
            Publicamos contenido nuevo cada semana — prueba con otro país o categoría, o suscríbete al boletín para
            que te avisemos en cuanto aparezca algo.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((o) => (
            <OpportunityCard
              key={o.slug}
              opportunity={o}
              similar={!isActiveOrClosing(o) ? findSimilarActive(o, opportunities) : []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
