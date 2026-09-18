import { motion } from "framer-motion"
import { ArrowUpRight, Smartphone } from "lucide-react"
import { useLocation } from "wouter"
import { mobileProjects } from "@/data/projects"
import type { ProjectListItem } from "@/types/project"
import { FadeIn, RevealHeading, StaggerContainer, StaggerItem } from "@/components/motion/reveal"
import { transition } from "@/lib/motion"

const APP_STORE_ICON = "/icons/app-store.svg"
const GOOGLE_PLAY_ICON = "/icons/google-play.svg"

function StoreIconButton({
  href,
  label,
  imageSrc,
}: {
  href: string
  label: string
  imageSrc: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-background transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-muted"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={imageSrc} alt="" className="h-3.5 w-3.5 object-contain" />
    </a>
  )
}

function ProjectCard({ project }: { project: ProjectListItem }) {
  const [, setLocation] = useLocation()

  return (
    <div className="h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={transition.fast}
        className="group h-full rounded-xl border border-border bg-card p-3 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-primary/40 hover:shadow-md"
      >
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 transition-transform duration-200 group-hover:scale-105">
            <Smartphone className="h-3 w-3 text-primary" />
          </div>
          <h3 className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
            {project.name}
          </h3>
          {project.featured && (
            <span className="shrink-0 rounded-full bg-primary px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-primary-foreground">
              Featured
            </span>
          )}
        </div>

        <p className="mb-2.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground sm:text-xs">
          {project.tagline}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLocation(project.detailPath!)}
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted sm:text-xs"
          >
            Explore Project
            <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>

          {(project.playStore || project.appStore) && (
            <div className="flex shrink-0 items-center gap-1 transition-transform duration-200 group-hover:-translate-y-0.5">
              {project.appStore && (
                <StoreIconButton
                  href={project.appStore}
                  label={`${project.name} on the App Store`}
                  imageSrc={APP_STORE_ICON}
                />
              )}
              {project.playStore && (
                <StoreIconButton
                  href={project.playStore}
                  label={`${project.name} on Google Play`}
                  imageSrc={GOOGLE_PLAY_ICON}
                />
              )}
            </div>
          )}
        </div>

        <div className="mt-2 transition-transform duration-200 group-hover:-translate-y-0.5">
          <span className="inline-flex rounded-full bg-primary/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-primary">
            Mobile App
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export function Projects() {
  return (
    <section id="projects" data-snap className="bg-muted/40 py-5 sm:py-7 md:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-5 text-center sm:mb-6">
          <FadeIn y={16}>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Selected Work
            </p>
          </FadeIn>
          <RevealHeading className="mb-1.5 text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            A Slice of Projects
          </RevealHeading>
          <FadeIn delay={0.08}>
            <p className="mx-auto max-w-2xl text-xs text-muted-foreground sm:text-sm">
              We don't list everything — just a few live products that show the range. Apps on
              the Play Store, platforms in production, and everything in between.
            </p>
          </FadeIn>
        </div>

        <FadeIn className="mb-3 flex items-center gap-2" y={12}>
          <Smartphone className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">
            Mobile Applications
          </h3>
        </FadeIn>

        <StaggerContainer
          fast
          className="grid grid-cols-1 items-start gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {mobileProjects.map((project) => (
            <StaggerItem key={project.id} scale className="h-full">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
