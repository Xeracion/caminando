import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { OpportunitiesExplorer } from "@/components/opportunities-explorer";
import { getOpportunities } from "@/lib/data/opportunities";
import { getCountries } from "@/lib/data/countries";
import { getSiteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Oportunidades para latinoamericanos",
  description: "Explora becas, empleos con visa y rutas de migración activas ahora mismo, por país o categoría.",
  alternates: { canonical: "/oportunidades" },
};

type SearchParams = Promise<{ q?: string; categoria?: string; pais?: string }>;

export default async function OportunidadesPage({ searchParams }: { searchParams: SearchParams }) {
  const [params, opportunities, countries, settings] = await Promise.all([
    searchParams,
    getOpportunities(),
    getCountries(),
    getSiteSettings(),
  ]);
  const header = settings.oportunidadesHeader;

  return (
    <main>
      <PageHeader
        eyebrow={header?.eyebrow || "Oportunidades"}
        title={header?.title || "El directorio maestro"}
        dek={header?.dek || "Becas, trabajo y migración en un solo lugar. Filtra por lo que buscas — el catálogo crece cada semana."}
      />
      <div className="mx-auto max-w-6xl px-6 py-14">
        <OpportunitiesExplorer
          opportunities={opportunities}
          countries={countries}
          initialQuery={params.q}
          initialCategory={params.categoria}
          initialCountry={params.pais}
        />
      </div>
    </main>
  );
}
