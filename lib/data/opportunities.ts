import { cache } from "react";
import type { Opportunity } from "../types";
import { getSanity } from "../sanity/client";
import { opportunitiesQuery } from "../sanity/queries";
import { normalizeSummary } from "../portable-text";
import { seedOpportunities } from "./seed/opportunities";

/** Cached per request — see lib/data/countries.ts for why. */
export const getOpportunities = cache(async (): Promise<Opportunity[]> => {
  const sanity = await getSanity();
  if (!sanity) return seedOpportunities;
  try {
    const opportunities = await sanity.client.fetch<Opportunity[]>(opportunitiesQuery, {}, sanity.fetchOptions);
    if (opportunities.length === 0) return seedOpportunities;
    // Defensive: entries typed before `summary` became Portable Text may still hold a plain string.
    return opportunities.map((o) => ({ ...o, summary: normalizeSummary(o.summary) }));
  } catch {
    return seedOpportunities;
  }
});

export async function getOpportunity(slug: string): Promise<Opportunity | undefined> {
  const opportunities = await getOpportunities();
  return opportunities.find((o) => o.slug === slug);
}

export async function getOpportunitiesByCountry(countrySlug: string): Promise<Opportunity[]> {
  const opportunities = await getOpportunities();
  return opportunities.filter((o) => o.countrySlug === countrySlug);
}
