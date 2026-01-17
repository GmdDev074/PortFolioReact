import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { Check } from "lucide-react"
import { Constants } from "@/lib/constants"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export function About() {
  const { t } = useLanguage()
  const [animatedStats, setAnimatedStats] = useState(
    Constants.STATS.map((stat, index) => ({ value: "0", label: "" }))
  )
  const statsRef = useRef<HTMLDivElement>(null)

  // Map stat labels to translations
  const getStatLabel = (index: number) => {
    const labels = [
      t("about.stats.publishedApps"),
      t("about.stats.projectsCompleted"),
      t("about.stats.yearsExperience"),
      t("about.stats.averageRating"),
    ]
    return labels[index] || ""
  }

  useEffect(() => {
    // Update labels when language changes
    setAnimatedStats(prev => prev.map((stat, index) => ({ ...stat, label: getStatLabel(index) })))
  }, [t])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset stats when entering viewport
            setAnimatedStats(Constants.STATS.map(() => ({ value: "0", label: "" })))
            
            // Animate stats in
            Constants.STATS.forEach((stat, index) => {
              setTimeout(() => {
                setAnimatedStats((prev) => {
                  const newStats = [...prev]
                  newStats[index] = { value: stat.value, label: getStatLabel(index) }
                  return newStats
                })
              }, index * 100)
            })
          } else {
            // Reset when leaving viewport
            setAnimatedStats(Constants.STATS.map(() => ({ value: "0", label: "" })))
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [])

  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left: Statistics Card */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {animatedStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: animatedStats[index].value !== "0" ? 1 : 0,
                      scale: animatedStats[index].value !== "0" ? 1 : 0.5,
                    }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Right: Why Choose Me */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <p className="text-primary font-medium mb-2 text-sm sm:text-base">{t("about.subtitle")}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">{t("about.title")}</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
              {t("about.description")}
            </p>

            <div className="space-y-3 sm:space-y-4">
              {Constants.WHY_CHOOSE_ME.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2 sm:gap-3"
                >
                  <div className="p-1 rounded-full bg-primary/10 flex-shrink-0">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <span className="text-sm sm:text-base text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

