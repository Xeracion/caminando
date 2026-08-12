/**
 * The "Caminando.lat" logotype — a bold sans wordmark with ".lat" in the
 * brand accent, recreated in CSS rather than a raster file so it stays
 * crisp at any size and inverts between light/dark automatically (the
 * "Caminando" part inherits `--color-ink`, which already flips per theme).
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-body font-black tracking-tight ${className}`}>
      Caminando<span className="text-sun-deep">.lat</span>
    </span>
  );
}
