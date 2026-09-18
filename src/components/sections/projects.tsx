import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Smartphone } from "lucide-react"
import { useLocation } from "wouter"
import { mobileProjects } from "@/data/projects"
import type { ProjectListItem } from "@/types/project"
import { SectionReveal } from "@/components/motion/reveal"
import { transition, viewportOnce } from "@/lib/motion"
import { useCanHoverInteract } from "@/hooks/use-motion-prefs"
import { cn } from "@/lib/utils"

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
      className="flex h-6 w-6 items-center justify-center rounded-md glass-icon transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:border-primary/30"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={imageSrc} alt="" className="h-3.5 w-3.5 object-contain" />
    </a>
  )
}

function ProjectCard({
  project,
  dimmed,
  onHoverChange,
}: {
  project: ProjectListItem
  dimmed: boolean
  onHoverChange: (id: string | null) => void
}) {
  const [, setLocation] = useLocation()
  const prefersReduced = useReducedMotion()
  const canFocus = useCanHoverInteract()

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 12 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={transition.reveal}
      className="h-full overflow-visible"
      onHoverStart={() => canFocus && onHoverChange(project.id)}
      onHoverEnd={() => canFocus && onHoverChange(null)}
    >
      <motion.div
        animate={{ opacity: canFocus && dimmed ? 0.78 : 1 }}
        transition={transition.hover}
        className="h-full overflow-visible"
      >
        <div
          className={cn(
            "group h-full glass-card glass-card-hover rounded-xl p-3",
            "transition-transform duration-300 ease-out",
            "hover:-translate-y-1"
          )}
        >
          <div className="mb-2 flex items-center gap-2 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary/10">
              <Smartphone className="h-3 w-3 text-primary transition-transform duration-300 ease-out group-hover:scale-[1.04]" />
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

          <p className="mb-2.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground transition-transform duration-300 ease-out group-hover:-translate-y-0.5 sm:text-xs">
            {project.tagline}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLocation(project.detailPath!)}
              className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-foreground transition-[background-color,border-color] duration-300 ease-out hover:border-primary/35 hover:bg-primary/10 sm:text-xs"
            >
              Explore Project
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </button>

            {(project.playStore || project.appStore) && (
              <div className="flex shrink-0 items-center gap-1 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
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

          <div className="mt-2 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
            <span className="inline-flex rounded-full bg-primary/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-primary">
              Mobile App
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section id="projects" data-snap className="glass-section py-5 sm:py-7 md:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionReveal className="mb-5 text-center sm:mb-6">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Selected Work
          </p>
          <h2 className="mb-1.5 text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            A Slice of Projects
          </h2>
          <p className="mx-auto max-w-2xl text-xs text-muted-foreground sm:text-sm">
            We don't list everything — just a few live products that show the range. Apps on
            the Play Store, platforms in production, and everything in between.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.04} className="mb-3 flex items-center gap-2">
          <Smartphone className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">
            Mobile Applications
          </h3>
        </SectionReveal>

        <div className="grid grid-cols-1 items-start gap-2.5 overflow-visible pt-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {mobileProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              dimmed={hoveredId !== null && hoveredId !== project.id}
              onHoverChange={setHoveredId}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
