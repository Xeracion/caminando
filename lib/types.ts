export type OpportunityCategory = "beca" | "trabajo" | "migracion";

export type SourceTier = "A" | "B" | "C";

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
  sourceName: string;
  sourceTier: SourceTier;
}

export interface Story {
  slug: string;
  headline: string;
  dek: string;
  countrySlug: string;
  originCountry: string;
  theme: string;
  readingMinutes: number;
}

export const CATEGORY_LABEL: Record<OpportunityCategory, string> = {
  beca: "Beca",
  trabajo: "Trabajo",
  migracion: "Migración",
};
