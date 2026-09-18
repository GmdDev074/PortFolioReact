import { motion } from "framer-motion"
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
import { useLanguage } from "@/contexts/language-context"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
    <section id="skills" className="py-5 sm:py-6 md:py-10 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t("skills.title")}</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <div className="mb-8 grid auto-rows-fr grid-cols-1 gap-2.5 sm:mb-10 sm:grid-cols-2 lg:grid-cols-3">
          {Constants.SKILLS.map((skill, index) => {
            const Icon = iconMap[skill.icon] || Code
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                className="h-full"
              >
                <Card className="flex h-full flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <CardHeader className="pb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="rounded-md bg-primary/10 p-1.5 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-sm sm:text-base">{skill.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <CardDescription>{skill.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Tools I Use Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <h3 className="mb-4 text-center text-lg font-bold text-black dark:text-white sm:mb-5 sm:text-xl md:text-2xl">
            {t("skills.toolsIUse")}
          </h3>
          <div className="mx-auto flex w-fit max-w-full justify-center gap-2 overflow-x-auto px-1 py-1 pb-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {Constants.TOOLS_I_USE.map((tool, index) => {
              const Icon = iconMap[tool.icon] || Code
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.04, duration: 0.25 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex w-[72px] flex-shrink-0 flex-col items-center gap-1.5 sm:w-[84px]"
                >
                  <Card className="flex aspect-square w-full cursor-pointer items-center justify-center border border-primary/20 p-2 transition-all duration-200 hover:border-primary/50 hover:shadow-md">
                    <Icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                  </Card>
                  <span className="text-center text-[10px] text-muted-foreground sm:text-xs">{tool.name}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Days I Code Section - GitHub Contributions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
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
                    <span className="font-semibold text-foreground">534</span> contributions in the last year
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
        </motion.div>
      </div>
    </section>
  )
}

