import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { OpportunitiesExplorer } from "@/components/opportunities-explorer";
import { getOpportunities } from "@/lib/data/opportunities";
import { getCountries } from "@/lib/data/countries";
import { getSiteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Trabajo en el extranjero para latinoamericanos",
  description: "Empleos que patrocinan visa de trabajo o aceptan candidatos remotos desde cualquier país de Latinoamérica.",
  alternates: { canonical: "/trabajo" },
};

type SearchParams = Promise<{ pais?: string }>;

export default async function TrabajoPage({ searchParams }: { searchParams: SearchParams }) {
  const [params, opportunities, countries, settings] = await Promise.all([
    searchParams,
    getOpportunities(),
    getCountries(),
    getSiteSettings(),
  ]);
  const header = settings.trabajoHeader;

  return (
    <main>
      <PageHeader
        eyebrow={header?.eyebrow || "Oportunidades · Trabajo"}
        title={header?.title || "Trabajo para latinoamericanos"}
        dek={
          header?.dek ||
          "Dos caminos reales: un empleador que patrocina tu visa, o un puesto remoto que no te pide reubicarte. Filtra por el que te sirve."
        }
      />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <OpportunitiesExplorer
          opportunities={opportunities}
          countries={countries}
          lockedCategory="trabajo"
          initialCountry={params.pais}
        />
      </div>
    </main>
  );
}
