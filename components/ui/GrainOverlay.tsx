/**
 * Self-hosted film grain.
 *
 * Replaces the 10 separate copies of an <img> pulling
 * https://grainy-gradients.vercel.app/noise.svg — a third-party deployment
 * we don't control that sat on top of the entire visual identity.
 * The texture is now an inline data-URI in globals.css (`.grain-texture`),
 * so it costs zero network requests and works offline.
 */
export default function GrainOverlay({
  className = "",
  opacity = "opacity-20",
}: {
  className?: string;
  opacity?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-20 overflow-hidden ${opacity} ${className}`}
    >
      <div className="grain-texture absolute inset-0" />
    </div>
  );
}
