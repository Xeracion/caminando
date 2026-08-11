import { createDataAttribute } from "next-sanity";
import { dataset, projectId } from "./env";

/**
 * Builds the invisible `data-sanity` attribute that lets Visual Editing
 * (the Presentation tool's click-to-edit overlay) know which document and
 * field a photo on the page corresponds to. Harmless outside of draft mode —
 * the overlay script that reads it is only mounted there (see <VisualEditing>
 * in app/(site)/layout.tsx).
 */
export function imageDataAttribute(id: string | undefined, type: string, path: string): string | undefined {
  if (!id || !projectId) return undefined;
  return createDataAttribute({ projectId, dataset, baseUrl: "/studio", id, type, path }).toString();
}
