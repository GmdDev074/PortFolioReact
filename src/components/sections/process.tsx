import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Constants } from "@/lib/constants"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { SectionReveal } from "@/components/motion/reveal"
import { useLanguage } from "@/contexts/language-context"
import { useIsDesktop, useMotionEnabled } from "@/hooks/use-motion-prefs"
import { transition, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

function ProcessDot({ filled, delay = 0 }: { filled: boolean; delay?: number }) {
  return (
    <motion.span
      className={cn(
        "relative z-20 block h-3 w-3 rounded-full border-2 border-primary",
        filled ? "bg-primary" : "bg-background"
      )}
      initial={false}
      animate={{
        backgroundColor: filled
          ? "hsl(var(--primary))"
          : "hsl(var(--background))",
        scale: filled ? 1 : 0.92,
      }}
      transition={{ ...transition.base, delay }}
    />
  )
}

function ProcessCard({
  stepNumber,
  title,
  description,
}: {
  stepNumber: string
  title: string
  description: string
}) {
  return (
    <Card className="group flex h-full flex-col transition-transform duration-300 ease-out hover:-translate-y-1">
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
}

export function Process() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const motionEnabled = useMotionEnabled()
  const isDesktop = useIsDesktop()
  const useTimeline = motionEnabled && isDesktop

  // Fill rail + dots as soon as the timeline is on screen
  const inView = useInView(railRef, { once: true, amount: 0.4 })
  const filled = !useTimeline || inView || !motionEnabled

  return (
    <section
      ref={sectionRef}
      id="process"
      data-snap
      className="glass-section overflow-x-clip bg-gradient-to-br from-background to-muted/20 py-5 sm:py-6 md:py-10"
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

        <div className="relative overflow-visible">
          {/* Shared rail: line + dots share one flex row so they stay centered */}
          {useTimeline && (
            <div
              ref={railRef}
              className="relative mb-3 hidden h-3 items-center lg:flex"
            >
              <div className="absolute left-[12.5%] right-[12.5%] top-1/2 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-border/80">
                <motion.div
                  className="h-full origin-left rounded-full bg-primary"
                  initial={false}
                  animate={{ scaleX: filled ? 1 : 0 }}
                  transition={transition.reveal}
                />
              </div>

              <div className="relative z-10 grid w-full grid-cols-4">
                {Constants.PROCESS_STEPS.map((step, index) => (
                  <div key={step.number} className="flex justify-center">
                    <ProcessDot filled={filled} delay={index * 0.06} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative z-10 grid grid-cols-1 gap-2.5 overflow-visible pt-1 sm:grid-cols-2 lg:grid-cols-4">
            {Constants.PROCESS_STEPS.map((step, index) => {
              const stepNum = index + 1
              const title = t(`process.step${stepNum}.title`)
              const description = t(`process.step${stepNum}.description`)

              if (!motionEnabled) {
                return (
                  <div key={step.number} className="h-full">
                    <ProcessCard
                      stepNumber={step.number}
                      title={title}
                      description={description}
                    />
                  </div>
                )
              }

              return (
                <motion.div
                  key={step.number}
                  className="h-full"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ ...transition.reveal, delay: index * 0.05 }}
                >
                  <ProcessCard
                    stepNumber={step.number}
                    title={title}
                    description={description}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
