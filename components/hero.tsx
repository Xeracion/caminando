import Link from "next/link";
import { EditorialPhoto } from "./editorial-photo";
import { SearchBar } from "./search-bar";
import { getSiteSettings } from "@/lib/data/site-settings";

export async function Hero() {
  const settings = await getSiteSettings();

  return (
    <section className="relative">
      <div className="relative flex min-h-[78vh] items-end overflow-hidden sm:min-h-[86vh]">
        <EditorialPhoto
          src={settings.heroImageUrl}
          alt={settings.heroImageAlt ?? "Fotografía editorial — por definir"}
          dataAttribute={settings.heroImageDataAttribute}
          fill
          rounded={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/25 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-32 sm:pb-28">
          <p className="font-body text-xs font-bold uppercase tracking-[0.16em] text-paper/70">
            Plataforma editorial de oportunidades internacionales
          </p>
          <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.06] text-paper sm:text-6xl">
            Las oportunidades existen. Te ayudamos a encontrarlas.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-paper/85">
            Becas, trabajo y rutas de migración para latinoamericanos, explicadas por alguien que ya hizo el camino.
          </p>
          <Link
            href="/oportunidades"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-sun px-6 py-3.5 font-body text-sm font-bold text-navy-deep transition-transform hover:-translate-y-px"
          >
            Explorar oportunidades
          </Link>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-10 max-w-4xl px-6 sm:-mt-14">
        <SearchBar />
      </div>
    </section>
  );
}
