import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { Constants } from "@/lib/constants"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { SectionReveal } from "@/components/motion/reveal"
import { useLanguage } from "@/contexts/language-context"
import { useIsDesktop, useMotionEnabled } from "@/hooks/use-motion-prefs"
import { transition, viewportOnce } from "@/lib/motion"
import type { MotionValue } from "framer-motion"

function ProcessDot({
  progress,
  index,
  total,
}: {
  progress: MotionValue<number>
  index: number
  total: number
}) {
  const start = index / total
  const end = Math.min(1, (index + 0.5) / total)
  const scale = useTransform(progress, [start, end], [1, 1.08])
  const opacity = useTransform(progress, [start, end], [0.45, 1])

  return (
    <motion.span
      className="relative z-10 h-3 w-3 rounded-full border-2 border-primary bg-background"
      style={{ scale, opacity }}
    />
  )
}

function TimelineStep({
  stepNumber,
  title,
  description,
  progress,
  index,
  total,
}: {
  stepNumber: string
  title: string
  description: string
  progress: MotionValue<number>
  index: number
  total: number
}) {
  const start = index / total
  const end = Math.min(1, (index + 0.55) / total)
  const opacity = useTransform(progress, [start, end], [0.55, 1])
  const y = useTransform(progress, [start, end], [8, 0])

  return (
    <motion.div className="group relative h-full" style={{ opacity, y }}>
      <div className="mb-2 flex justify-center">
        <ProcessDot progress={progress} index={index} total={total} />
      </div>
      <Card className="flex h-full flex-col border-border bg-card transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
        <CardHeader className="pb-1.5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl font-bold text-primary/50 transition-colors duration-300 group-hover:text-primary sm:text-2xl">
              {stepNumber}
            </span>
            <h3 className="text-sm font-semibold sm:text-base">{title}</h3>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SimpleStep({
  stepNumber,
  title,
  description,
  animate,
}: {
  stepNumber: string
  title: string
  description: string
  animate: boolean
}) {
  const card = (
    <Card className="group flex h-full flex-col border-border bg-card transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
      <CardHeader className="pb-1.5">
        <div className="flex items-center gap-2.5">
          <span className="text-xl font-bold text-primary/50 transition-colors duration-300 group-hover:text-primary sm:text-2xl">
            {stepNumber}
          </span>
          <h3 className="text-sm font-semibold sm:text-base">{title}</h3>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {description}
        </p>
      </CardContent>
    </Card>
  )

  if (!animate) {
    return <div className="h-full">{card}</div>
  }

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={transition.reveal}
    >
      {card}
    </motion.div>
  )
}

export function Process() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const motionEnabled = useMotionEnabled()
  const isDesktop = useIsDesktop()
  const useTimeline = motionEnabled && isDesktop

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 45%"],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26 })
  const lineScale = useTransform(progress, [0, 1], [0, 1])
  const total = Constants.PROCESS_STEPS.length

  return (
    <section
      ref={sectionRef}
      id="process"
      data-snap
      className="bg-gradient-to-br from-background to-muted/20 py-5 sm:py-6 md:py-10"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <SectionReveal className="mb-8 text-center sm:mb-12">
          <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
            {t("process.title")}
          </h2>
          <p className="mx-auto max-w-2xl px-4 text-sm text-muted-foreground sm:px-0 sm:text-base">
            {t("process.subtitle")}
          </p>
        </SectionReveal>

        <div className="relative">
          {useTimeline && (
            <div className="pointer-events-none absolute left-0 right-0 top-[2.35rem] z-0 hidden px-8 lg:block">
              <div className="mx-auto h-0.5 max-w-5xl overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full origin-left bg-primary"
                  style={{ scaleX: lineScale }}
                />
              </div>
            </div>
          )}

          <div className="relative z-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {Constants.PROCESS_STEPS.map((step, index) => {
              const stepNum = index + 1
              const title = t(`process.step${stepNum}.title`)
              const description = t(`process.step${stepNum}.description`)

              if (useTimeline) {
                return (
                  <TimelineStep
                    key={step.number}
                    stepNumber={step.number}
                    title={title}
                    description={description}
                    progress={progress}
                    index={index}
                    total={total}
                  />
                )
              }

              return (
                <SimpleStep
                  key={step.number}
                  stepNumber={step.number}
                  title={title}
                  description={description}
                  animate={motionEnabled}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
