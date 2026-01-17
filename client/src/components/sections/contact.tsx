import { motion } from "framer-motion"
import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import { Constants } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDeviceInfo } from "@/lib/deviceInfo"
import { toast } from "@/components/ui/toaster"
import { useLanguage } from "@/contexts/language-context"

export function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const deviceInfo = getDeviceInfo()
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          deviceInfo,
        }),
      })

      if (response.ok) {
        toast.success("Message sent successfully!")
        setFormData({ name: "", email: "", message: "" })
      } else {
        toast.error("Failed to send message. Please try again.")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-background">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-3 sm:space-y-4 order-2 lg:order-1">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.a
                  key={index}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
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

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 order-1 lg:order-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>{t("contact.formTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t("contact.label.name")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder={t("contact.placeholder.name")}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t("contact.label.email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder={t("contact.placeholder.email")}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t("contact.label.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      placeholder={t("contact.placeholder.message")}
                    />
                  </div>
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? t("contact.button.sending") : t("contact.button.submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

