import { useEffect } from "react"
import { useLocation, useRoute } from "wouter"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Layers,
  MapPin,
  Shield,
  Smartphone,
  Workflow,
  Zap,
} from "lucide-react"
import { getProjectDetail } from "@/data/projectDetails"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ImageCarousel } from "@/components/ui/image-carousel"
import { cn } from "@/lib/utils"

const sectionFade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.3 },
}

function scrollToProjects() {
  const element = document.getElementById("projects")
  if (!element) return
  const navbar = document.querySelector("nav")
  const navbarHeight = navbar ? navbar.offsetHeight : 80
  const elementPosition = element.offsetTop - navbarHeight
  window.scrollTo({
    top: Math.max(0, elementPosition),
    behavior: "smooth",
  })
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer")
}

export function ProjectDetail() {
  const [, params] = useRoute("/projects/:id")
  const [, setLocation] = useLocation()
  const project = params?.id ? getProjectDetail(params.id) : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [params?.id])

  useEffect(() => {
    if (!project) {
      setLocation("/#projects")
      setTimeout(scrollToProjects, 150)
    }
  }, [project, setLocation])

  if (!project) {
    return null
  }

  const goBackToProjects = () => {
    setLocation("/#projects")
    setTimeout(scrollToProjects, 150)
  }

  return (
    <div className="min-h-screen glass-section">
      {/* Hero */}
      <section className="relative overflow-hidden py-5 md:py-7">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-teal-500/5" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <button
            type="button"
            onClick={goBackToProjects}
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </button>

          <div className="grid items-start gap-5 lg:grid-cols-2 lg:gap-8">
            <div>
              <p className="mb-1.5 text-xs font-semibold tracking-widest text-teal-600 uppercase dark:text-teal-400">
                Case Study
              </p>
              <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl xl:text-4xl">
                {project.name}
              </h1>
              <p className="mb-3 text-base leading-snug text-muted-foreground md:text-lg">
                {project.tagline}
              </p>
              <p className="mb-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.links.playStore && (
                  <Button
                    size="sm"
                    onClick={() => openExternal(project.links.playStore!)}
                    className="px-4"
                  >
                    <Smartphone className="mr-1.5 h-3.5 w-3.5" />
                    Google Play
                  </Button>
                )}
                {project.links.appStore && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openExternal(project.links.appStore!)}
                    className="px-4"
                  >
                    <Smartphone className="mr-1.5 h-3.5 w-3.5" />
                    App Store
                  </Button>
                )}
                {project.links.website && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openExternal(project.links.website!)}
                  >
                    Visit Website
                  </Button>
                )}
              </div>
            </div>

            <div className="mx-auto w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px]">
              <ImageCarousel images={project.images} alt={project.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Platform / Services */}
      <section className="bg-muted/15 py-5 md:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div {...sectionFade} className="mb-5 text-center">
            <p className="mb-1.5 text-xs font-semibold tracking-widest text-teal-600 uppercase dark:text-teal-400">
              Platform
            </p>
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">
              {project.servicesSectionTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 auto-rows-fr gap-2.5 sm:grid-cols-2">
            {project.services.map((service, i) => (
              <motion.div
                key={service.title}
                {...sectionFade}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="h-full"
              >
                <Card className="flex h-full flex-col rounded-xl p-3">
                  <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                    <MapPin className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="mb-0.5 text-sm font-semibold">{service.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-5 md:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 auto-rows-fr gap-2.5 lg:grid-cols-2">
            <motion.div {...sectionFade} className="h-full">
              <Card className="flex h-full flex-col rounded-xl border-red-200 bg-red-50/40 p-3 dark:border-red-900/40 dark:bg-red-950/20">
                <div className="mb-2 flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-red-500" />
                  <h2 className="text-sm font-bold md:text-base">
                    {project.problem.title}
                  </h2>
                </div>
                <ul className="space-y-1.5">
                  {project.problem.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground sm:text-sm"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <motion.div
              {...sectionFade}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="h-full"
            >
              <Card className="flex h-full flex-col rounded-xl border-teal-200 bg-teal-50/40 p-3 dark:border-teal-900/40 dark:bg-teal-950/20">
                <div className="mb-2 flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-teal-600" />
                  <h2 className="text-sm font-bold md:text-base">
                    {project.solution.title}
                  </h2>
                </div>
                <ul className="space-y-1.5">
                  {project.solution.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground sm:text-sm"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-muted/15 py-5 md:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div {...sectionFade} className="mb-5 text-center">
            <p className="mb-1.5 text-xs font-semibold tracking-widest text-teal-600 uppercase dark:text-teal-400">
              Technology
            </p>
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">
              Tech Stack
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 auto-rows-fr gap-2.5 sm:grid-cols-2">
            {project.techStack.map((group, i) => (
              <motion.div
                key={group.category}
                {...sectionFade}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="h-full"
              >
                <Card className="flex h-full flex-col rounded-xl p-3">
                  <h3 className="mb-2 text-[11px] font-semibold tracking-wider uppercase">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-5 md:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div {...sectionFade} className="mb-5 text-center">
            <p className="mb-1.5 text-xs font-semibold tracking-widest text-teal-600 uppercase dark:text-teal-400">
              Architecture
            </p>
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">
              {project.architectureSectionTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-xs text-muted-foreground sm:text-sm">
              {project.architectureSectionIntro}
            </p>
          </motion.div>

          <div
            className={cn(
              "grid grid-cols-1 auto-rows-fr gap-2.5",
              project.architecture.length >= 4
                ? "md:grid-cols-2 xl:grid-cols-4"
                : "md:grid-cols-2"
            )}
          >
            {project.architecture.map((layer, i) => (
              <motion.div
                key={layer.title}
                {...sectionFade}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="h-full"
              >
                <Card className="flex h-full flex-col rounded-xl p-3">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Layers className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                    <h3 className="text-sm font-semibold">{layer.title}</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {layer.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* User Journey */}
      <section className="bg-muted/15 py-5 md:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div {...sectionFade} className="mb-5 text-center">
            <p className="mb-1.5 text-xs font-semibold tracking-widest text-teal-600 uppercase dark:text-teal-400">
              User Journey
            </p>
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">
              {project.flowsSectionTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 auto-rows-fr gap-2.5 md:grid-cols-2 lg:grid-cols-3">
            {project.flows.map((flow, i) => (
              <motion.div
                key={flow.step}
                {...sectionFade}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="h-full"
              >
                <Card className="flex h-full flex-col rounded-xl p-3">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">
                      {flow.step}
                    </span>
                    <Workflow className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                    <h3 className="text-sm font-semibold">{flow.title}</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {flow.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering */}
      <section className="py-5 md:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div {...sectionFade} className="mb-5 text-center">
            <p className="mb-1.5 text-xs font-semibold tracking-widest text-teal-600 uppercase dark:text-teal-400">
              Engineering
            </p>
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">
              {project.devSectionTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 auto-rows-fr gap-2.5 md:grid-cols-2">
            {project.developmentApproach.map((item, i) => (
              <motion.div
                key={item.title}
                {...sectionFade}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="h-full"
              >
                <Card className="flex h-full flex-col rounded-xl p-3">
                  <h3 className="mb-0.5 text-sm font-semibold">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features + Second Carousel */}
      <section className="bg-muted/15 py-5 md:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid items-start gap-5 lg:grid-cols-2 lg:gap-8">
            <motion.div {...sectionFade}>
              <p className="mb-1.5 text-xs font-semibold tracking-widest text-teal-600 uppercase dark:text-teal-400">
                Key Features
              </p>
              <h2 className="mb-3 text-xl font-bold tracking-tight md:text-2xl">
                {project.featuresSectionTitle}
              </h2>
              <ul className="space-y-1.5">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-xs text-muted-foreground sm:text-sm"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              {...sectionFade}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="mx-auto w-full max-w-[220px] sm:max-w-[260px] lg:mx-0 lg:max-w-[300px]"
            >
              <p className="mb-2.5 text-xs font-semibold tracking-widest text-teal-600 uppercase dark:text-teal-400">
                App Screens
              </p>
              <ImageCarousel images={project.images} alt={project.name} />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
