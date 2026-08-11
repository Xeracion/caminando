import { cache } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import type { SiteSettings } from "../types";
import { getSanity } from "../sanity/client";
import { siteSettingsQuery } from "../sanity/queries";
import { resolveImageUrl } from "../sanity/image";
import { imageDataAttribute } from "../sanity/data-attribute";

type RawSiteSettings = {
  _id?: string;
  _type?: string;
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
  const sanity = await getSanity();
  if (!sanity) return {};
  const raw = await sanity.client.fetch<RawSiteSettings | null>(siteSettingsQuery, {}, sanity.fetchOptions);
  if (!raw) return {};
  const type = raw._type ?? "siteSettings";
  return {
    heroImageUrl: resolveImageUrl(raw.heroImage, 1800),
    heroImageAlt: raw.heroImageAlt,
    heroImageDataAttribute: imageDataAttribute(raw._id, type, "heroImage"),
    founderImageUrl: resolveImageUrl(raw.founderImage, 900),
    founderImageAlt: raw.founderImageAlt,
    founderImageDataAttribute: imageDataAttribute(raw._id, type, "founderImage"),
  };
});
