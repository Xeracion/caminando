import { defineField, defineType } from "sanity";

export const story = defineType({
  name: "story",
  title: "Historia",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Titular",
      description: "Editorial, no de venta. Ej: \"De Bogotá a un laboratorio en Múnich\", no \"¡Increíble historia de éxito!\".",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "headline" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dek",
      title: "Bajada",
      description: "1–2 frases que aparecen debajo del titular, en las tarjetas y en la portada de la historia.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "image",
      title: "Fotografía",
      type: "image",
      options: { hotspot: true },
      description: "Persona real, luz natural, mínima edición — nunca stock genérico.",
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          description: "Describe la foto para lectores de pantalla y buscadores.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "country",
      title: "País de destino",
      type: "reference",
      to: [{ type: "country" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "originCountry",
      title: "País de origen",
      description: "De dónde es la persona protagonista, ej. \"Colombia\".",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "theme",
      title: "Tema",
      type: "string",
      options: { list: ["Becas", "Trabajo", "Migración", "Historias"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readingMinutes",
      title: "Minutos de lectura",
      type: "number",
      validation: (rule) => rule.required().min(1).max(60),
    }),
    defineField({
      name: "body",
      title: "Cuerpo del reportaje",
      description: "El artículo completo. Déjalo vacío mientras la historia solo exista como tarjeta resumen.",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: { title: "headline", subtitle: "theme", media: "image" },
  },
});
