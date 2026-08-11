export type OpportunityCategory = "beca" | "trabajo" | "migracion";

export type SourceTier = "A" | "B" | "C";

/** Migration pathway type — how the doc groups /migracion instead of a search. */
export type MigrationRoute = "estudio-residencia" | "trabajo-residencia" | "rentas-pasivas" | "reunificacion-familiar";

export interface Country {
  slug: string;
  name: string;
  region: string;
  /** Short editorial line used on hub headers and country cards. */
  tagline: string;
}

export interface Opportunity {
  slug: string;
  category: OpportunityCategory;
  countrySlug: string;
  title: string;
  summary: string;
  level?: string;
  fundingNote?: string;
  /**
   * ISO date (YYYY-MM-DD). Drives the lifecycle engine — never remove a closed
   * entry. Omit for evergreen "migracion" guides and use lastReviewed instead.
   */
  closingDate?: string;
  /** ISO date of the last editorial review, for evergreen migration guides. */
  lastReviewed?: string;
  /** Only for category "trabajo". */
  visaSponsorship?: boolean;
  remote?: boolean;
  /** Only for category "migracion". */
  route?: MigrationRoute;
  sourceName: string;
  sourceTier: SourceTier;
}

/** Loosely typed Portable Text — avoids a hard dependency on Sanity's types in the app layer. */
export type PortableTextBlock = { _type: string } & Record<string, unknown>;

export interface Story {
  slug: string;
  headline: string;
  dek: string;
  countrySlug: string;
  originCountry: string;
  theme: string;
  readingMinutes: number;
  imageUrl?: string;
  imageAlt?: string;
  /** Opaque data-sanity attribute string — lets clicking the photo open /studio to this field. */
  imageDataAttribute?: string;
  body?: PortableTextBlock[];
}

export interface SiteSettings {
  heroImageUrl?: string;
  heroImageAlt?: string;
  heroImageDataAttribute?: string;
  founderImageUrl?: string;
  founderImageAlt?: string;
  founderImageDataAttribute?: string;
}

export const CATEGORY_LABEL: Record<OpportunityCategory, string> = {
  beca: "Beca",
  trabajo: "Trabajo",
  migracion: "Migración",
};

export const ROUTE_LABEL: Record<MigrationRoute, string> = {
  "estudio-residencia": "De estudio a residencia",
  "trabajo-residencia": "De trabajo a residencia",
  "rentas-pasivas": "Por rentas pasivas o inversión",
  "reunificacion-familiar": "Reunificación familiar",
};

export const ROUTE_DESCRIPTION: Record<MigrationRoute, string> = {
  "estudio-residencia": "Empiezas con un permiso de estudios y lo encadenas hasta la residencia permanente.",
  "trabajo-residencia": "Una oferta de empleo calificado es la puerta de entrada a un estatus migratorio estable.",
  "rentas-pasivas": "Para quienes pueden demostrar ingresos o ahorros propios, sin necesidad de un empleador.",
  "reunificacion-familiar": "Migras a partir de un vínculo familiar directo con alguien que ya reside en el país.",
};
