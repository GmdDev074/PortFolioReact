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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {Constants.SKILLS.map((skill, index) => {
            const Icon = iconMap[skill.icon] || Code
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{skill.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {skill.description}
                    </CardDescription>
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
          className="mb-12 sm:mb-16"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center text-black dark:text-white">
            {t("skills.toolsIUse")}
          </h3>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto overflow-y-visible scroll-smooth pb-4 px-1 py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {Constants.TOOLS_I_USE.map((tool, index) => {
              const Icon = iconMap[tool.icon] || Code
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center gap-2 flex-shrink-0 w-[100px] sm:w-[120px]"
                >
                  <Card className="w-full aspect-square p-3 sm:p-4 border-2 border-primary/20 hover:border-primary/60 hover:shadow-lg transition-all duration-300 cursor-pointer bg-card">
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                    </div>
                  </Card>
                  <span className="text-xs sm:text-sm text-muted-foreground text-center">{tool.name}</span>
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
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center text-black dark:text-white">
            {t("skills.daysICode")}
          </h3>
          <Card className="p-4 sm:p-6 bg-card border-2 border-primary/20">
            <CardContent className="p-0">
              <div className="overflow-x-auto pb-2">
                <a
                  href={Constants.PERSONAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={`https://ghchart.rshah.org/GmdDev074`}
                    alt="GitHub Contribution Calendar"
                    className="w-full h-auto"
                  />
                </a>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm sm:text-base text-muted-foreground text-center sm:text-left">
                    <span className="font-semibold text-foreground">534</span> contributions in the last year
                  </p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <span>Less</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-sm bg-muted"></div>
                      <div className="w-3 h-3 rounded-sm bg-primary/20"></div>
                      <div className="w-3 h-3 rounded-sm bg-primary/40"></div>
                      <div className="w-3 h-3 rounded-sm bg-primary/60"></div>
                      <div className="w-3 h-3 rounded-sm bg-primary"></div>
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

