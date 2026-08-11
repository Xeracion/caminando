import { draftMode } from "next/headers";
import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, hasSanityConfig, projectId } from "./env";

/** Base client, exported for the draft-mode API routes — everything else should use getSanity() below. */
export const client: SanityClient | null = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // The dashboard only ever publishes editorial content (never secrets),
      // so an unauthenticated, cached read keeps the marketing site fast and
      // needs no token wiring in Vercel for the common case.
      useCdn: true,
      perspective: "published",
    })
  : null;

type FetchOptions = { next: { revalidate: number } } | { cache: "no-store" };

/**
 * Draft-mode-aware client + matching fetch options for the readers in
 * lib/data/. Outside the Presentation tool's preview iframe this is just the
 * cached, published-content client. Inside it, it switches to an uncached,
 * token-authenticated read of draft content with stega-encoded strings —
 * that's what lets clicking text or a photo on the actual page jump straight
 * to the right field in /studio, and what keeps edits showing up instantly
 * instead of waiting out the published cache window.
 */
export async function getSanity(): Promise<{ client: SanityClient; fetchOptions: FetchOptions } | null> {
  if (!client) return null;

  const published = { client, fetchOptions: { next: { revalidate: 60 } } } as const;

  // draftMode() throws when called from generateStaticParams, which runs at
  // build time with no request/cookies to check — that's always the
  // published case anyway, so fall back to it instead of failing the build.
  let isEnabled = false;
  try {
    isEnabled = (await draftMode()).isEnabled;
  } catch {
    return published;
  }
  if (!isEnabled) {
    return published;
  }

  return {
    client: client.withConfig({
      token: process.env.SANITY_API_READ_TOKEN,
      perspective: "drafts",
      useCdn: false,
      stega: { enabled: true, studioUrl: "/studio" },
    }),
    fetchOptions: { cache: "no-store" },
  };
}
