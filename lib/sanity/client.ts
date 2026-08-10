import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, hasSanityConfig, projectId } from "./env";

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
