import { cn } from "@/lib/utils"

interface AtmosphereProps {
  className?: string
  /** Softer mesh for contact vs richer hero */
  tone?: "hero" | "contact"
}

/**
 * Soft gradient mesh + film grain for hero / contact atmosphere.
 * Stronger in light mode so flat white sections feel intentional.
 */
export function Atmosphere({ className, tone = "hero" }: AtmosphereProps) {
  return (
    <div
      className={cn("atmosphere-root pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className={cn(
          "atmosphere-mesh",
          tone === "hero" ? "atmosphere-mesh-hero" : "atmosphere-mesh-contact"
        )}
      />
      <div className="atmosphere-mesh-secondary" />
      <div className="atmosphere-grain" />
      <div className="atmosphere-vignette" />
    </div>
  )
}
