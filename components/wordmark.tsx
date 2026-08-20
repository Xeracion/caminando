/**
 * The "Caminando.lat" logotype — a bold sans wordmark with ".lat" in the
 * brand accent, recreated in CSS rather than a raster file so it stays
 * crisp at any size.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-body font-black tracking-tight ${className}`}>
      Caminando<span className="text-sun-deep">.lat</span>
    </span>
  );
}
