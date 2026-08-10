import { cache } from "react";
import type { Opportunity } from "../types";
import { client } from "../sanity/client";
import { opportunitiesQuery } from "../sanity/queries";
import { seedOpportunities } from "./seed/opportunities";

/** Cached per request — see lib/data/countries.ts for why. */
export const getOpportunities = cache(async (): Promise<Opportunity[]> => {
  if (!client) return seedOpportunities;
  const opportunities = await client.fetch<Opportunity[]>(opportunitiesQuery, {}, { next: { revalidate: 60 } });
  return opportunities.length > 0 ? opportunities : seedOpportunities;
});

export async function getOpportunity(slug: string): Promise<Opportunity | undefined> {
  const opportunities = await getOpportunities();
  return opportunities.find((o) => o.slug === slug);
}

export async function getOpportunitiesByCountry(countrySlug: string): Promise<Opportunity[]> {
  const opportunities = await getOpportunities();
  return opportunities.filter((o) => o.countrySlug === countrySlug);
}
