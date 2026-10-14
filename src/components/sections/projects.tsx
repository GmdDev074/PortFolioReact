import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Smartphone, Sparkles } from "lucide-react"
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
      <img src={imageSrc} alt="" className="h-3 w-3 object-contain" />
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
  const featured = Boolean(project.featured)

  const openDetail = () => {
    if (project.detailPath) setLocation(project.detailPath)
  }

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 12 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={transition.reveal}
      className={cn("h-full overflow-visible", featured && "relative z-[1]")}
      onHoverStart={() => canFocus && onHoverChange(project.id)}
      onHoverEnd={() => canFocus && onHoverChange(null)}
    >
      <motion.div
        animate={{
          opacity: canFocus && dimmed ? 0.58 : 1,
          scale: featured && !(canFocus && dimmed) ? 1 : undefined,
        }}
        transition={transition.hover}
        className="h-full"
      >
        <article
          className={cn(
            "group relative flex h-full gap-3 overflow-hidden rounded-xl p-3 glass-card glass-card-hover",
            "transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5",
            featured && "project-card-featured gap-3.5 p-3.5 sm:gap-4 sm:p-4"
          )}
        >
          {/* Real screenshot — no device chrome */}
          <button
            type="button"
            onClick={openDetail}
            className={cn(
              "relative shrink-0 self-center overflow-hidden rounded-lg ring-1 ring-black/10 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 dark:ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              featured ? "w-[62px] sm:w-[72px]" : "w-[52px] sm:w-[58px]"
            )}
            aria-label={`Open ${project.name} case study`}
          >
            {project.coverImage ? (
              <img
                src={project.coverImage}
                alt={`${project.name} screenshot`}
                className="aspect-[9/19] w-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="flex aspect-[9/19] items-center justify-center bg-muted">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </button>

          {/* Copy + actions */}
          <div className="flex min-w-0 flex-1 flex-col py-0.5">
            <div className="mb-1 flex items-center gap-1.5">
              <h3 className="min-w-0 truncate text-sm font-semibold text-foreground">
                {project.name}
              </h3>
              {featured && (
                <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-primary px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-primary-foreground shadow-[0_0_12px_-2px_hsl(221_83%_53%/0.55)]">
                  <Sparkles className="h-2 w-2" />
                  Featured
                </span>
              )}
            </div>

            <p className="mb-2 line-clamp-3 text-[11px] leading-relaxed text-muted-foreground sm:line-clamp-4 sm:text-xs">
              {project.description ?? project.tagline}
            </p>

            {project.tech && project.tech.length > 0 && (
              <div className="mb-2.5 flex flex-wrap gap-1">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[8px] font-medium text-primary sm:text-[9px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto flex items-center gap-1.5 pt-0.5">
              <button
                type="button"
                onClick={openDetail}
                className={cn(
                  "inline-flex items-center gap-0.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors duration-200",
                  featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-white/10 bg-white/[0.04] text-foreground hover:border-primary/35 hover:bg-primary/10"
                )}
              >
                Explore
                <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {(project.playStore || project.appStore) && (
                <div className="ml-auto flex items-center gap-1">
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
          </div>
        </article>
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
            I don&apos;t list everything — just a curated set of live products that show the
            range. Apps on the Play Store, platforms in production, and everything in between.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.04} className="mb-3 flex items-center gap-2">
          <Smartphone className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">
            Mobile Applications
          </h3>
        </SectionReveal>

        <div className="grid grid-cols-1 items-stretch gap-3 overflow-visible sm:grid-cols-2 lg:grid-cols-3">
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
