import { useState, useEffect, useRef, type MouseEvent as ReactMouseEvent, type ReactNode } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion"
import { Sun, Moon, ArrowRight } from "lucide-react"
import { Constants } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/motion/magnetic"
import { useTheme } from "@/contexts/theme-context"
import { useCanHoverInteract, useMotionEnabled } from "@/hooks/use-motion-prefs"
import { transition } from "@/lib/motion"
import { cn } from "@/lib/utils"

function GlassIconButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void
  label: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "group inline-flex h-9 w-9 items-center justify-center rounded-full",
        "border border-white/10 bg-white/[0.04] text-foreground",
        "transition-[transform,background-color,border-color] duration-200 ease-out",
        "hover:-translate-y-0.5 hover:scale-[1.03] hover:border-primary/30 hover:bg-white/[0.08]",
        "dark:border-white/10 dark:bg-white/[0.05]"
      )}
    >
      <span className="transition-transform duration-200 group-hover:-translate-y-px">
        {children}
      </span>
    </button>
  )
}

/** Circular orbital highlight traveling around the pill perimeter */
function OrbitalStroke({
  subtle = false,
  gradientId,
}: {
  subtle?: boolean
  gradientId: string
}) {
  return (
    <div className="glass-nav-border-orbit" aria-hidden>
      <svg className="glass-nav-orbit-svg" viewBox="0 0 100 40" preserveAspectRatio="none">
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(210 100% 98% / 1)" />
            <stop offset="45%" stopColor="hsl(210 100% 90% / 0.85)" />
            <stop offset="100%" stopColor="hsl(221 83% 65% / 0)" />
          </radialGradient>
        </defs>
        {/* Circular bead orbiting the stadium path — no extra static track (avoids nested pill look) */}
        <rect
          className={cn("glass-nav-orbit-path", subtle && "opacity-55")}
          x="0.75"
          y="0.75"
          width="98.5"
          height="38.5"
          rx="19.25"
          ry="19.25"
          pathLength={100}
          vectorEffect="non-scaling-stroke"
          style={{ stroke: `url(#${gradientId})` }}
        />
      </svg>
    </div>
  )
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const { theme, toggleTheme } = useTheme()
  const canGlassInteract = useCanHoverInteract()
  const motionEnabled = useMotionEnabled()

  const glassRef = useRef<HTMLDivElement>(null)
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const springX = useSpring(pointerX, { stiffness: 70, damping: 24, mass: 0.35 })
  const springY = useSpring(pointerY, { stiffness: 70, damping: 24, mass: 0.35 })

  const reflection = useMotionTemplate`radial-gradient(220px circle at calc(${springX} * 100%) calc(${springY} * 100%), hsl(210 100% 95% / 0.16), hsl(221 83% 70% / 0.06) 35%, transparent 68%)`
  const borderHighlight = useMotionTemplate`radial-gradient(130px circle at calc(${springX} * 100%) calc(${springY} * 100%), hsl(210 100% 92% / 0.5), hsl(221 83% 65% / 0.14) 40%, transparent 72%)`

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = Constants.NAV_LINKS.map((link) => link.href.slice(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 120 && rect.bottom >= 120
        }
        return false
      })
      setActiveSection(currentSection ? `#${currentSection}` : "")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleGlassMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!canGlassInteract || !glassRef.current) return
    const rect = glassRef.current.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width)
    pointerY.set((event.clientY - rect.top) / rect.height)
  }

  const handleGlassLeave = () => {
    pointerX.set(0.5)
    pointerY.set(0.5)
  }

  const pillHref = hoveredLink ?? activeSection

  const renderNavLinks = (opts?: { compact?: boolean; bottom?: boolean }) => (
    <div
      className={cn(
        "relative z-10 flex items-center",
        opts?.bottom
          ? "w-full justify-between gap-1 px-1"
          : "gap-1 rounded-full border border-white/5 bg-black/[0.08] p-1 dark:bg-black/25"
      )}
    >
      {Constants.NAV_LINKS.map((link) => {
        const isActive = activeSection === link.href
        const isHot = pillHref === link.href
        return (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection(link.href)
            }}
            onMouseEnter={() => !opts?.bottom && setHoveredLink(link.href)}
            onMouseLeave={() => !opts?.bottom && setHoveredLink(null)}
            className={cn(
              "relative z-10 rounded-full font-medium transition-colors duration-200",
              opts?.bottom
                ? "flex-1 px-2 py-2.5 text-center text-[11px] sm:text-xs"
                : "px-3 py-1.5 text-xs xl:px-3.5 xl:text-sm",
              isActive || hoveredLink === link.href
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isHot && (
              <motion.span
                layoutId={opts?.bottom ? "nav-bottom-pill" : "nav-glass-pill"}
                className={cn(
                  "absolute inset-0 -z-10 rounded-full",
                  "bg-white/10 shadow-[0_0_0_1px_hsl(221_83%_70%/0.18),0_0_18px_-6px_hsl(221_83%_60%/0.4)] dark:bg-white/[0.08]"
                )}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">
              {link.name}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_8px_hsl(221_83%_53%/0.75)]" />
              )}
            </span>
          </a>
        )
      })}
    </div>
  )

  return (
    <>
      <motion.nav
        initial={motionEnabled ? { y: -12, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={transition.reveal}
        className="fixed left-0 right-0 top-0 z-50"
      >
        {/* Desktop glass pill */}
        <div
          className={cn(
            "container mx-auto hidden px-4 sm:px-6 lg:block",
            isScrolled ? "pt-2.5" : "pt-3.5"
          )}
        >
          <div
            ref={glassRef}
            onMouseMove={handleGlassMove}
            onMouseLeave={handleGlassLeave}
            className="glass-nav-shell relative mx-auto flex max-w-5xl items-center justify-between gap-3 overflow-hidden rounded-full px-3 py-2 xl:gap-4 xl:px-4"
          >
            {canGlassInteract && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
                style={{ background: reflection }}
              />
            )}

            {motionEnabled && <OrbitalStroke gradientId="glass-orbit-desktop" />}

            {canGlassInteract && (
              <motion.div
                aria-hidden
                className="glass-nav-border-pointer"
                style={{ background: borderHighlight }}
              />
            )}

            <Magnetic strength={0.22} maxOffset={7} className="relative z-10 shrink-0">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className={cn(
                  "group inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-semibold tracking-tight xl:text-base",
                  "border border-white/10 bg-white/[0.06] dark:bg-white/[0.07]",
                  "transition-[transform,color,background-color,border-color,box-shadow] duration-200 ease-out",
                  "hover:border-transparent hover:bg-primary hover:text-primary-foreground",
                  "hover:shadow-[0_0_24px_-8px_hsl(221_83%_53%/0.85)]",
                  "active:scale-[0.98]"
                )}
              >
                <span className="transition-colors duration-200 group-hover:text-primary-foreground">
                  {Constants.PERSONAL.name.split(" ")[0]}
                </span>
                <span className="text-primary/80 transition-colors duration-200 group-hover:text-primary-foreground">
                  {Constants.PERSONAL.name.split(" ").slice(1).join(" ")}
                </span>
              </a>
            </Magnetic>

            {renderNavLinks()}

            <div className="relative z-10 flex items-center gap-2">
              <div className="mx-0.5 hidden h-5 w-px bg-border/60 xl:block" />
              <GlassIconButton label="Toggle theme" onClick={toggleTheme}>
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </GlassIconButton>

              <Magnetic strength={0.22} maxOffset={7} className="ml-1">
                <Button
                  onClick={() => scrollToSection("#contact")}
                  size="sm"
                  className="group gap-1.5 px-3.5 text-xs shadow-[0_0_24px_-8px_hsl(221_83%_53%/0.8)] xl:text-sm"
                >
                  {Constants.HERO.secondaryButton}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Mobile / tablet top: brand + utilities only (no drawer) */}
        <div
          className={cn(
            "lg:hidden transition-[background-color,backdrop-filter,box-shadow] duration-300",
            isScrolled
              ? "bg-background/90 shadow-sm backdrop-blur-md"
              : "bg-transparent"
          )}
        >
          <div
            className={cn(
              "container mx-auto flex items-center justify-between px-4 sm:px-6",
              isScrolled ? "py-2.5" : "py-3"
            )}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className={cn(
                "group inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06]",
                "px-3 py-1.5 text-sm font-semibold tracking-tight dark:bg-white/[0.07]",
                "transition-colors duration-200 active:scale-[0.98]",
                "hover:border-primary/40 hover:bg-primary hover:text-primary-foreground"
              )}
            >
              <span className="transition-colors group-hover:text-primary-foreground">
                {Constants.PERSONAL.name.split(" ")[0]}
              </span>
              <span className="text-primary/80 transition-colors group-hover:text-primary-foreground/90">
                {Constants.PERSONAL.name.split(" ").slice(1).join(" ")}
              </span>
            </a>

            <div className="flex items-center gap-2">
              <GlassIconButton label="Toggle theme" onClick={toggleTheme}>
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </GlassIconButton>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile / tablet bottom nav — no drawer */}
      <nav
        aria-label="Mobile sections"
        className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 lg:hidden"
      >
        <div className="glass-bottom-nav relative mx-auto max-w-md overflow-hidden rounded-full px-2 py-1">
          {motionEnabled && <OrbitalStroke subtle gradientId="glass-orbit-mobile" />}
          {renderNavLinks({ bottom: true })}
        </div>
      </nav>
    </>
  )
}
