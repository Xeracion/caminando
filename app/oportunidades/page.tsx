import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { OpportunitiesExplorer } from "@/components/opportunities-explorer";
import { opportunities } from "@/lib/data/opportunities";
import { countries } from "@/lib/data/countries";

export const metadata: Metadata = {
  title: "Oportunidades para latinoamericanos",
  description: "Explora becas, empleos con visa y rutas de migración activas ahora mismo, por país o categoría.",
  alternates: { canonical: "/oportunidades" },
};

type SearchParams = Promise<{ q?: string; categoria?: string; pais?: string }>;

export default async function OportunidadesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  return (
    <main>
      <PageHeader
        eyebrow="Oportunidades"
        title="El directorio maestro"
        dek="Becas, trabajo y migración en un solo lugar. Filtra por lo que buscas — el catálogo crece cada semana."
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
