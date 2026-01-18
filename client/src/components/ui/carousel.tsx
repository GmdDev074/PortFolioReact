import { useEffect, useRef, useState, ReactNode } from "react"

interface CarouselProps {
  children: ReactNode[]
  autoScroll?: boolean
  speed?: number
  pauseOnHover?: boolean
}

export function Carousel({
  children,
  autoScroll = true,
  speed: _speed = 50,
  pauseOnHover = true,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!autoScroll || !containerRef.current || isPaused) return

    const container = containerRef.current
    let animationFrameId: number | null = null
    let position = 0
    const scrollSpeed = 0.5

    const scroll = () => {
      if (!container || isPaused) return
      
      position += scrollSpeed
      container.scrollLeft = position

      // Reset position when we've scrolled halfway (one full set of children)
      if (position >= container.scrollWidth / 2) {
        position = 0
        container.scrollLeft = 0
      }
      
      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [autoScroll, isPaused])

  const duplicatedChildren = [...children, ...children]

  return (
    <div className="overflow-x-hidden overflow-y-visible w-full">
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto overflow-y-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        onTouchStart={() => pauseOnHover && setIsPaused(true)}
        onTouchEnd={() => pauseOnHover && setIsPaused(false)}
        style={{ 
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "auto",
        }}
      >
        {duplicatedChildren.map((child, index) => (
          <div key={index} className="flex-shrink-0 h-full">
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

