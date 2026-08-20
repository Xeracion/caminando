import type { PortableTextBlock } from "./types";

/** Wraps a plain string into a single-paragraph Portable Text block — used for seed content. */
export function plainTextToBlocks(text: string): PortableTextBlock[] {
  return [
    {
      _type: "block",
      style: "normal",
      children: [{ _type: "span", text, marks: [] }],
      markDefs: [],
    },
  ];
}

/**
 * Normalizes a summary that may still be a plain string — content typed in
 * Sanity before the `summary` field became Portable Text. Lets existing
 * entries keep rendering (as a plain paragraph) until re-edited with rich
 * formatting, instead of crashing.
 */
export function normalizeSummary(summary: unknown): PortableTextBlock[] {
  if (typeof summary === "string") return plainTextToBlocks(summary);
  if (Array.isArray(summary)) return summary as PortableTextBlock[];
  return [];
}
