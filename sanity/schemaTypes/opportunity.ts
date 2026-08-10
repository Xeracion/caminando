import { defineField, defineType } from "sanity";

const isMigracion = ({ document }: { document?: Record<string, unknown> }) => document?.category === "migracion";
const isTrabajo = ({ document }: { document?: Record<string, unknown> }) => document?.category === "trabajo";

export const opportunity = defineType({
  name: "opportunity",
  title: "Oportunidad",
  type: "document",
  groups: [
    { name: "contenido", title: "Contenido", default: true },
    { name: "fuente", title: "Fuente" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      group: "contenido",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "contenido",
      description: "Ideal: país-programa-nivel-año, por ejemplo espana-beca-excelencia-maestria-2026.",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      group: "contenido",
      options: {
        list: [
          { title: "Beca", value: "beca" },
          { title: "Trabajo", value: "trabajo" },
          { title: "Migración", value: "migracion" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "country",
      title: "País",
      type: "reference",
      group: "contenido",
      to: [{ type: "country" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Resumen",
      description: "2–3 frases. Es lo que se lee en la tarjeta, antes de cualquier detalle.",
      type: "text",
      group: "contenido",
      rows: 3,
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: "level",
      title: "Nivel",
      description: "Por ejemplo: Pregrado, Maestría, Doctorado, o el perfil de experiencia que pide un empleo.",
      type: "string",
      group: "contenido",
      hidden: isMigracion,
    }),
    defineField({
      name: "fundingNote",
      title: "Qué cubre",
      description: "Por ejemplo: \"Matrícula + manutención\", \"Patrocina visa\", \"100% remoto\".",
      type: "string",
      group: "contenido",
      hidden: isMigracion,
    }),
    defineField({
      name: "visaSponsorship",
      title: "Patrocina visa de trabajo",
      type: "boolean",
      group: "contenido",
      initialValue: false,
      hidden: ({ document }) => !isTrabajo({ document }),
    }),
    defineField({
      name: "remote",
      title: "Puesto 100% remoto",
      type: "boolean",
      group: "contenido",
      initialValue: false,
      hidden: ({ document }) => !isTrabajo({ document }),
    }),
    defineField({
      name: "route",
      title: "Ruta migratoria",
      description: "Cómo se agrupa esta guía en la página de Migración.",
      type: "string",
      group: "contenido",
      options: {
        list: [
          { title: "De estudio a residencia", value: "estudio-residencia" },
          { title: "De trabajo a residencia", value: "trabajo-residencia" },
          { title: "Por rentas pasivas o inversión", value: "rentas-pasivas" },
          { title: "Reunificación familiar", value: "reunificacion-familiar" },
        ],
      },
      hidden: ({ document }) => !isMigracion({ document }),
      validation: (rule) => rule.custom((value, context) => {
        const doc = context.document as Record<string, unknown> | undefined;
        if (doc?.category === "migracion" && !value) return "Obligatorio para guías de migración.";
        return true;
      }),
    }),
    defineField({
      name: "closingDate",
      title: "Fecha de cierre",
      description: "El sitio la usa para mostrar \"Activa\", \"Cierra pronto\" o \"Cerrada\" automáticamente.",
      type: "date",
      group: "contenido",
      hidden: isMigracion,
      validation: (rule) => rule.custom((value, context) => {
        const doc = context.document as Record<string, unknown> | undefined;
        if (doc?.category !== "migracion" && !value) return "Obligatorio salvo para guías de migración.";
        return true;
      }),
    }),
    defineField({
      name: "lastReviewed",
      title: "Última revisión editorial",
      description: "Las guías de migración no caducan — se marcan como revisadas periódicamente en su lugar.",
      type: "date",
      group: "contenido",
      hidden: ({ document }) => !isMigracion({ document }),
    }),
    defineField({
      name: "sourceName",
      title: "Fuente",
      description: "De dónde sale esta información (organismo oficial, universidad, guía propia…).",
      type: "string",
      group: "fuente",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sourceTier",
      title: "Nivel de la fuente",
      description: "Solo para uso interno del equipo editorial — no se muestra tal cual en el sitio.",
      type: "string",
      group: "fuente",
      options: {
        list: [
          { title: "A — feed o API pública", value: "A" },
          { title: "B — revisada manualmente por el equipo", value: "B" },
          { title: "C — curación manual puntual", value: "C" },
        ],
      },
      initialValue: "B",
    }),
  ],
  preview: {
    select: { title: "title", category: "category", countryName: "country.name" },
    prepare({ title, category, countryName }) {
      return { title, subtitle: [category, countryName].filter(Boolean).join(" · ") };
    },
  },
});
