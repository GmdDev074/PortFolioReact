import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Menu, X, Sun, Moon, Globe } from "lucide-react"
import { Constants } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/motion/magnetic"
import { useTheme } from "@/contexts/theme-context"
import { useLanguage, languages, type Language } from "@/contexts/language-context"
import { transition } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [showLangMenu, setShowLangMenu] = useState(false)
  const navLinksRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = Constants.NAV_LINKS.map((link) => link.href.slice(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      setActiveSection(currentSection ? `#${currentSection}` : "")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const container = navLinksRef.current
    if (!container) return

    const activeLink = container.querySelector<HTMLElement>(
      `[data-nav-href="${activeSection}"]`
    )

    if (!activeLink) {
      setIndicator((prev) => ({ ...prev, width: 0, ready: false }))
      return
    }

    setIndicator({
      left: activeLink.offsetLeft,
      width: activeLink.offsetWidth,
      ready: true,
    })
  }, [activeSection, language, isScrolled])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLangMenu && !(event.target as Element).closest(".language-menu-container")) {
        setShowLangMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showLangMenu])

  return (
    <motion.nav
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={transition.reveal}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,padding] duration-300",
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div
        className={cn(
          "container mx-auto px-4 sm:px-6 transition-[padding] duration-300",
          isScrolled ? "py-2.5 sm:py-3" : "py-3 sm:py-4"
        )}
      >
        <div className="flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="text-xl font-bold text-primary transition-opacity duration-200 hover:opacity-90 sm:text-2xl"
          >
            {Constants.PERSONAL.name}
          </a>

          <div className="hidden items-center gap-3 lg:flex xl:gap-4">
            <div ref={navLinksRef} className="relative flex items-center gap-3 xl:gap-4">
              {Constants.NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  data-nav-href={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className={cn(
                    "relative whitespace-nowrap py-1 text-xs font-medium transition-colors duration-200 hover:text-primary xl:text-sm",
                    activeSection === link.href ? "text-primary" : "text-foreground"
                  )}
                >
                  {t(`nav.${link.name.toLowerCase()}`) || link.name}
                </a>
              ))}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -bottom-0.5 h-0.5 rounded-full bg-primary"
                animate={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.ready ? 1 : 0,
                }}
                transition={transition.base}
              />
            </div>

            <div className="relative language-menu-container">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="hover:bg-accent"
              >
                <Globe className="h-5 w-5" />
              </Button>
              {showLangMenu && (
                <div className="absolute right-0 top-full z-50 mt-2 max-h-[450px] min-w-[200px] overflow-y-auto rounded-lg border bg-background p-1 shadow-lg [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:rounded [&::-webkit-scrollbar-thumb]:bg-muted [scrollbar-width:thin]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setShowLangMenu(false)
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded px-3 py-2 text-left transition-colors hover:bg-accent",
                        language === lang.code && "bg-accent/50 font-medium text-primary"
                      )}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="flex-1">{lang.nativeName}</span>
                      <span className="hidden text-xs text-muted-foreground sm:inline">
                        {lang.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-accent"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            <Magnetic strength={0.16}>
              <Button
                onClick={() => scrollToSection("#contact")}
                size="sm"
                className="px-3 text-xs xl:px-4 xl:text-sm"
              >
                {t("hero.secondaryButton")}
              </Button>
            </Magnetic>
          </div>

          <div className="hidden items-center gap-2 md:flex lg:hidden">
            <div className="relative language-menu-container">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="h-8 w-8 hover:bg-accent"
              >
                <Globe className="h-4 w-4" />
              </Button>
              {showLangMenu && (
                <div className="absolute right-0 top-full z-50 mt-2 max-h-[400px] min-w-[180px] overflow-y-auto rounded-lg border bg-background p-1 shadow-lg">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setShowLangMenu(false)
                      }}
                      className={cn(
                        "flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm transition-colors hover:bg-accent",
                        language === lang.code && "bg-accent/50 font-medium text-primary"
                      )}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="flex-1">{lang.nativeName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8 hover:bg-accent"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <button
              className="text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <button
            className="text-foreground md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={transition.base}
          className="overflow-hidden bg-background/95 backdrop-blur-md lg:hidden"
        >
          <div className="flex flex-col gap-4 border-t border-border/40 py-6">
            {Constants.NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className={cn(
                  "px-2 py-2 text-base font-medium transition-colors hover:text-primary",
                  activeSection === link.href
                    ? "font-semibold text-primary"
                    : "text-foreground"
                )}
              >
                {t(`nav.${link.name.toLowerCase()}`) || link.name}
              </a>
            ))}
            <div className="flex items-center gap-3 border-t border-border/40 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="h-9 w-9 p-0 hover:bg-accent"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <div className="relative flex-1">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full appearance-none rounded-lg border border-input bg-background px-3 py-2 pr-8 text-sm text-foreground transition-[border-color,box-shadow] focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.nativeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button
              onClick={() => scrollToSection("#contact")}
              className="mt-2 w-full"
              size="lg"
            >
              {t("hero.secondaryButton")}
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
