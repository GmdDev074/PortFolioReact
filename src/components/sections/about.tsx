import { Constants } from "@/lib/constants"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import { AnimatedStat } from "@/components/motion/animated-stat"
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal"

export function About() {
  return (
    <section
      id="about"
      data-snap
      className="glass-section py-5 sm:py-6 md:py-10"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2">
          <SectionReveal className="order-2 lg:order-1">
            <Card className="bg-gradient-to-br from-primary/15 to-primary/5 p-4 sm:p-5">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {Constants.STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <AnimatedStat
                      value={stat.value}
                      className="mb-0.5 block text-2xl font-bold text-primary sm:text-3xl"
                    />
                    <div className="text-[11px] text-muted-foreground sm:text-xs">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </SectionReveal>

          <SectionReveal className="order-1 lg:order-2" delay={0.04}>
            <p className="mb-2 text-sm font-medium text-primary sm:text-base">
              {Constants.ABOUT.subtitle}
            </p>
            <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl">
              {Constants.ABOUT.title}
            </h2>
            <p className="mb-6 text-sm text-muted-foreground sm:mb-8 sm:text-base">
              {Constants.ABOUT.description}
            </p>

            <StaggerContainer fast className="space-y-3 sm:space-y-4">
              {Constants.WHY_CHOOSE_ME.map((feature) => (
                <StaggerItem key={feature} className="flex items-center gap-2 sm:gap-3">
                  <div className="flex-shrink-0 rounded-full bg-primary/10 p-1">
                    <Check className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-sm text-foreground sm:text-base">{feature}</span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
