type Props = {
  caption: string;
  /** Layout-only utilities (aspect ratio, etc.) — never position or radius, see `fill`/`rounded`. */
  className?: string;
  tone?: "deep" | "warm";
  /** True for full-bleed backgrounds (e.g. the hero); false sizes itself via `className`. */
  fill?: boolean;
  rounded?: boolean;
  dataAttribute?: string;
};

/**
 * Stand-in for real editorial photography (not yet shot). Deliberately
 * abstract rather than generic stock imagery, in navy tones only — the
 * accent yellow stays reserved for real calls to action.
 *
 * Position and radius are dedicated props, not className, because two
 * Tailwind utilities for the same CSS property (e.g. `relative` +
 * `absolute`) don't resolve by DOM order — the one that comes later in the
 * generated stylesheet wins regardless of which is listed last here.
 */
export function PhotoPlaceholder({
  caption,
  className = "",
  tone = "deep",
  fill = false,
  rounded = true,
  dataAttribute,
}: Props) {
  const gradient =
    tone === "deep"
      ? "from-navy-deep via-navy to-navy-light"
      : "from-navy via-navy-light to-navy";

  return (
    <div
      data-sanity={dataAttribute}
      className={`${fill ? "absolute inset-0" : "relative"} overflow-hidden ${rounded ? "rounded-2xl" : ""} bg-gradient-to-br ${gradient} ${className}`}
      role="img"
      aria-label={caption}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M -20 260 C 60 220, 120 300, 200 220 S 340 120, 420 160"
          fill="none"
          stroke="rgba(251,249,244,0.55)"
          strokeWidth="1.5"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
        <circle cx="200" cy="220" r="4" fill="rgba(251,249,244,0.8)" />
        <circle cx="-20" cy="260" r="3" fill="rgba(251,249,244,0.5)" />
        <circle cx="420" cy="160" r="3" fill="rgba(251,249,244,0.5)" />
      </svg>
      <span className="absolute bottom-3 left-4 font-body text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-paper/60">
        {caption}
      </span>
    </div>
  );
}
