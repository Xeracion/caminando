import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { getSiteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbenos según lo que necesitas — prensa, colaboraciones o soporte.",
  alternates: { canonical: "/contacto" },
};

const ROUTES = [
  {
    title: "Prensa",
    body: "Eres periodista o medio de comunicación y quieres una fuente, un dato o una entrevista.",
    email: "prensa@caminando.lat",
  },
  {
    title: "Colaboraciones",
    body: "Representas una universidad, empleador o institución y quieres publicar una oportunidad real.",
    email: "colaboraciones@caminando.lat",
  },
  {
    title: "Soporte",
    body: "Encontraste un error, un enlace roto, o una oportunidad que ya no existe.",
    email: "soporte@caminando.lat",
  },
];

export default async function ContactoPage() {
  const settings = await getSiteSettings();
  const header = settings.contactoHeader;

  return (
    <main>
      <PageHeader
        eyebrow={header?.eyebrow || "Contacto"}
        title={header?.title || "Escríbenos según lo que necesitas"}
        dek={
          header?.dek ||
          "Sin formulario genérico: cada motivo tiene su propio correo, para que tu mensaje llegue directo a quien puede responder."
        }
      />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {ROUTES.map((r) => (
            <div key={r.title} data-reveal className="rounded-2xl border border-line bg-surface p-7">
              <h3 className="text-xl font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{r.body}</p>
              <a href={`mailto:${r.email}`} className="mt-5 inline-block font-data text-sm font-semibold text-navy-light hover:underline">
                {r.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
