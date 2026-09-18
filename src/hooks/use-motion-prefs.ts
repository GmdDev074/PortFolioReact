import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

export function useIsDesktop(minWidth = 1024) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${minWidth}px)`)
    const finePointer = window.matchMedia("(pointer: fine)")

    const update = () => {
      setIsDesktop(media.matches && finePointer.matches)
    }

    update()
    media.addEventListener("change", update)
    finePointer.addEventListener("change", update)
    return () => {
      media.removeEventListener("change", update)
      finePointer.removeEventListener("change", update)
    }
  }, [minWidth])

  return isDesktop
}

export function useMotionEnabled() {
  const prefersReduced = useReducedMotion()
  return !prefersReduced
}

export function useCanHoverInteract() {
  const isDesktop = useIsDesktop()
  const motionEnabled = useMotionEnabled()
  return isDesktop && motionEnabled
}
