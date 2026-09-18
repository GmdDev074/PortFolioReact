import { useEffect, useRef, useState } from "react"
import { animate, useInView, useMotionValue } from "framer-motion"
import { useMotionEnabled } from "@/hooks/use-motion-prefs"
import { EASE_OUT } from "@/lib/motion"

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
  const [display, setDisplay] = useState(`0${suffix}`)
  const started = useRef(false)

  useEffect(() => {
    if (!isInView || started.current) return
    started.current = true

    if (!motionEnabled) {
      setDisplay(value)
      return
    }

    const controls = animate(0, target, {
      duration: 0.7,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        const rounded =
          target % 1 === 0 ? Math.round(latest) : Number(latest.toFixed(1))
        setDisplay(`${rounded}${suffix}`)
      },
    })

    return () => controls.stop()
  }, [isInView, motionEnabled, motionValue, target, suffix, value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
