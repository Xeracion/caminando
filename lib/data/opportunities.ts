import type { Opportunity } from "../types";

/**
 * Sample editorial content for the pilot (Etapa 1 — Revista, per the content
 * strategy). Dates are set relative to a mid-2026 launch to demonstrate all
 * three lifecycle states honestly: activa, por-cerrar and cerrada.
 * Institution names are kept generic — these are illustrative entries, not
 * verified live listings.
 */
export const opportunities: Opportunity[] = [
  {
    slug: "espana-beca-excelencia-ingenieria-maestria",
    category: "beca",
    countrySlug: "espana",
    title: "Beca de excelencia para maestría en ingeniería",
    summary:
      "Cobertura completa de matrícula y una asignación mensual para cursar un posgrado en ingeniería en una universidad pública española.",
    level: "Maestría",
    fundingNote: "Matrícula + manutención",
    closingDate: "2026-11-20",
    sourceName: "Convocatoria pública universitaria (España)",
    sourceTier: "B",
  },
  {
    slug: "chile-beca-pregrado-tecnologia",
    category: "beca",
    countrySlug: "chile",
    title: "Beca de pregrado en carreras tecnológicas",
    summary:
      "Financiamiento parcial para cursar un pregrado en tecnología o ingeniería en instituciones chilenas, con prioridad para solicitantes de la región.",
    level: "Pregrado",
    fundingNote: "Matrícula parcial",
    closingDate: "2026-12-05",
    sourceName: "Fondo regional de becas (Chile)",
    sourceTier: "B",
  },
  {
    slug: "espana-ingeniera-software-madrid-visa",
    category: "trabajo",
    countrySlug: "espana",
    title: "Ingeniera / ingeniero de software en Madrid, con patrocinio de visa",
    summary:
      "Puesto a tiempo completo en una empresa tecnológica con sede en Madrid, dispuesta a tramitar la visa de trabajo para talento internacional.",
    level: "Profesional con 2+ años de experiencia",
    fundingNote: "Patrocina visa",
    visaSponsorship: true,
    closingDate: "2026-08-15",
    sourceName: "Bolsa de empleo europea (agregador oficial)",
    sourceTier: "A",
  },
  {
    slug: "espana-beca-iberoamericana-2025",
    category: "beca",
    countrySlug: "espana",
    title: "Beca iberoamericana para estudios de posgrado 2025",
    summary:
      "Programa anual de becas para estudiantes latinoamericanos cursando programas de posgrado en universidades españolas.",
    level: "Maestría y doctorado",
    fundingNote: "Matrícula parcial",
    closingDate: "2025-11-01",
    sourceName: "Fundación binacional (España–Latinoamérica)",
    sourceTier: "B",
  },
  {
    slug: "alemania-trabajo-enfermeria-visa-patrocinada",
    category: "trabajo",
    countrySlug: "alemania",
    title: "Personal de enfermería con visa patrocinada",
    summary:
      "Programa de contratación para profesionales de enfermería latinoamericanos, con curso de alemán incluido y trámite de visa a cargo del empleador.",
    level: "Título técnico o universitario en enfermería",
    fundingNote: "Curso de idioma incluido",
    visaSponsorship: true,
    closingDate: "2026-10-12",
    sourceName: "Agencia federal de empleo (Alemania)",
    sourceTier: "A",
  },
  {
    slug: "alemania-beca-posgrado-ciencias",
    category: "beca",
    countrySlug: "alemania",
    title: "Beca de posgrado en universidades públicas alemanas",
    summary:
      "Financiamiento para maestrías y doctorados en ciencias e ingeniería, abierto a estudiantes de toda Latinoamérica.",
    level: "Maestría y doctorado",
    fundingNote: "Matrícula + seguro médico",
    closingDate: "2026-09-18",
    sourceName: "Servicio de intercambio académico (Alemania)",
    sourceTier: "B",
  },
  {
    slug: "alemania-migracion-tarjeta-azul-ue",
    category: "migracion",
    countrySlug: "alemania",
    title: "Ruta: de oferta de trabajo a Tarjeta Azul de la UE",
    summary:
      "Guía paso a paso de cómo un profesional latinoamericano con oferta de empleo calificado puede tramitar la Tarjeta Azul y, con el tiempo, la residencia permanente.",
    lastReviewed: "2026-07-01",
    route: "trabajo-residencia",
    sourceName: "Guía editorial Caminando.lat",
    sourceTier: "B",
  },
  {
    slug: "canada-migracion-express-entry-desde-estudio",
    category: "migracion",
    countrySlug: "canada",
    title: "Ruta: de estudiante internacional a residencia permanente",
    summary:
      "Cómo encadenar un permiso de estudios, un permiso de trabajo postgraduación y el sistema Express Entry para llegar a la residencia permanente en Canadá.",
    lastReviewed: "2026-06-15",
    route: "estudio-residencia",
    sourceName: "Guía editorial Caminando.lat",
    sourceTier: "B",
  },
  {
    slug: "portugal-migracion-visado-d7-rentas-pasivas",
    category: "migracion",
    countrySlug: "portugal",
    title: "Ruta: visado D7 para quienes viven de rentas o ahorros",
    summary:
      "Qué se necesita demostrar en ingresos pasivos o ahorro para solicitar el visado D7 y mudarse a Portugal sin depender de un empleador.",
    lastReviewed: "2026-05-20",
    route: "rentas-pasivas",
    sourceName: "Guía editorial Caminando.lat",
    sourceTier: "B",
  },
  {
    slug: "espana-migracion-reagrupacion-familiar",
    category: "migracion",
    countrySlug: "espana",
    title: "Ruta: reagrupación familiar en España",
    summary:
      "Qué vínculo familiar califica, qué documentos pide consulado y cuánto suele tardar el proceso de reagrupación hacia España.",
    lastReviewed: "2026-04-10",
    route: "reunificacion-familiar",
    sourceName: "Guía editorial Caminando.lat",
    sourceTier: "B",
  },
  {
    slug: "canada-trabajo-salud-ontario",
    category: "trabajo",
    countrySlug: "canada",
    title: "Trabajador calificado en salud, provincia de Ontario",
    summary:
      "Programa provincial que prioriza perfiles de salud latinoamericanos para cubrir vacantes fuera de las grandes ciudades, con vía directa a la nominación provincial.",
    level: "Título técnico o universitario en salud",
    fundingNote: "Nominación provincial",
    visaSponsorship: true,
    closingDate: "2026-09-05",
    sourceName: "Programa de nominación provincial (Canadá)",
    sourceTier: "A",
  },
  {
    slug: "mexico-beca-maestria-ciencia-datos",
    category: "beca",
    countrySlug: "mexico",
    title: "Beca para maestría en ciencia de datos",
    summary:
      "Financiamiento público para cursar una maestría en ciencia de datos o inteligencia artificial en instituciones mexicanas de posgrado.",
    level: "Maestría",
    fundingNote: "Beca completa + estipendio",
    closingDate: "2026-10-30",
    sourceName: "Consejo nacional de ciencia y tecnología (México)",
    sourceTier: "B",
  },
  {
    slug: "chile-trabajo-analista-datos-remoto",
    category: "trabajo",
    countrySlug: "chile",
    title: "Analista de datos remoto, empresa con base en Chile",
    summary:
      "Puesto 100% remoto para candidatos de cualquier país latinoamericano, con contrato directo y horario compatible con la región.",
    level: "1+ año de experiencia en análisis de datos",
    fundingNote: "100% remoto",
    remote: true,
    closingDate: "2026-08-12",
    sourceName: "Agregador de empleo remoto (API pública)",
    sourceTier: "A",
  },
];

export function getOpportunitiesByCountry(countrySlug: string): Opportunity[] {
  return opportunities.filter((o) => o.countrySlug === countrySlug);
}

export function getOpportunity(slug: string): Opportunity | undefined {
  return opportunities.find((o) => o.slug === slug);
}
