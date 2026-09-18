import type { ComponentType } from "react"
import {
  Code,
  Coffee,
  Layout,
  Flame,
  Database,
  Bell,
  Settings,
  Smartphone,
  Server,
  Cpu,
  Layers,
  PenTool,
  Hash,
  Github,
  GitBranch,
  Send,
  Package,
  Play,
} from "lucide-react"
import { Constants } from "@/lib/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal"
import { useLanguage } from "@/contexts/language-context"

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Code,
  Coffee,
  Layout,
  Flame,
  Database,
  Bell,
  Settings,
  Smartphone,
  Server,
  Cpu,
  Layers,
  PenTool,
  Hash,
  Github,
  GitBranch,
  Send,
  Package,
  Play,
}

export function Skills() {
  const { t } = useLanguage()
  return (
    <section id="skills" data-snap className="bg-background py-5 sm:py-6 md:py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionReveal className="mb-8 text-center sm:mb-12">
          <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
            {t("skills.title")}
          </h2>
          <p className="mx-auto max-w-2xl px-4 text-sm text-muted-foreground sm:px-0 sm:text-base">
            {t("skills.subtitle")}
          </p>
        </SectionReveal>

        <StaggerContainer
          fast
          className="mb-8 grid auto-rows-fr grid-cols-1 gap-2.5 sm:mb-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {Constants.SKILLS.map((skill) => {
            const Icon = iconMap[skill.icon] || Code
            return (
              <StaggerItem key={skill.id} className="h-full">
                <Card className="group flex h-full flex-col transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary/35 hover:shadow-md">
                  <CardHeader className="pb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="rounded-md bg-primary/10 p-1.5 text-primary transition-transform duration-300 ease-out group-hover:scale-105">
                        <Icon className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-sm sm:text-base">{skill.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <CardDescription>{skill.description}</CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <SectionReveal className="mb-8 sm:mb-10">
          <h3 className="mb-4 text-center text-lg font-bold text-black dark:text-white sm:mb-5 sm:text-xl md:text-2xl">
            {t("skills.toolsIUse")}
          </h3>
          <StaggerContainer
            fast
            className="mx-auto flex w-fit max-w-full justify-center gap-2 overflow-x-auto px-1 py-1 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {Constants.TOOLS_I_USE.map((tool, index) => {
              const Icon = iconMap[tool.icon] || Code
              return (
                <StaggerItem
                  key={index}
                  className="flex w-[72px] flex-shrink-0 flex-col items-center gap-1.5 sm:w-[84px]"
                >
                  <Card className="group flex aspect-square w-full cursor-pointer items-center justify-center border border-primary/20 p-2 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-primary/45 hover:shadow-md">
                    <Icon className="h-5 w-5 text-primary transition-transform duration-300 ease-out group-hover:scale-105 sm:h-6 sm:w-6" />
                  </Card>
                  <span className="text-center text-[10px] text-muted-foreground sm:text-xs">
                    {tool.name}
                  </span>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </SectionReveal>

        <SectionReveal>
          <h3 className="mb-4 text-center text-lg font-bold text-black dark:text-white sm:mb-5 sm:text-xl md:text-2xl">
            {t("skills.daysICode")}
          </h3>
          <Card className="border border-primary/20 bg-card p-3 sm:p-4">
            <CardContent className="p-0">
              <div className="overflow-x-auto pb-1">
                <a
                  href={Constants.PERSONAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={`https://ghchart.rshah.org/GmdDev074`}
                    alt="GitHub Contribution Calendar"
                    className="h-auto w-full"
                  />
                </a>
              </div>
              <div className="mt-3 border-t border-border pt-3">
                <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                  <p className="text-center text-xs text-muted-foreground sm:text-left sm:text-sm">
                    <span className="font-semibold text-foreground">534</span> contributions
                    in the last year
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground sm:text-xs">
                    <span>Less</span>
                    <div className="flex gap-0.5">
                      <div className="h-2.5 w-2.5 rounded-sm bg-muted"></div>
                      <div className="h-2.5 w-2.5 rounded-sm bg-primary/20"></div>
                      <div className="h-2.5 w-2.5 rounded-sm bg-primary/40"></div>
                      <div className="h-2.5 w-2.5 rounded-sm bg-primary/60"></div>
                      <div className="h-2.5 w-2.5 rounded-sm bg-primary"></div>
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </SectionReveal>
      </div>
    </section>
  )
}
