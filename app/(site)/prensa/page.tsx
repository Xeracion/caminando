import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Wordmark } from "@/components/wordmark";
import { getOpportunities } from "@/lib/data/opportunities";
import { getCountries } from "@/lib/data/countries";
import { getSiteSettings } from "@/lib/data/site-settings";
import { isActiveOrClosing } from "@/lib/lifecycle";

export const metadata: Metadata = {
  title: "Prensa",
  description: "Kit de prensa de Caminando.lat: descripción, datos y contacto directo para medios.",
  alternates: { canonical: "/prensa" },
};

const BOILERPLATE =
  "Caminando.lat es una plataforma editorial de oportunidades internacionales para latinoamericanos — becas, " +
  "trabajo y rutas de migración, explicadas por alguien que ya hizo el camino. Es un proyecto de Pam Guerrero.";

export default async function PrensaPage() {
  const [opportunities, countries, settings] = await Promise.all([getOpportunities(), getCountries(), getSiteSettings()]);
  const activeCount = opportunities.filter((o) => isActiveOrClosing(o)).length;
  const header = settings.prensaHeader;

  const facts = [
    { label: "Oportunidades activas", value: String(activeCount) },
    { label: "Países cubiertos", value: String(countries.length) },
    { label: "Fundadora", value: "Pam Guerrero" },
    { label: "Sede editorial", value: "Latinoamérica, para el mundo" },
  ];

  return (
    <main>
      <PageHeader
        eyebrow={header?.eyebrow || "Prensa"}
        title={header?.title || "Kit de prensa"}
        dek={header?.dek || "Todo lo que un medio necesita para citar a Caminando.lat como fuente, sin tener que pedirlo por correo."}
      />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold">Descripción oficial</h2>
          <p className="mt-3 text-ink-muted">{BOILERPLATE}</p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 border-y border-line py-10 sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label}>
              <p className="font-data text-2xl font-semibold text-navy-light">{f.value}</p>
              <p className="mt-1 text-xs text-ink-muted">{f.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Logotipo</h2>
            <p className="mt-2 text-sm text-ink-muted">
              El kit de logotipos descargables está en preparación. Mientras tanto, el wordmark oficial es{" "}
              <Wordmark className="text-base align-middle" /> — azul marino con &quot;.lat&quot; en naranja sobre
              blanco, o blanco con &quot;.lat&quot; en naranja sobre azul marino. Escribe a prensa para recibir los
              archivos directamente.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Contacto de prensa</h2>
            <p className="mt-2 text-sm text-ink-muted">Para entrevistas, datos o comentarios de fuente.</p>
            <a
              href="mailto:prensa@caminando.lat"
              className="mt-3 inline-block font-data text-sm font-semibold text-navy-light hover:underline"
            >
              prensa@caminando.lat
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-10">
          <h2 className="text-xl font-semibold">Menciones</h2>
          <p className="mt-2 max-w-md text-sm text-ink-muted">
            Todavía no tenemos menciones publicadas que listar aquí. En cuanto un medio cite a Caminando.lat, el
            registro aparecerá en esta sección.
          </p>
        </div>
      </div>
    </main>
  );
}
