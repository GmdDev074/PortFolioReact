import { Mail, Phone, MapPin } from "lucide-react"
import { Constants } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal"
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
    <section id="contact" data-snap className="glass-section py-5 sm:py-6 md:py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionReveal className="mb-8 text-center sm:mb-12">
          <p className="mb-2 text-sm font-medium text-primary sm:text-base">
            {t("contact.subtitle")}
          </p>
          <h2 className="mb-3 px-4 text-2xl font-bold sm:mb-4 sm:px-0 sm:text-3xl md:text-4xl">
            {t("contact.title")}
          </h2>
          <p className="mx-auto max-w-2xl px-4 text-sm text-muted-foreground sm:px-0 sm:text-base">
            {t("contact.description")}
          </p>
        </SectionReveal>

        <StaggerContainer
          fast
          className="mx-auto grid max-w-5xl auto-rows-fr grid-cols-1 gap-2.5 md:grid-cols-3"
        >
          {contactInfo.map((info) => {
            const Icon = info.icon
            return (
              <StaggerItem key={info.title} className="h-full">
                <a href={info.href} className="block h-full">
                  <Card className="group flex h-full flex-col hover:-translate-y-1">
                    <CardHeader className="pb-1.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex-shrink-0 rounded-md bg-primary/10 p-1.5 text-primary transition-transform duration-300 ease-out group-hover:scale-105">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <CardTitle className="text-sm">{info.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="break-words text-xs text-muted-foreground sm:text-sm">
                        {info.value}
                      </p>
                    </CardContent>
                  </Card>
                </a>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
