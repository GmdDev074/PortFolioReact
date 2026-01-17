import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Constants } from "@/lib/constants"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel } from "@/components/ui/carousel"
import { useLanguage } from "@/contexts/language-context"

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function getAvatarColor(name: string): string {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-teal-500",
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

interface Testimonial {
  name: string
  rating: number
  text: string
  avatar: string
}

function TestimonialCard({ 
  testimonial
}: { 
  testimonial: Testimonial
}) {
  return (
    <div className="flex-shrink-0 h-full">
      <Card className="w-[350px] h-[240px] bg-card flex flex-col">
        <CardContent className="p-6 flex flex-col flex-1 h-full">
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(
                testimonial.name
              )}`}
            >
              {testimonial.avatar || getInitials(testimonial.name)}
            </div>
            <div>
              <h4 className="font-semibold">{testimonial.name}</h4>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(testimonial.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {testimonial.rating}
                </span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground flex-1 text-sm leading-relaxed line-clamp-4">{testimonial.text}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export function Reviews() {
  const { t } = useLanguage()
  const testimonialCards = Constants.TESTIMONIALS.map((testimonial, index) => (
    <TestimonialCard key={index} testimonial={testimonial} />
  ))

  return (
    <section id="reviews" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("reviews.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("reviews.subtitle")}
          </p>
        </motion.div>

        <div className="overflow-x-hidden overflow-y-visible">
          <div className="w-full py-4">
            <Carousel autoScroll speed={50} pauseOnHover>
              {testimonialCards}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}

