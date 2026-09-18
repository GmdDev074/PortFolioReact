import type { ReactNode } from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  fadeScale,
  fadeUp,
  staggerContainer,
  staggerFast,
  transition,
  viewportOnce,
} from "@/lib/motion"
import { useMotionEnabled } from "@/hooks/use-motion-prefs"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
} & Omit<HTMLMotionProps<"div">, "children">

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  ...props
}: RevealProps) {
  const motionEnabled = useMotionEnabled()

  if (!motionEnabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={once ? viewportOnce : { once: false, margin: "-60px 0px" }}
      transition={{ ...transition.slow, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function RevealHeading({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "p"
  delay?: number
}) {
  const motionEnabled = useMotionEnabled()
  const MotionTag = motion[Tag]

  if (!motionEnabled) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...transition.slow, delay }}
    >
      {children}
    </MotionTag>
  )
}

export function StaggerContainer({
  children,
  className,
  fast = false,
  ...props
}: RevealProps & { fast?: boolean }) {
  const motionEnabled = useMotionEnabled()

  if (!motionEnabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={fast ? staggerFast : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  scale = false,
  ...props
}: RevealProps & { scale?: boolean }) {
  const motionEnabled = useMotionEnabled()

  if (!motionEnabled) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={scale ? fadeScale : fadeUp}
      transition={transition.base}
      {...props}
    >
      {children}
    </motion.div>
  )
}
