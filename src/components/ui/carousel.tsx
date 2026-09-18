import { useEffect, useRef, useState, type ReactNode } from "react"

interface CarouselProps {
  children: ReactNode[]
  autoScroll?: boolean
  /** Pixels per frame at 60fps-ish; default is gentle */
  speed?: number
  pauseOnHover?: boolean
  className?: string
  itemClassName?: string
  gapClassName?: string
}

export function Carousel({
  children,
  autoScroll = true,
  speed = 0.45,
  pauseOnHover = true,
  className = "",
  itemClassName = "flex-shrink-0",
  gapClassName = "gap-3",
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const pausedRef = useRef(false)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  pausedRef.current = isPaused

  useEffect(() => {
    if (!autoScroll || !containerRef.current) return

    const container = containerRef.current
    let frame = 0

    const tick = () => {
      if (!pausedRef.current) {
        const half = container.scrollWidth / 2
        if (half > 0) {
          let next = container.scrollLeft + speed
          if (next >= half) next -= half
          container.scrollLeft = next
        }
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [autoScroll, speed])

  const pause = () => {
    if (!pauseOnHover) return
    setIsPaused(true)
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
  }

  const scheduleResume = (delay = 1800) => {
    if (!pauseOnHover) return
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setIsPaused(false), delay)
  }

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
    }
  }, [])

  const duplicated = [...children, ...children]

  return (
    <div className={`w-full overflow-x-hidden overflow-y-visible ${className}`}>
      <div
        ref={containerRef}
        className={`flex ${gapClassName} overflow-x-auto overflow-y-visible pt-3 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        onMouseEnter={pause}
        onMouseLeave={() => scheduleResume(400)}
        onTouchStart={pause}
        onTouchEnd={() => scheduleResume(2200)}
        onPointerDown={pause}
        onScroll={() => {
          // Keep auto-scroll in sync after manual drag/swipe
          if (!pausedRef.current) return
        }}
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "auto",
        }}
      >
        {duplicated.map((child, index) => (
          <div key={index} className={itemClassName}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
