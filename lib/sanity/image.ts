import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

/** Resolves a Sanity image field to a plain URL string, or undefined when absent/unconfigured. */
export function resolveImageUrl(source: SanityImageSource | undefined | null, width = 1200): string | undefined {
  if (!source || !builder) return undefined;
  return builder.image(source).width(width).auto("format").url();
}
