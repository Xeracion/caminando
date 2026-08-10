import { defineField, defineType } from "sanity";

/** Singleton — see structure.ts, where it's pinned as a single non-creatable entry. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Ajustes del sitio",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Foto principal (Home)",
      description: "La fotografía a pantalla completa del inicio del sitio.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string", validation: (rule) => rule.required() }),
      ],
    }),
    defineField({
      name: "founderImage",
      title: "Foto de Pam Guerrero",
      description: "Se usa en la sección \"Sobre Pam\" del inicio y en la página /sobre-pam.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string", validation: (rule) => rule.required() }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Ajustes del sitio" };
    },
  },
});
