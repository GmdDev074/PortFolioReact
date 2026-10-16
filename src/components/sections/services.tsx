import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, RefreshCw, Rocket, Store, Wrench } from "lucide-react"
import { Constants } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Magnetic } from "@/components/motion/magnetic"
import { SectionReveal } from "@/components/motion/reveal"
import { transition, viewportOnce } from "@/lib/motion"
import { useMotionEnabled } from "@/hooks/use-motion-prefs"
import { cn } from "@/lib/utils"

const iconMap = {
  Rocket,
  RefreshCw,
  Store,
  Wrench,
} as const

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
}

function ServiceCard({
  title,
  description,
  icon,
  highlights,
  index,
}: {
  title: string
  description: string
  icon: keyof typeof iconMap
  highlights: readonly string[]
  index: number
}) {
  const Icon = iconMap[icon]
  const prefersReduced = useReducedMotion()
  const motionEnabled = useMotionEnabled()

  const card = (
    <Card className="group flex h-full flex-col transition-transform duration-300 ease-out hover:-translate-y-1">
      <CardHeader className="pb-1.5">
        <div className="mb-2.5 flex items-center gap-2.5">
          <span
            className={cn(
              "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              "border border-primary/20 bg-primary/10 text-primary",
              "transition-colors duration-300 group-hover:border-primary/35 group-hover:bg-primary/15"
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="text-sm font-semibold sm:text-base">{title}</h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3 pt-0">
        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {description}
        </p>
        <ul className="mt-auto space-y-1.5 border-t border-border/60 pt-3">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-[11px] text-foreground/85 sm:text-xs"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )

  if (!motionEnabled || prefersReduced) {
    return <div className="h-full">{card}</div>
  }

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...transition.reveal, delay: index * 0.05 }}
    >
      {card}
    </motion.div>
  )
}

export function Services() {
  return (
    <section
      id="services"
      data-snap
      className="glass-section py-5 sm:py-6 md:py-10"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <SectionReveal className="mb-8 text-center sm:mb-10">
          <p className="mb-2 text-sm font-medium text-primary sm:text-base">
            {Constants.SERVICES_SECTION.subtitle}
          </p>
          <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
            {Constants.SERVICES_SECTION.title}
          </h2>
          <p className="mx-auto max-w-2xl px-4 text-sm text-muted-foreground sm:px-0 sm:text-base">
            {Constants.SERVICES_SECTION.description}
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {Constants.SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              highlights={service.highlights}
              index={index}
            />
          ))}
        </div>

        <SectionReveal delay={0.08} className="mt-8 flex justify-center sm:mt-10">
          <Magnetic strength={0.16}>
            <Button size="lg" onClick={scrollToContact} className="group gap-2">
              {Constants.SERVICES_SECTION.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </Magnetic>
        </SectionReveal>
      </div>
    </section>
  )
}
