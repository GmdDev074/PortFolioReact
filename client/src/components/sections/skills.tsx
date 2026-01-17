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
}

export function Skills() {
  const { t } = useLanguage()
  return (
    <section id="skills" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("skills.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </section>
  )
}

