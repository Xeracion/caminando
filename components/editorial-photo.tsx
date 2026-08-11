import Image from "next/image";
import { PhotoPlaceholder } from "./photo-placeholder";

type Props = {
  src?: string;
  alt: string;
  className?: string;
  tone?: "deep" | "warm";
  fill?: boolean;
  rounded?: boolean;
  sizes?: string;
  /** data-sanity attribute for Visual Editing — clicking the photo in /studio's preview jumps to this field. */
  dataAttribute?: string;
};

/**
 * Renders the real editorial photo once one exists in the CMS; falls back to
 * <PhotoPlaceholder> otherwise so a missing upload never breaks a layout —
 * clicking the placeholder in Visual Editing still jumps to the right field.
 */
export function EditorialPhoto({
  src,
  alt,
  className = "",
  tone = "deep",
  fill = false,
  rounded = true,
  sizes = "100vw",
  dataAttribute,
}: Props) {
  if (!src) {
    return (
      <PhotoPlaceholder
        caption={alt}
        className={className}
        tone={tone}
        fill={fill}
        rounded={rounded}
        dataAttribute={dataAttribute}
      />
    );
  }

  return (
    <div
      data-sanity={dataAttribute}
      className={`${fill ? "absolute inset-0" : "relative"} overflow-hidden ${rounded ? "rounded-2xl" : ""} ${className}`}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
