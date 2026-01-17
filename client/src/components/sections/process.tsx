import { motion } from "framer-motion"
import { Constants } from "@/lib/constants"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export function Process() {
  const { t } = useLanguage()
  return (
    <section id="process" className="py-16 md:py-24 bg-slate-900 text-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("process.title")}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t("process.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-700 group-hover:bg-primary transition-colors z-0"></div>
                )}
                <Card className="h-full bg-slate-800 border-slate-700 hover:border-primary transition-all duration-300 group-hover:bg-slate-800/80">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl font-bold text-primary/50 group-hover:text-primary transition-colors">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t(`process.step${stepNum}.title`)}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400">{t(`process.step${stepNum}.description`)}</p>
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

