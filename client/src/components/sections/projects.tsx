import { motion } from "framer-motion"
import { ExternalLink, Github, Play } from "lucide-react"
import { Constants } from "@/lib/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLocation } from "wouter"
import { useLanguage } from "@/contexts/language-context"

export function Projects() {
  const [, setLocation] = useLocation()
  const { t } = useLanguage()

  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("projects.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Constants.PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Play className="h-12 w-12 text-primary/40" />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {project.category}
                    </span>
                  </div>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(project.githubUrl, "_blank")}
                        className="hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 cursor-pointer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {t("projects.button.github")}
                      </Button>
                    )}
                    {project.playStoreUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(project.playStoreUrl, "_blank")}
                        className="hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 cursor-pointer"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {t("projects.button.playStore")}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLocation(`/project/${project.id}`)}
                      className="hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t("projects.button.details")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

