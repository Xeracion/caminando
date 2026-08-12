import Link from "next/link";
import { EditorialPhoto } from "./editorial-photo";
import { getSiteSettings } from "@/lib/data/site-settings";

export async function AboutPam() {
  const settings = await getSiteSettings();

  return (
    <section id="sobre-pam" className="border-t border-line bg-navy py-20 text-paper">
      <div data-reveal className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.85fr_1fr] lg:items-center">
        <EditorialPhoto
          src={settings.founderImageUrl}
          alt={settings.founderImageAlt ?? "Pam Guerrero"}
          dataAttribute={settings.founderImageDataAttribute}
          tone="warm"
          className="aspect-[4/5]"
        />

        <div>
          <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-paper/60">
            {settings.aboutTeaserEyebrow || "Sobre la fundadora"}
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            {settings.aboutTeaserTitle || "Un proyecto de Pam Guerrero"}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/85">
            {settings.aboutTeaserBody1 || (
              <>
                Caminando.lat nació de una pregunta simple que Pam escuchaba una y otra vez: &ldquo;¿cómo le
                hiciste?&rdquo;. Después de construir su propio camino fuera de Latinoamérica, decidió convertir lo
                que aprendió —becas reales, procesos de visa, lo que nadie cuenta— en una plataforma para que ese
                primer paso no dependa de tener el contacto correcto.
              </>
            )}
          </p>
          <p className="mt-4 max-w-xl text-paper/70">
            {settings.aboutTeaserBody2 ||
              "La misión es simple: que ningún latinoamericano con talento se quede sin intentarlo por no saber que la oportunidad ya existía."}
          </p>
          <Link href="/sobre-pam" className="mt-6 inline-block text-sm font-semibold text-paper hover:underline">
            {settings.aboutTeaserLinkLabel || "Conoce más sobre Pam →"}
          </Link>
        </div>
      </div>
    </section>
  );
}
