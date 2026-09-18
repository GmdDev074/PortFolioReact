import { motion, useScroll, useSpring } from "framer-motion"
import { useMotionEnabled } from "@/hooks/use-motion-prefs"

export function ScrollProgress() {
  const motionEnabled = useMotionEnabled()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  if (!motionEnabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-primary/80"
      style={{ scaleX }}
    />
  )
}
