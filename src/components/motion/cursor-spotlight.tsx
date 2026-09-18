import { useEffect, useState } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"
import { useCanHoverInteract } from "@/hooks/use-motion-prefs"
import { useTheme } from "@/contexts/theme-context"

/**
 * Soft ambient light behind the UI — never a visible cursor object.
 * Native cursor stays fully visible.
 */
export function CursorSpotlight() {
  const canInteract = useCanHoverInteract()
  const { theme } = useTheme()
  const [enabled, setEnabled] = useState(false)
  const mouseX = useMotionValue(-400)
  const mouseY = useMotionValue(-400)
  const springX = useSpring(mouseX, { stiffness: 45, damping: 28, mass: 0.55 })
  const springY = useSpring(mouseY, { stiffness: 45, damping: 28, mass: 0.55 })

  const intensity = theme === "dark" ? 0.045 : 0.028
  const background = useMotionTemplate`radial-gradient(720px circle at ${springX}px ${springY}px, hsl(221 83% 53% / ${intensity}), transparent 62%)`

  useEffect(() => {
    setEnabled(canInteract)
  }, [canInteract])

  useEffect(() => {
    if (!enabled) return

    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [enabled, mouseX, mouseY])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      style={{ background }}
    />
  )
}
