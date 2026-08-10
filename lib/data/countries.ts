import { cache } from "react";
import type { Country } from "../types";
import { client } from "../sanity/client";
import { countriesQuery } from "../sanity/queries";
import { seedCountries } from "./seed/countries";

/**
 * Cached per request — every call site (header, footer, cards, hubs) shares
 * the same single fetch instead of hitting Sanity once per component.
 * Falls back to the local seed list until Sanity is configured or has no
 * countries published yet.
 */
export const getCountries = cache(async (): Promise<Country[]> => {
  if (!client) return seedCountries;
  const countries = await client.fetch<Country[]>(countriesQuery, {}, { next: { revalidate: 60 } });
  return countries.length > 0 ? countries : seedCountries;
});

export async function getCountry(slug: string): Promise<Country | undefined> {
  const countries = await getCountries();
  return countries.find((c) => c.slug === slug);
}
