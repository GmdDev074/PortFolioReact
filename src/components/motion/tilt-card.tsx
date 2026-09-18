import { useRef, type MouseEvent } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion"
import { useCanHoverInteract } from "@/hooks/use-motion-prefs"
import { cn } from "@/lib/utils"

type TiltCardProps = HTMLMotionProps<"div"> & {
  maxTilt?: number
}

export function TiltCard({
  children,
  className,
  maxTilt = 4,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const canInteract = useCanHoverInteract()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 180, damping: 18, mass: 0.35 })
  const springY = useSpring(rotateY, { stiffness: 180, damping: 18, mass: 0.35 })
  const transform = useMotionTemplate`perspective(900px) rotateX(${springX}deg) rotateY(${springY}deg)`

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!canInteract || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    rotateX.set((0.5 - py) * maxTilt * 2)
    rotateY.set((px - 0.5) * maxTilt * 2)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={canInteract ? { transform } : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </motion.div>
  )
}
