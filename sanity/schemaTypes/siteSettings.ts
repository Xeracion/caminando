import { defineField, defineType } from "sanity";

const pageHeaderFields = (defaults: { eyebrow: string; title: string; dek: string }) => [
  defineField({
    name: "eyebrow",
    title: "Etiqueta pequeña (arriba del título)",
    type: "string",
    description: `Si se deja vacío, se usa: "${defaults.eyebrow}"`,
  }),
  defineField({
    name: "title",
    title: "Título",
    type: "string",
    description: `Si se deja vacío, se usa: "${defaults.title}"`,
  }),
  defineField({
    name: "dek",
    title: "Bajada",
    type: "text",
    rows: 2,
    description: `Si se deja vacío, se usa: "${defaults.dek}"`,
  }),
];

const pageHeader = (name: string, title: string, defaults: { eyebrow: string; title: string; dek: string }) =>
  defineField({
    name,
    title,
    type: "object",
    group: "paginas",
    fields: pageHeaderFields(defaults),
  });

/** Singleton — see structure.ts, where it's pinned as a single non-creatable entry. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Ajustes del sitio",
  type: "document",
  groups: [
    { name: "fotos", title: "Fotos", default: true },
    { name: "inicio", title: "Inicio" },
    { name: "sobrePam", title: "Página Sobre Pam" },
    { name: "paginas", title: "Encabezados de página" },
    { name: "otros", title: "Footer y newsletter" },
  ],
  fields: [
    // — Fotos —
    defineField({
      name: "heroImage",
      title: "Foto principal (Home)",
      description: "La fotografía a pantalla completa del inicio del sitio.",
      type: "image",
      group: "fotos",
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
      group: "fotos",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string", validation: (rule) => rule.required() }),
      ],
    }),
    defineField({
      name: "quickAccessEstudiarImage",
      title: "Foto de la tarjeta \"Estudiar\" (Home)",
      description: "La tarjeta de acceso rápido a Becas, en la portada.",
      type: "image",
      group: "fotos",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string", validation: (rule) => rule.required() }),
      ],
    }),
    defineField({
      name: "quickAccessTrabajarImage",
      title: "Foto de la tarjeta \"Trabajar\" (Home)",
      description: "La tarjeta de acceso rápido a Trabajo, en la portada.",
      type: "image",
      group: "fotos",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string", validation: (rule) => rule.required() }),
      ],
    }),
    defineField({
      name: "quickAccessMigrarImage",
      title: "Foto de la tarjeta \"Migrar\" (Home)",
      description: "La tarjeta de acceso rápido a Migración, en la portada.",
      type: "image",
      group: "fotos",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string", validation: (rule) => rule.required() }),
      ],
    }),
    defineField({
      name: "quickAccessHistoriasImage",
      title: "Foto de la tarjeta \"Historias\" (Home)",
      description: "La tarjeta de acceso rápido a Historias, en la portada.",
      type: "image",
      group: "fotos",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string", validation: (rule) => rule.required() }),
      ],
    }),

    // — Inicio: Hero —
    defineField({
      name: "heroEyebrow",
      title: "Etiqueta pequeña",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "Plataforma editorial de oportunidades internacionales"',
    }),
    defineField({
      name: "heroHeadline",
      title: "Titular principal",
      type: "string",
      group: "inicio",
      description: 'La promesa de marca. Si se deja vacío, se usa: "Las oportunidades existen. Te ayudamos a encontrarlas."',
    }),
    defineField({
      name: "heroSubheadline",
      title: "Subtítulo",
      type: "text",
      rows: 2,
      group: "inicio",
      description:
        'Si se deja vacío, se usa: "Becas, trabajo y rutas de migración para latinoamericanos, explicadas por alguien que ya hizo el camino."',
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Texto del botón principal",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "Explorar oportunidades"',
    }),

    // — Inicio: resumen de Pam —
    defineField({
      name: "aboutTeaserEyebrow",
      title: "[Resumen en Home] Etiqueta pequeña",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "Sobre la fundadora"',
    }),
    defineField({
      name: "aboutTeaserTitle",
      title: "[Resumen en Home] Título",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "Un proyecto de Pam Guerrero"',
    }),
    defineField({
      name: "aboutTeaserBody1",
      title: "[Resumen en Home] Primer párrafo",
      type: "text",
      rows: 4,
      group: "inicio",
      description: "Si se deja vacío, se usa el párrafo original sobre por qué nació Caminando.lat.",
    }),
    defineField({
      name: "aboutTeaserBody2",
      title: "[Resumen en Home] Segundo párrafo",
      type: "text",
      rows: 3,
      group: "inicio",
      description: "Si se deja vacío, se usa el párrafo original sobre la misión.",
    }),
    defineField({
      name: "aboutTeaserLinkLabel",
      title: "[Resumen en Home] Texto del enlace",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "Conoce más sobre Pam →"',
    }),

    // — Página Sobre Pam —
    defineField({
      name: "aboutPageEyebrow",
      title: "Etiqueta pequeña",
      type: "string",
      group: "sobrePam",
      description: 'Si se deja vacío, se usa: "La fundadora"',
    }),
    defineField({
      name: "aboutPageTitle",
      title: "Título",
      type: "string",
      group: "sobrePam",
      description: 'Si se deja vacío, se usa: "Sobre Pam Guerrero"',
    }),
    defineField({
      name: "aboutPageIntro",
      title: "Párrafo de introducción",
      type: "text",
      rows: 5,
      group: "sobrePam",
      description: "Si se deja vacío, se usa el párrafo original de introducción.",
    }),
    defineField({
      name: "aboutPageMission",
      title: "Párrafo de misión",
      type: "text",
      rows: 3,
      group: "sobrePam",
      description: "Si se deja vacío, se usa el párrafo original de misión.",
    }),
    defineField({
      name: "aboutPageCtaLabel",
      title: "Texto del botón",
      type: "string",
      group: "sobrePam",
      description: 'Si se deja vacío, se usa: "Kit de prensa"',
    }),
    defineField({
      name: "timeline",
      title: "Línea de tiempo (\"El camino\")",
      type: "array",
      group: "sobrePam",
      description: "Si se deja vacío, se usa la línea de tiempo original de 3 pasos.",
      of: [
        {
          type: "object",
          name: "timelineEntry",
          fields: [
            defineField({ name: "year", title: "Etiqueta (ej. \"Antes\", \"2024\")", type: "string", validation: (r) => r.required() }),
            defineField({ name: "text", title: "Texto", type: "text", rows: 2, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "year", subtitle: "text" } },
        },
      ],
    }),
    defineField({
      name: "mentionsEmptyText",
      title: "Texto cuando no hay menciones en medios todavía",
      type: "text",
      rows: 2,
      group: "sobrePam",
      description: "Si se deja vacío, se usa el texto original de \"todavía no tenemos menciones\".",
    }),

    // — Encabezados de página —
    pageHeader("oportunidadesHeader", "Oportunidades", {
      eyebrow: "Oportunidades",
      title: "El directorio maestro",
      dek: "Becas, trabajo y migración en un solo lugar. Filtra por lo que buscas — el catálogo crece cada semana.",
    }),
    pageHeader("becasHeader", "Becas", {
      eyebrow: "Oportunidades · Becas",
      title: "Becas para latinoamericanos",
      dek: "Pregrado, maestría y doctorado, financiados total o parcialmente. Filtra por nivel y país.",
    }),
    pageHeader("trabajoHeader", "Trabajo", {
      eyebrow: "Oportunidades · Trabajo",
      title: "Trabajo para latinoamericanos",
      dek: "Dos caminos reales: un empleador que patrocina tu visa, o un puesto remoto que no te pide reubicarte. Filtra por el que te sirve.",
    }),
    pageHeader("migracionHeader", "Migración", {
      eyebrow: "Oportunidades · Migración",
      title: "Rutas de migración, explicadas paso a paso",
      dek: "La migración casi nunca es una convocatoria con fecha de cierre — es una ruta. Organizamos nuestras guías por cómo se llega, no por cuándo cierra.",
    }),
    pageHeader("historiasHeader", "Historias", {
      eyebrow: "Historias",
      title: "Reportajes, no testimonios",
      dek: "Nada de citas de cliente satisfecho. Estas son las decisiones, los costos y los tropiezos reales detrás de cada mudanza.",
    }),
    pageHeader("contactoHeader", "Contacto", {
      eyebrow: "Contacto",
      title: "Escríbenos según lo que necesitas",
      dek: "Sin formulario genérico: cada motivo tiene su propio correo, para que tu mensaje llegue directo a quien puede responder.",
    }),
    pageHeader("prensaHeader", "Prensa", {
      eyebrow: "Prensa",
      title: "Kit de prensa",
      dek: "Todo lo que un medio necesita para citar a Caminando.lat como fuente, sin tener que pedirlo por correo.",
    }),

    // — Footer y newsletter —
    defineField({
      name: "headerCtaLabel",
      title: "Texto del botón en el menú superior",
      type: "string",
      group: "otros",
      description: 'Si se deja vacío, se usa: "Buscar oportunidades"',
    }),
    defineField({
      name: "newsletterTitle",
      title: "Título del newsletter",
      type: "string",
      group: "otros",
      description: 'Si se deja vacío, se usa: "Una oportunidad nueva cada semana, directo a tu correo."',
    }),
    defineField({
      name: "newsletterBody",
      title: "Texto del newsletter",
      type: "text",
      rows: 2,
      group: "otros",
      description: 'Si se deja vacío, se usa: "Sin spam, sin ruido. Puedes darte de baja cuando quieras."',
    }),
    defineField({
      name: "footerTagline",
      title: "Frase del footer",
      type: "string",
      group: "otros",
      description: 'Si se deja vacío, se usa: "Un proyecto de Pam Guerrero"',
    }),
  ],
  preview: {
    prepare() {
      return { title: "Ajustes del sitio" };
    },
  },
});
