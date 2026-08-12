import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { OpportunitiesExplorer } from "@/components/opportunities-explorer";
import { getOpportunities } from "@/lib/data/opportunities";
import { getCountries } from "@/lib/data/countries";
import { getSiteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Becas para estudiar en el extranjero",
  description: "Becas de pregrado, maestría y doctorado para latinoamericanos, con cobertura y requisitos claros.",
  alternates: { canonical: "/becas" },
};

const STEPS = [
  {
    title: "Revisa qué cubre de verdad",
    body: "Matrícula, manutención y seguro médico no siempre van juntos — lee el detalle antes de ilusionarte con el titular.",
  },
  {
    title: "Prepara documentos con meses de anticipación",
    body: "Cartas de recomendación, certificados apostillados y pruebas de idioma toman más tiempo del que parece.",
  },
  {
    title: "Postula a más de una",
    body: "Las becas más competitivas reciben miles de postulaciones. Diversificar sube tus probabilidades reales.",
  },
];

type SearchParams = Promise<{ pais?: string }>;

export default async function BecasPage({ searchParams }: { searchParams: SearchParams }) {
  const [params, opportunities, countries, settings] = await Promise.all([
    searchParams,
    getOpportunities(),
    getCountries(),
    getSiteSettings(),
  ]);
  const header = settings.becasHeader;

  return (
    <main>
      <PageHeader
        eyebrow={header?.eyebrow || "Oportunidades · Becas"}
        title={header?.title || "Becas para latinoamericanos"}
        dek={header?.dek || "Pregrado, maestría y doctorado, financiados total o parcialmente. Filtra por nivel y país."}
      />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-6 border-b border-line pb-14 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} data-reveal>
              <p className="font-data text-xs font-semibold text-navy-light">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-base font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="pt-14">
          <OpportunitiesExplorer
            opportunities={opportunities}
            countries={countries}
            lockedCategory="beca"
            initialCountry={params.pais}
          />
        </div>
      </div>
    </main>
  );
}
