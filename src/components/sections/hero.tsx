import { useRef, type MouseEvent } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/motion/magnetic"
import { Atmosphere } from "@/components/motion/atmosphere"
import { PhoneFrame } from "@/components/ui/phone-frame"
import { Constants } from "@/lib/constants"
import { projects } from "@/data/projects"
import { useLocation } from "wouter"
import { useCanHoverInteract } from "@/hooks/use-motion-prefs"
import { transition } from "@/lib/motion"
import { cn } from "@/lib/utils"

const showcase =
  projects.find((p) => p.id === "crowdwave") ??
  projects.find((p) => p.featured && p.coverImage) ??
  projects.find((p) => p.coverImage)

const showcaseShots = [
  "/projects/crowdwave/CrowdWave03.webp",
  "/projects/crowdwave/CrowdWave04.webp",
  "/projects/crowdwave/CrowdWave05.webp",
]

export function Hero() {
  const [, setLocation] = useLocation()
  const prefersReduced = useReducedMotion()
  const canParallax = useCanHoverInteract()
  const sectionRef = useRef<HTMLElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 22, mass: 0.4 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 22, mass: 0.4 })

  const blobOneX = useTransform(springX, [-0.5, 0.5], [-5, 5])
  const blobOneY = useTransform(springY, [-0.5, 0.5], [-5, 5])
  const blobTwoX = useTransform(springX, [-0.5, 0.5], [10, -10])
  const blobTwoY = useTransform(springY, [-0.5, 0.5], [8, -8])
  const stageX = useTransform(springX, [-0.5, 0.5], [-8, 8])
  const stageY = useTransform(springY, [-0.5, 0.5], [-6, 6])

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (!canParallax || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const openShowcase = () => {
    if (showcase?.detailPath) setLocation(showcase.detailPath)
  }

  const stage = (y: number, delay: number) =>
    prefersReduced
      ? {
          initial: false as const,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0 },
        }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { ...transition.reveal, delay },
        }

  return (
    <section
      ref={sectionRef}
      id="home"
      data-snap
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden glass-section pb-24 pt-20 sm:pt-24 lg:pb-8"
    >
      <Atmosphere tone="hero" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
          {/* Copy — brand-first */}
          <div className="text-center lg:text-left">
            <motion.p
              {...stage(8, 0.02)}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm"
            >
              {Constants.HERO.badge}
            </motion.p>

            <motion.h1
              {...stage(16, 0.08)}
              className="mb-4 font-display text-4xl font-bold tracking-tight sm:mb-5 sm:text-5xl md:text-6xl xl:text-7xl"
            >
              <span className="block text-foreground">{Constants.PERSONAL.name}</span>
              <span className="mt-1 block bg-gradient-to-r from-primary via-primary to-primary/55 bg-clip-text text-transparent">
                {Constants.HERO.titleHighlight}
              </span>
            </motion.h1>

            <motion.p
              {...stage(10, 0.14)}
              className="mx-auto mb-7 max-w-xl text-base text-muted-foreground sm:mb-8 sm:text-lg lg:mx-0"
            >
              {showcase
                ? `${showcase.name} and more — live Play Store apps built with Kotlin, Compose, and React Native.`
                : Constants.HERO.description}
            </motion.p>

            <motion.div
              {...stage(10, 0.2)}
              className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start"
            >
              <Magnetic className="w-full sm:w-auto" strength={0.18}>
                <Button size="lg" onClick={scrollToProjects} className="w-full sm:w-auto">
                  {Constants.HERO.primaryButton}
                </Button>
              </Magnetic>
              <Magnetic className="w-full sm:w-auto" strength={0.18}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToContact}
                  className="w-full sm:w-auto"
                >
                  {Constants.HERO.secondaryButton}
                </Button>
              </Magnetic>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setLocation("/resume")}
                className="w-full transition-colors duration-200 hover:bg-primary hover:text-primary-foreground sm:w-auto"
              >
                <FileText className="mr-2 h-4 w-4" />
                {Constants.HERO.viewResume}
              </Button>
            </motion.div>
          </div>

          {/* Dominant CrowdWave phone stage */}
          {showcase?.coverImage && (
            <motion.div
              {...stage(20, 0.12)}
              className="relative mx-auto flex w-full max-w-[420px] items-end justify-center lg:max-w-none lg:justify-end"
            >
              <motion.div
                className="relative aspect-[10/12] w-full max-w-[380px] sm:max-w-[420px]"
                style={canParallax ? { x: stageX, y: stageY } : undefined}
              >
                {/* Depth phones — no labels / badges on media */}
                <div
                  aria-hidden
                  className="absolute bottom-[6%] left-[-4%] w-[42%] -rotate-[14deg] opacity-55 sm:left-[-8%] sm:w-[40%]"
                >
                  <PhoneFrame size="sm">
                    <img
                      src={showcaseShots[2]}
                      alt=""
                      className="aspect-[9/19] w-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                  </PhoneFrame>
                </div>
                <div
                  aria-hidden
                  className="absolute bottom-[4%] right-[-2%] w-[44%] rotate-[12deg] opacity-70 sm:right-[-6%] sm:w-[42%]"
                >
                  <PhoneFrame size="sm">
                    <img
                      src={showcaseShots[1]}
                      alt=""
                      className="aspect-[9/19] w-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                  </PhoneFrame>
                </div>

                <button
                  type="button"
                  onClick={openShowcase}
                  className={cn(
                    "absolute bottom-0 left-1/2 z-10 w-[58%] -translate-x-1/2",
                    "transition-transform duration-300 ease-out hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                  aria-label={`Open ${showcase.name} case study`}
                >
                  {!prefersReduced && (
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-primary/20 blur-3xl"
                      animate={{ opacity: [0.25, 0.45, 0.25] }}
                      transition={{
                        duration: 5.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                  <PhoneFrame size="lg" className="shadow-[0_40px_80px_-30px_rgba(15,23,42,0.75)]">
                    <img
                      src={showcaseShots[0]}
                      alt={`${showcase.name} app screenshot`}
                      className="aspect-[9/19] w-full object-cover object-top"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </PhoneFrame>
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="ambient-blob absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/[0.1] blur-3xl dark:bg-primary/[0.07]"
          style={canParallax ? { x: blobOneX, y: blobOneY } : undefined}
        />
        <motion.div
          className="ambient-blob-delayed absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/[0.1] blur-3xl dark:bg-primary/[0.07]"
          style={canParallax ? { x: blobTwoX, y: blobTwoY } : undefined}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent lg:h-24"
        />
      </div>
    </section>
  )
}
