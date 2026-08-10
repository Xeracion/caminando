import Link from "next/link";
import { PhotoPlaceholder } from "./photo-placeholder";
import { opportunities } from "@/lib/data/opportunities";
import { isActiveOrClosing } from "@/lib/lifecycle";

const ITEMS = [
  {
    href: "/becas",
    title: "Estudiar",
    copy: "Becas de pregrado, maestría y doctorado en universidades de todo el mundo.",
    category: "beca" as const,
  },
  {
    href: "/trabajo",
    title: "Trabajar",
    copy: "Empleos que patrocinan visa o aceptan candidatos remotos desde Latinoamérica.",
    category: "trabajo" as const,
  },
  {
    href: "/migracion",
    title: "Migrar",
    copy: "Rutas explicadas paso a paso: de estudio o trabajo a la residencia permanente.",
    category: "migracion" as const,
  },
  {
    href: "/historias",
    title: "Historias",
    copy: "Reportajes reales de personas que ya hicieron el camino, con lo bueno y lo difícil.",
    category: null,
  },
];

function countLabel(category: (typeof ITEMS)[number]["category"]) {
  if (!category) return "Reportajes reales";
  const count = opportunities.filter((o) => o.category === category && isActiveOrClosing(o)).length;
  if (count === 0) return "Muy pronto, las primeras";
  return `${count} activa${count === 1 ? "" : "s"} ahora mismo`;
}

export function QuickAccess() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <Link key={item.title} href={item.href} className="group block">
            <PhotoPlaceholder caption={item.title} className="aspect-[4/5]" />
            <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
            <p className="mt-1.5 text-sm text-ink-muted">{item.copy}</p>
            <p className="mt-2 font-data text-xs font-semibold text-navy-light">{countLabel(item.category)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
