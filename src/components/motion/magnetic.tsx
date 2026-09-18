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
}

export function Magnetic({
  children,
  className,
  strength = 0.25,
  ...props
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const canInteract = useCanHoverInteract()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 20, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 20, mass: 0.4 })

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!canInteract || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2
    x.set(Math.max(-10, Math.min(10, offsetX * strength)))
    y.set(Math.max(-10, Math.min(10, offsetY * strength)))
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
