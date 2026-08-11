import { cache } from "react";
import type { Opportunity } from "../types";
import { getSanity } from "../sanity/client";
import { opportunitiesQuery } from "../sanity/queries";
import { seedOpportunities } from "./seed/opportunities";

/** Cached per request — see lib/data/countries.ts for why. */
export const getOpportunities = cache(async (): Promise<Opportunity[]> => {
  const sanity = await getSanity();
  if (!sanity) return seedOpportunities;
  try {
    const opportunities = await sanity.client.fetch<Opportunity[]>(opportunitiesQuery, {}, sanity.fetchOptions);
    return opportunities.length > 0 ? opportunities : seedOpportunities;
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
