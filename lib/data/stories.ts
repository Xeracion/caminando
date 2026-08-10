import { cache } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import type { Story } from "../types";
import { client } from "../sanity/client";
import { storiesQuery } from "../sanity/queries";
import { resolveImageUrl } from "../sanity/image";
import { seedStories } from "./seed/stories";

type RawStory = Omit<Story, "imageUrl"> & { imageUrl?: SanityImageSource };

function mapStory(raw: RawStory): Story {
  return { ...raw, imageUrl: resolveImageUrl(raw.imageUrl, 1200) };
}

/** Cached per request — see lib/data/countries.ts for why. */
export const getStories = cache(async (): Promise<Story[]> => {
  if (!client) return seedStories;
  const raw = await client.fetch<RawStory[]>(storiesQuery, {}, { next: { revalidate: 60 } });
  return raw.length > 0 ? raw.map(mapStory) : seedStories;
});

export async function getStory(slug: string): Promise<Story | undefined> {
  const stories = await getStories();
  return stories.find((s) => s.slug === slug);
}

export async function getStoriesByCountry(countrySlug: string): Promise<Story[]> {
  const stories = await getStories();
  return stories.filter((s) => s.countrySlug === countrySlug);
}
