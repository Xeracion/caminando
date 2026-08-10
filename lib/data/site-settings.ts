import { cache } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import type { SiteSettings } from "../types";
import { client } from "../sanity/client";
import { siteSettingsQuery } from "../sanity/queries";
import { resolveImageUrl } from "../sanity/image";

type RawSiteSettings = {
  heroImage?: SanityImageSource;
  heroImageAlt?: string;
  founderImage?: SanityImageSource;
  founderImageAlt?: string;
};

/**
 * Cached per request. Returns an all-empty object when Sanity isn't
 * configured or nobody has uploaded photos yet — callers fall back to
 * <PhotoPlaceholder> in that case, never a broken image.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!client) return {};
  const raw = await client.fetch<RawSiteSettings | null>(siteSettingsQuery, {}, { next: { revalidate: 60 } });
  if (!raw) return {};
  return {
    heroImageUrl: resolveImageUrl(raw.heroImage, 1800),
    heroImageAlt: raw.heroImageAlt,
    founderImageUrl: resolveImageUrl(raw.founderImage, 900),
    founderImageAlt: raw.founderImageAlt,
  };
});
