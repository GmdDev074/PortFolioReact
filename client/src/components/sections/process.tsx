import { motion } from "framer-motion"
import { Constants } from "@/lib/constants"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export function Process() {
  const { t } = useLanguage()
  return (
    <section id="process" className="py-5 sm:py-6 md:py-10 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t("process.title")}</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            {t("process.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Constants.PROCESS_STEPS.map((step, index) => {
            const stepNum = index + 1
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative group"
              >
                {index < Constants.PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border group-hover:bg-primary transition-colors z-0"></div>
                )}
                <Card className="h-full bg-card border-border hover:border-primary transition-all duration-300 group-hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2 sm:mb-4">
                      <div className="text-3xl sm:text-4xl font-bold text-primary/50 group-hover:text-primary transition-colors">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{t(`process.step${stepNum}.title`)}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base text-muted-foreground">{t(`process.step${stepNum}.description`)}</p>
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

