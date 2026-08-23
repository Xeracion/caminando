import { cache } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import type { SiteSettings } from "../types";
import { getSanity } from "../sanity/client";
import { siteSettingsQuery } from "../sanity/queries";
import { resolveImageUrl } from "../sanity/image";
import { imageDataAttribute } from "../sanity/data-attribute";

type ImageFields =
  | "heroImageUrl"
  | "heroImageDataAttribute"
  | "founderImageUrl"
  | "founderImageDataAttribute"
  | "quickAccessEstudiarImageUrl"
  | "quickAccessEstudiarImageDataAttribute"
  | "quickAccessTrabajarImageUrl"
  | "quickAccessTrabajarImageDataAttribute"
  | "quickAccessMigrarImageUrl"
  | "quickAccessMigrarImageDataAttribute"
  | "quickAccessHistoriasImageUrl"
  | "quickAccessHistoriasImageDataAttribute";

type RawSiteSettings = Omit<SiteSettings, ImageFields> & {
  _id?: string;
  _type?: string;
  heroImage?: SanityImageSource;
  founderImage?: SanityImageSource;
  quickAccessEstudiarImage?: SanityImageSource;
  quickAccessTrabajarImage?: SanityImageSource;
  quickAccessMigrarImage?: SanityImageSource;
  quickAccessHistoriasImage?: SanityImageSource;
};

/**
 * Cached per request. Returns an all-empty object when Sanity isn't
 * configured or nothing has been filled in yet — every field here is
 * optional, and every caller falls back to the original hand-written copy
 * (or <PhotoPlaceholder> for the photos) when its value is missing.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const sanity = await getSanity();
  if (!sanity) return {};
  try {
    const raw = await sanity.client.fetch<RawSiteSettings | null>(siteSettingsQuery, {}, sanity.fetchOptions);
    if (!raw) return {};
    const type = raw._type ?? "siteSettings";
    return {
      ...raw,
      heroImageUrl: resolveImageUrl(raw.heroImage, 1800),
      heroImageDataAttribute: imageDataAttribute(raw._id, type, "heroImage"),
      founderImageUrl: resolveImageUrl(raw.founderImage, 900),
      founderImageDataAttribute: imageDataAttribute(raw._id, type, "founderImage"),
      quickAccessEstudiarImageUrl: resolveImageUrl(raw.quickAccessEstudiarImage, 900),
      quickAccessEstudiarImageDataAttribute: imageDataAttribute(raw._id, type, "quickAccessEstudiarImage"),
      quickAccessTrabajarImageUrl: resolveImageUrl(raw.quickAccessTrabajarImage, 900),
      quickAccessTrabajarImageDataAttribute: imageDataAttribute(raw._id, type, "quickAccessTrabajarImage"),
      quickAccessMigrarImageUrl: resolveImageUrl(raw.quickAccessMigrarImage, 900),
      quickAccessMigrarImageDataAttribute: imageDataAttribute(raw._id, type, "quickAccessMigrarImage"),
      quickAccessHistoriasImageUrl: resolveImageUrl(raw.quickAccessHistoriasImage, 900),
      quickAccessHistoriasImageDataAttribute: imageDataAttribute(raw._id, type, "quickAccessHistoriasImage"),
    };
  } catch {
    return {};
  }
});
