export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

/**
 * False until Pam creates a Sanity project and sets NEXT_PUBLIC_SANITY_PROJECT_ID
 * in Vercel. Every data reader in lib/data/ falls back to the local seed content
 * while this is false, so the site works before and after the CMS is connected.
 */
export const hasSanityConfig = Boolean(projectId);
