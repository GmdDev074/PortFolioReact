import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageCarouselProps {
  images: string[]
  alt: string
  className?: string
}

export function ImageCarousel({ images, alt, className }: ImageCarouselProps) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + images.length) % images.length)
    },
    [images.length]
  )

  useEffect(() => {
    if (images.length <= 1 || isPaused || isDragging) return

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [images.length, isPaused, isDragging, index])

  useEffect(() => {
    if (images.length <= 1) return
    ;[
      images[(index + 1) % images.length],
      images[(index - 1 + images.length) % images.length],
    ].forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [index, images])

  if (images.length === 0) return null

  const finishDrag = (delta: number) => {
    setIsDragging(false)
    setDragOffset(0)
    setIsPaused(false)
    if (Math.abs(delta) < 40) return
    goTo(delta < 0 ? index + 1 : index - 1)
  }

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-xl border border-border bg-slate-900 shadow-md">
        <div
          className="relative aspect-[9/19] max-h-[380px] w-full touch-pan-y sm:aspect-[9/16] sm:max-h-[420px]"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX
            setIsDragging(true)
            setIsPaused(true)
          }}
          onTouchMove={(e) => {
            if (touchStartX.current == null || !trackRef.current) return
            const width = trackRef.current.clientWidth
            const delta = e.touches[0].clientX - touchStartX.current
            setDragOffset((delta / width) * 100)
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current == null) return
            const delta = e.changedTouches[0].clientX - touchStartX.current
            touchStartX.current = null
            finishDrag(delta)
          }}
          onMouseDown={(e) => {
            touchStartX.current = e.clientX
            setIsDragging(true)
            setIsPaused(true)
          }}
          onMouseMove={(e) => {
            if (touchStartX.current == null || !trackRef.current || !isDragging) return
            const width = trackRef.current.clientWidth
            const delta = e.clientX - touchStartX.current
            setDragOffset((delta / width) * 100)
          }}
          onMouseUp={(e) => {
            if (touchStartX.current == null) return
            const delta = e.clientX - touchStartX.current
            touchStartX.current = null
            finishDrag(delta)
          }}
          onMouseLeave={() => {
            if (!isDragging || touchStartX.current == null) return
            touchStartX.current = null
            setIsDragging(false)
            setDragOffset(0)
          }}
        >
          <div
            ref={trackRef}
            className={cn(
              "flex h-full w-full will-change-transform",
              isDragging
                ? "transition-none"
                : "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            )}
            style={{
              transform: `translate3d(calc(-${index * 100}% + ${dragOffset}%), 0, 0)`,
            }}
          >
            {images.map((src, i) => (
              <div
                key={src}
                className="h-full w-full shrink-0 grow-0 basis-full"
              >
                <img
                  src={src}
                  alt={`${alt} screenshot ${i + 1}`}
                  draggable={false}
                  className="h-full w-full select-none object-contain object-center"
                />
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous screenshot"
              className="absolute top-1/2 left-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next screenshot"
              className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-2.5 flex items-center justify-center gap-1.5">
          {images.map((image, dotIndex) => (
            <button
              key={image}
              type="button"
              aria-label={`Go to screenshot ${dotIndex + 1}`}
              onClick={() => setIndex(dotIndex)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 ease-out",
                dotIndex === index
                  ? "w-5 bg-primary"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
