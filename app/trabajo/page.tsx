import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { OpportunitiesExplorer } from "@/components/opportunities-explorer";
import { opportunities } from "@/lib/data/opportunities";
import { countries } from "@/lib/data/countries";

export const metadata: Metadata = {
  title: "Trabajo en el extranjero para latinoamericanos",
  description: "Empleos que patrocinan visa de trabajo o aceptan candidatos remotos desde cualquier país de Latinoamérica.",
  alternates: { canonical: "/trabajo" },
};

type SearchParams = Promise<{ pais?: string }>;

export default async function TrabajoPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  return (
    <main>
      <PageHeader
        eyebrow="Oportunidades · Trabajo"
        title="Trabajo para latinoamericanos"
        dek="Dos caminos reales: un empleador que patrocina tu visa, o un puesto remoto que no te pide reubicarte. Filtra por el que te sirve."
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
