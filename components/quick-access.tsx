import Link from "next/link";
import { EditorialPhoto } from "./editorial-photo";
import { getOpportunities } from "@/lib/data/opportunities";
import { getSiteSettings } from "@/lib/data/site-settings";
import { isActiveOrClosing } from "@/lib/lifecycle";
import type { Opportunity, SiteSettings } from "@/lib/types";

const ITEMS = [
  {
    href: "/becas",
    title: "Estudiar",
    copy: "Becas de pregrado, maestría y doctorado en universidades de todo el mundo.",
    category: "beca" as const,
    imageKey: "quickAccessEstudiar" as const,
  },
  {
    href: "/trabajo",
    title: "Trabajar",
    copy: "Empleos que patrocinan visa o aceptan candidatos remotos desde Latinoamérica.",
    category: "trabajo" as const,
    imageKey: "quickAccessTrabajar" as const,
  },
  {
    href: "/migracion",
    title: "Migrar",
    copy: "Rutas explicadas paso a paso: de estudio o trabajo a la residencia permanente.",
    category: "migracion" as const,
    imageKey: "quickAccessMigrar" as const,
  },
  {
    href: "/historias",
    title: "Historias",
    copy: "Reportajes reales de personas que ya hicieron el camino, con lo bueno y lo difícil.",
    category: null,
    imageKey: "quickAccessHistorias" as const,
  },
];

function cardImage(settings: SiteSettings, item: (typeof ITEMS)[number]) {
  const key = item.imageKey;
  return {
    src: settings[`${key}ImageUrl`],
    alt: settings[`${key}ImageAlt`] ?? item.title,
    dataAttribute: settings[`${key}ImageDataAttribute`],
  };
}

function countLabel(opportunities: Opportunity[], category: (typeof ITEMS)[number]["category"]) {
  if (!category) return "Reportajes reales";
  const count = opportunities.filter((o) => o.category === category && isActiveOrClosing(o)).length;
  if (count === 0) return "Muy pronto, las primeras";
  return `${count} activa${count === 1 ? "" : "s"} ahora mismo`;
}

export async function QuickAccess() {
  const [opportunities, settings] = await Promise.all([getOpportunities(), getSiteSettings()]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => {
          const image = cardImage(settings, item);
          return (
            <Link key={item.title} href={item.href} data-reveal className="group block">
              <EditorialPhoto
                src={image.src}
                alt={image.alt}
                dataAttribute={image.dataAttribute}
                className="aspect-[4/5]"
              />
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{item.copy}</p>
              <p className="mt-2 font-data text-xs font-semibold text-navy-light">
                {countLabel(opportunities, item.category)}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
