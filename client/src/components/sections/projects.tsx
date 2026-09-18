import { motion } from "framer-motion"
import { ArrowUpRight, Smartphone } from "lucide-react"
import { useLocation } from "wouter"
import { mobileProjects } from "@/data/projects"
import type { ProjectListItem } from "@/types/project"

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
      className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-background transition-colors hover:bg-muted"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={imageSrc} alt="" className="h-3.5 w-3.5 object-contain" />
    </a>
  )
}

function ProjectCard({ project, index }: { project: ProjectListItem; index: number }) {
  const [, setLocation] = useLocation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.28, delay: index * 0.04 }}
      whileHover={{ y: -2 }}
      className="group rounded-xl border border-border bg-card p-3 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md"
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10">
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

      <p className="mb-2.5 text-[11px] leading-snug text-muted-foreground line-clamp-2 sm:text-xs">
        {project.tagline}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setLocation(project.detailPath!)}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground transition-colors hover:bg-muted sm:text-xs"
        >
          Explore Project
          <ArrowUpRight className="h-3 w-3" />
        </button>

        {(project.playStore || project.appStore) && (
          <div className="flex shrink-0 items-center gap-1">
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

      <div className="mt-2">
        <span className="inline-flex rounded-full bg-primary/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-primary">
          Mobile App
        </span>
      </div>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="bg-muted/40 py-5 sm:py-7 md:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mb-5 text-center sm:mb-6"
        >
          <p className="mb-1.5 text-xs font-semibold tracking-widest text-primary uppercase">
            Selected Work
          </p>
          <h2 className="mb-1.5 text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            A Slice of Projects
          </h2>
          <p className="mx-auto max-w-2xl text-xs text-muted-foreground sm:text-sm">
            We don't list everything — just a few live products that show the
            range. Apps on the Play Store, platforms in production, and
            everything in between.
          </p>
        </motion.div>

        <div className="mb-3 flex items-center gap-2">
          <Smartphone className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-semibold tracking-wide text-foreground uppercase">
            Mobile Applications
          </h3>
        </div>

        <div className="grid grid-cols-1 items-start gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {mobileProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
