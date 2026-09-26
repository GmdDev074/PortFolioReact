import type { Transition, Variants } from "framer-motion"

/** Micro interactions — buttons, links, indicators */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const transition = {
  /** Level 2 — interaction */
  fast: { duration: 0.22, ease: EASE_OUT } satisfies Transition,
  hover: { duration: 0.28, ease: EASE_OUT } satisfies Transition,
  /** Level 3 — content reveal */
  base: { duration: 0.45, ease: EASE_OUT } satisfies Transition,
  reveal: { duration: 0.55, ease: EASE_OUT } satisfies Transition,
}

/** Subtle composition entrance — not a big template lift */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

/** Tiny stagger — section should feel like one composition */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
}

export const viewportOnce = { once: true, margin: "-48px 0px" as const }
