import { useEffect, useState } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"
import { useCanHoverInteract } from "@/hooks/use-motion-prefs"
import { useTheme } from "@/contexts/theme-context"

export function CursorSpotlight() {
  const canInteract = useCanHoverInteract()
  const { theme } = useTheme()
  const [enabled, setEnabled] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25, mass: 0.4 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25, mass: 0.4 })
  const background = useMotionTemplate`radial-gradient(520px circle at ${springX}px ${springY}px, hsl(var(--primary) / 0.08), transparent 55%)`

  useEffect(() => {
    setEnabled(canInteract && theme === "dark")
  }, [canInteract, theme])

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
      className="pointer-events-none fixed inset-0 z-[1] hidden mix-blend-screen md:block"
      style={{ background }}
    />
  )
}
