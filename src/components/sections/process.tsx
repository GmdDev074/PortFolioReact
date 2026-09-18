import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { Constants } from "@/lib/constants"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FadeIn, RevealHeading, StaggerContainer, StaggerItem } from "@/components/motion/reveal"
import { useLanguage } from "@/contexts/language-context"
import { useMotionEnabled } from "@/hooks/use-motion-prefs"
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
  const end = (index + 0.55) / total
  const scale = useTransform(progress, [start, end], [0.7, 1])
  const opacity = useTransform(progress, [start, end], [0.45, 1])

  return (
    <motion.span
      className="relative z-10 h-3 w-3 rounded-full border-2 border-primary bg-background"
      style={{ scale, opacity }}
    />
  )
}

export function Process() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const motionEnabled = useMotionEnabled()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 40%"],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
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
        <div className="mb-8 text-center sm:mb-12">
          <RevealHeading className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
            {t("process.title")}
          </RevealHeading>
          <FadeIn>
            <p className="mx-auto max-w-2xl px-4 text-sm text-muted-foreground sm:px-0 sm:text-base">
              {t("process.subtitle")}
            </p>
          </FadeIn>
        </div>

        <div className="relative">
          {motionEnabled && (
            <div className="pointer-events-none absolute left-0 right-0 top-[2.35rem] z-0 hidden px-8 lg:block">
              <div className="mx-auto h-0.5 max-w-5xl overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full origin-left bg-primary"
                  style={{ scaleX: lineScale }}
                />
              </div>
            </div>
          )}

          <StaggerContainer className="relative z-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {Constants.PROCESS_STEPS.map((step, index) => {
              const stepNum = index + 1
              return (
                <StaggerItem key={step.number} scale className="group relative h-full">
                  <div className="mb-2 hidden justify-center lg:flex">
                    {motionEnabled ? (
                      <ProcessDot progress={progress} index={index} total={total} />
                    ) : (
                      <span className="h-3 w-3 rounded-full border-2 border-primary bg-background" />
                    )}
                  </div>
                  <Card className="flex h-full flex-col border-border bg-card transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-primary group-hover:shadow-md">
                    <CardHeader className="pb-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl font-bold text-primary/50 transition-colors group-hover:text-primary sm:text-2xl">
                          {step.number}
                        </span>
                        <h3 className="text-sm font-semibold sm:text-base">
                          {t(`process.step${stepNum}.title`)}
                        </h3>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col">
                      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {t(`process.step${stepNum}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
