import { useRef, type MouseEvent } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion"
import { CheckCircle2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/motion/magnetic"
import { useLanguage } from "@/contexts/language-context"
import { useLocation } from "wouter"
import { useCanHoverInteract } from "@/hooks/use-motion-prefs"
import { transition } from "@/lib/motion"

export function Hero() {
  const { t } = useLanguage()
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

  const handleViewResume = () => {
    setLocation("/resume")
  }

  const stage = (y: number, delay: number) =>
    prefersReduced
      ? { initial: false as const, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 pt-16 sm:pt-20"
    >
      <div className="container relative z-10 mx-auto px-4 py-5 sm:px-6 sm:py-6 md:py-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            {...stage(10, 0.04)}
            className="relative mb-4 inline-flex items-center sm:mb-6"
          >
            {!prefersReduced && (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-primary/25"
                animate={{ opacity: [0.2, 0.35, 0.2] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
            <span className="relative inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary sm:px-4 sm:py-2 sm:text-sm">
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            {...stage(18, 0.1)}
            className="mb-4 px-2 text-3xl font-bold sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            {t("hero.title")}{" "}
            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent sm:inline">
              {t("hero.titleHighlight")}
            </span>
          </motion.h1>

          <motion.p
            {...stage(10, 0.17)}
            className="mx-auto mb-6 max-w-2xl px-4 text-base text-muted-foreground sm:mb-8 sm:px-0 sm:text-lg md:text-xl"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            {...stage(10, 0.24)}
            className="mb-8 flex flex-col justify-center gap-3 px-4 sm:mb-12 sm:flex-row sm:gap-4 sm:px-0"
          >
            <Magnetic className="w-full sm:w-auto" strength={0.18}>
              <Button size="lg" onClick={scrollToProjects} className="w-full sm:w-auto">
                {t("hero.primaryButton")}
              </Button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto" strength={0.18}>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToContact}
                className="w-full sm:w-auto"
              >
                {t("hero.secondaryButton")}
              </Button>
            </Magnetic>
            <Button
              size="lg"
              variant="outline"
              onClick={handleViewResume}
              className="w-full transition-colors duration-200 hover:bg-primary hover:text-primary-foreground sm:w-auto"
            >
              <FileText className="mr-2 h-4 w-4" />
              {t("hero.viewResume")}
            </Button>
          </motion.div>

          <motion.div
            {...stage(8, 0.28)}
            className="flex flex-wrap justify-center gap-4 px-4 sm:gap-6 sm:px-0"
          >
            {[t("hero.feature1"), t("hero.feature2")].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm"
              >
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary sm:h-5 sm:w-5" />
                <span className="whitespace-nowrap">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="ambient-blob absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/[0.07] blur-3xl"
          style={canParallax ? { x: blobOneX, y: blobOneY } : undefined}
        />
        <motion.div
          className="ambient-blob-delayed absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/[0.07] blur-3xl"
          style={canParallax ? { x: blobTwoX, y: blobTwoY } : undefined}
        />
      </div>
    </section>
  )
}
