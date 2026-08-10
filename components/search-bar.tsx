import Link from "next/link";
import { countries } from "@/lib/data/countries";

const CATEGORIES = [
  { href: "/becas", label: "Becas" },
  { href: "/trabajo", label: "Trabajo" },
  { href: "/migracion", label: "Migración" },
];

/**
 * Etapa 1 — Revista: a modest entry point, not a faceted search implying an
 * inventory we don't have yet. It shares one destination (/oportunidades)
 * and the same data model that later stages will expand into a full
 * faceted search, so nothing here needs to be rebuilt as the catalog grows.
 */
export function SearchBar() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-[0_24px_48px_-28px_rgba(15,42,74,0.35)] sm:p-8">
      <form action="/oportunidades" className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="q" className="sr-only">
          Buscar oportunidades
        </label>
        <input
          id="q"
          name="q"
          type="text"
          placeholder="Ej. beca de maestría en Alemania"
          className="w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-navy-light"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-navy px-6 py-3 font-body text-sm font-bold text-paper transition-colors hover:bg-navy-deep"
        >
          Buscar
        </button>
      </form>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-5">
        <span className="mr-1 font-body text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">
          Explora
        </span>
        {CATEGORIES.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-navy-light hover:text-navy-light"
          >
            {c.label}
          </Link>
        ))}
        <span className="mx-1 text-line-strong">·</span>
        {countries.slice(0, 4).map((c) => (
          <Link
            key={c.slug}
            href={`/paises/${c.slug}`}
            className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-navy-light hover:text-navy-light"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
