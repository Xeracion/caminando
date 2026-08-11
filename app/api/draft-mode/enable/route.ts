import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/lib/sanity/client";

/**
 * Hit by the Presentation tool (via previewUrl.previewMode.enable in
 * sanity.config.ts) when Pam opens the "Preview" view in /studio. Guarded so
 * the route still exists (and the build still succeeds) before Sanity is
 * configured — see lib/sanity/env.ts.
 */
export const GET = client
  ? defineEnableDraftMode({ client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }) }).GET
  : async () => new Response("Sanity is not configured yet.", { status: 400 });
