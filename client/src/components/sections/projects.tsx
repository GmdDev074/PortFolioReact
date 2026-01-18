import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { ExternalLink, Github, Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Constants } from "@/lib/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLocation } from "wouter"
import { useLanguage } from "@/contexts/language-context"

export function Projects() {
  const [, setLocation] = useLocation()
  const { t } = useLanguage()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollButtons)
      window.addEventListener('resize', checkScrollButtons)
      return () => {
        container.removeEventListener('scroll', checkScrollButtons)
        window.removeEventListener('resize', checkScrollButtons)
      }
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t("projects.title")}</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg hover:scale-110 hidden sm:flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg hover:scale-110 hidden sm:flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-4 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {Constants.PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px]"
              >
                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  {project.image ? (
                    <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Play className="h-12 w-12 text-primary/40" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-lg sm:text-xl flex-1">{project.title}</CardTitle>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap flex-shrink-0">
                        {project.category}
                      </span>
                    </div>
                    <CardDescription className="text-sm sm:text-base line-clamp-3">
                      {(project as any).shortDescription || project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.githubUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(project.githubUrl!, "_blank")}
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
                          onClick={() => window.open(project.playStoreUrl!, "_blank")}
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
      </div>
    </section>
  )
}

