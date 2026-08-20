/** Standard props for a link that opens outside the site, in a new tab. */
export function getAccessibleExternalLinkProps(label: string) {
  return {
    target: "_blank" as const,
    rel: "noopener noreferrer",
    "aria-label": label,
  };
}
