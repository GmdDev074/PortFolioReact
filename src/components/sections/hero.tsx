import { motion } from "framer-motion"
import { CheckCircle2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useLocation } from "wouter"

export function Hero() {
  const { t } = useLanguage()
  const [, setLocation] = useLocation()

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleViewResume = () => {
    setLocation("/resume")
  }


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 pt-16 sm:pt-20">
      <div className="container mx-auto px-4 sm:px-6 py-5 sm:py-6 md:py-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative inline-flex items-center mb-4 sm:mb-6"
          >
            {/* Smooth pulsing ring with 50% reduced expansion */}
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full bg-primary"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: [0.4, 0, 0.6, 1],
                repeatType: "loop"
              }}
            />
            <span className="relative inline-flex rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary border border-primary/20">
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 px-2"
          >
            {t("hero.title")}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 block sm:inline">
              {t("hero.titleHighlight")}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0"
          >
            {t("hero.description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4 sm:px-0"
          >
            <Button size="lg" onClick={scrollToProjects} className="w-full sm:w-auto">
              {t("hero.primaryButton")}
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToContact} className="w-full sm:w-auto">
              {t("hero.secondaryButton")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleViewResume}
              className="w-full sm:w-auto hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <FileText className="h-4 w-4 mr-2" />
              {t("hero.viewResume")}
            </Button>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 px-4 sm:px-0"
          >
            {[t("hero.feature1"), t("hero.feature2")].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground"
              >
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="whitespace-nowrap">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}

