import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import { Constants } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export function Contact() {
  const { t } = useLanguage()

  const contactInfo = [
    {
      icon: Mail,
      title: t("contact.info.email"),
      value: Constants.PERSONAL.email,
      href: `mailto:${Constants.PERSONAL.email}`,
    },
    {
      icon: Phone,
      title: t("contact.info.phone"),
      value: Constants.PERSONAL.phone,
      href: `tel:${Constants.PERSONAL.phoneRaw}`,
    },
    {
      icon: MapPin,
      title: t("contact.info.location"),
      value: Constants.PERSONAL.location,
      href: "#",
    },
  ]

  return (
    <section id="contact" className="py-5 sm:py-6 md:py-10 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-primary font-medium mb-2 text-sm sm:text-base">{t("contact.subtitle")}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4 sm:px-0">
            {t("contact.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <motion.a
                key={index}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="block"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <CardTitle className="text-base sm:text-lg">{info.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base text-muted-foreground break-words">{info.value}</p>
                  </CardContent>
                </Card>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

