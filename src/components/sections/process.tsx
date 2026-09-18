import { motion } from "framer-motion"
import { Constants } from "@/lib/constants"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export function Process() {
  const { t } = useLanguage()
  return (
    <section id="process" className="bg-gradient-to-br from-background to-muted/20 py-5 sm:py-6 md:py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center sm:mb-12"
        >
          <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
            {t("process.title")}
          </h2>
          <p className="mx-auto max-w-2xl px-4 text-sm text-muted-foreground sm:px-0 sm:text-base">
            {t("process.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {Constants.PROCESS_STEPS.map((step, index) => {
            const stepNum = index + 1
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
                className="group relative h-full"
              >
                {index < Constants.PROCESS_STEPS.length - 1 && (
                  <div className="absolute top-1/2 -right-1.5 z-0 hidden h-0.5 w-3 -translate-y-1/2 bg-border transition-colors group-hover:bg-primary lg:block" />
                )}
                <Card className="flex h-full flex-col border-border bg-card transition-all duration-200 hover:border-primary group-hover:shadow-md">
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
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
