import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { Constants } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal"

export function Contact() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    Constants.PERSONAL.location
  )}`

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: Constants.PERSONAL.email,
      href: `mailto:${Constants.PERSONAL.email}`,
      external: false,
    },
    {
      icon: Phone,
      title: "Phone",
      value: Constants.PERSONAL.phone,
      href: `tel:${Constants.PERSONAL.phoneRaw}`,
      external: false,
    },
    {
      icon: MapPin,
      title: "Location",
      value: Constants.PERSONAL.location,
      href: mapsUrl,
      external: true,
    },
  ]

  return (
    <section id="contact" data-snap className="glass-section py-5 sm:py-6 md:py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionReveal className="mb-8 text-center sm:mb-12">
          <p className="mb-2 text-sm font-medium text-primary sm:text-base">
            {Constants.CONTACT_SECTION.subtitle}
          </p>
          <h2 className="mb-3 px-4 text-2xl font-bold sm:mb-4 sm:px-0 sm:text-3xl md:text-4xl">
            {Constants.CONTACT_SECTION.title}
          </h2>
          <p className="mx-auto max-w-2xl px-4 text-sm text-muted-foreground sm:px-0 sm:text-base">
            {Constants.CONTACT_SECTION.description}
          </p>
          <p className="mx-auto mt-3 max-w-xl px-4 text-xs text-muted-foreground sm:px-0 sm:text-sm">
            Based in {Constants.PERSONAL.location.split(",")[0]} · usually replies within a day
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
                <a
                  href={info.href}
                  className="block h-full"
                  {...(info.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
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

        <SectionReveal delay={0.06} className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-3">
          <a
            href={Constants.PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-9 items-center justify-center gap-2 rounded-full border border-input bg-background px-3 text-sm font-medium text-foreground transition-[transform,color,background-color,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-transparent hover:bg-primary hover:text-primary-foreground active:translate-y-0 active:scale-[0.98]"
          >
            <Linkedin className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[3px]" />
            LinkedIn
          </a>
          <a
            href={Constants.PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-9 items-center justify-center gap-2 rounded-full border border-input bg-background px-3 text-sm font-medium text-foreground transition-[transform,color,background-color,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-transparent hover:bg-primary hover:text-primary-foreground active:translate-y-0 active:scale-[0.98]"
          >
            <Github className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[3px]" />
            GitHub
          </a>
          <a
            href={`mailto:${Constants.PERSONAL.email}`}
            className="group inline-flex h-9 items-center justify-center gap-2 rounded-full bg-primary px-3 text-sm font-medium text-primary-foreground transition-[transform,color,background-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0 active:scale-[0.98]"
          >
            <Mail className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[3px]" />
            Email Me
          </a>
        </SectionReveal>
      </div>
    </section>
  )
}
