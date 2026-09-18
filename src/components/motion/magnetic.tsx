import { useRef, type MouseEvent } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion"
import { useCanHoverInteract } from "@/hooks/use-motion-prefs"
import { cn } from "@/lib/utils"

type MagneticProps = HTMLMotionProps<"div"> & {
  strength?: number
  /** Clamp magnetic travel in px (max 8 per design) */
  maxOffset?: number
}

export function Magnetic({
  children,
  className,
  strength = 0.2,
  maxOffset = 8,
  ...props
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const canInteract = useCanHoverInteract()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.35 })

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!canInteract || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2
    const limit = Math.min(8, maxOffset)
    x.set(Math.max(-limit, Math.min(limit, offsetX * strength)))
    y.set(Math.max(-limit, Math.min(limit, offsetY * strength)))
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex", className)}
      style={canInteract ? { x: springX, y: springY } : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </motion.div>
  )
}
