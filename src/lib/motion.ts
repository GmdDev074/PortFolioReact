import type { Transition, Variants } from "framer-motion"

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const EASE_IN_OUT: [number, number, number, number] = [0.45, 0, 0.55, 1]

export const transition = {
  fast: { duration: 0.22, ease: EASE_OUT } satisfies Transition,
  base: { duration: 0.35, ease: EASE_OUT } satisfies Transition,
  slow: { duration: 0.55, ease: EASE_OUT } satisfies Transition,
  pageExit: { duration: 0.38, ease: EASE_IN_OUT } satisfies Transition,
  pageEnter: { duration: 0.55, ease: EASE_OUT } satisfies Transition,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const fadeScale: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
}

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export const viewportOnce = { once: true, margin: "-60px 0px" as const }
export const viewportOnceTight = { once: true, margin: "-40px 0px" as const }
