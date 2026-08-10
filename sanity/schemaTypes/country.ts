import { defineField, defineType } from "sanity";

export const country = defineType({
  name: "country",
  title: "País",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description: "Se usa en la dirección web, por ejemplo /paises/espana.",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "region",
      title: "Región",
      type: "string",
      options: {
        list: ["Europa", "Norteamérica", "Centroamérica", "Sudamérica", "Asia", "Oceanía", "África"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Frase editorial",
      description: "Una o dos líneas que resumen por qué este país es un buen destino. Aparece en el encabezado del hub de país.",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().max(220),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "region" },
  },
});
