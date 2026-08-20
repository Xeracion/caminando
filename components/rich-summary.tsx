import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@/lib/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="[&:not(:first-child)]:mt-2">{children}</p>,
    justify: ({ children }) => <p className="text-justify [&:not(:first-child)]:mt-2">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-2 list-disc space-y-1 pl-5">{children}</ul>,
    number: ({ children }) => <ol className="mt-2 list-decimal space-y-1 pl-5">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  },
};

/** Renders an opportunity's rich-text summary — bold, justified paragraphs and bullet/numbered lists. */
export function RichSummary({ value, className = "" }: { value: PortableTextBlock[]; className?: string }) {
  if (!value || value.length === 0) return null;
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
