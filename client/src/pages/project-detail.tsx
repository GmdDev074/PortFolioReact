import { useEffect } from "react"
import { useRoute } from "wouter"
import { motion } from "framer-motion"
import { ArrowLeft, Github, Play, ExternalLink } from "lucide-react"
import { Constants } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocation } from "wouter"
import { useLanguage } from "@/contexts/language-context"

export function ProjectDetail() {
  const [, params] = useRoute("/project/:id")
  const [, setLocation] = useLocation()
  const { t } = useLanguage()

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [params?.id])

  const project = Constants.PROJECTS.find((p) => p.id === params?.id)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t("projectDetail.notFound")}</h1>
          <Button onClick={() => {
            setLocation("/#projects")
            setTimeout(() => {
              const element = document.getElementById("projects")
              if (element) {
                // Get navbar height dynamically
                const navbar = document.querySelector("nav")
                const navbarHeight = navbar ? navbar.offsetHeight : 80
                const elementPosition = element.offsetTop - navbarHeight
                window.scrollTo({
                  top: Math.max(0, elementPosition),
                  behavior: "smooth"
                })
              }
            }, 150)
          }}>{t("projectDetail.button.backToHome")}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => {
            setLocation("/#projects")
            // Small delay to ensure page navigation completes before scrolling
            setTimeout(() => {
              const element = document.getElementById("projects")
              if (element) {
                // Get navbar height dynamically
                const navbar = document.querySelector("nav")
                const navbarHeight = navbar ? navbar.offsetHeight : 80
                const elementPosition = element.offsetTop - navbarHeight
                window.scrollTo({
                  top: Math.max(0, elementPosition),
                  behavior: "smooth"
                })
              }
            }, 150)
          }}
          className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("projectDetail.backToProjects")}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-8 flex items-center justify-center">
            <Play className="h-20 w-20 text-primary/40" />
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {project.category}
              </span>
            </div>
            <p className="text-lg text-muted-foreground mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              {project.githubUrl && (
                <Button
                  onClick={() => window.open(project.githubUrl, "_blank")}
                  variant="default"
                >
                  <Github className="h-4 w-4 mr-2" />
                  {t("projectDetail.button.viewOnGithub")}
                </Button>
              )}
              {project.playStoreUrl && (
                <Button
                  onClick={() => window.open(project.playStoreUrl, "_blank")}
                  variant="default"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {t("projectDetail.button.viewOnPlayStore")}
                </Button>
              )}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("projectDetail.features")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

