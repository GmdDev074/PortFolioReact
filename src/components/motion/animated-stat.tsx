import { useEffect, useRef, useState } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"
import { useMotionEnabled } from "@/hooks/use-motion-prefs"

function parseStat(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return { target: 0, suffix: value }
  return { target: Number(match[1]), suffix: match[2] || "" }
}

export function AnimatedStat({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionEnabled = useMotionEnabled()
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const { target, suffix } = parseStat(value)
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 70, damping: 22 })
  const [display, setDisplay] = useState(`0${suffix}`)
  const started = useRef(false)

  useEffect(() => {
    if (!isInView || started.current) return
    started.current = true

    if (!motionEnabled) {
      setDisplay(value)
      return
    }

    motionValue.set(0)
    motionValue.set(target)
  }, [isInView, motionEnabled, motionValue, target, value])

  useEffect(() => {
    if (!motionEnabled) return
    const unsubscribe = spring.on("change", (latest) => {
      const rounded =
        target % 1 === 0 ? Math.round(latest) : Number(latest.toFixed(1))
      setDisplay(`${rounded}${suffix}`)
    })
    return unsubscribe
  }, [motionEnabled, spring, suffix, target])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
