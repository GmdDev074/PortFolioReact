import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, Sun, Moon, Globe } from "lucide-react"
import { Constants } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"
import { useLanguage, languages, type Language } from "@/contexts/language-context"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [showLangMenu, setShowLangMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Detect active section
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

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  // Close language menu when clicking outside
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="text-2xl font-bold text-primary"
            whileHover={{ scale: 1.05 }}
          >
            {Constants.PERSONAL.name}
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {Constants.NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === link.href
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {t(`nav.${link.name.toLowerCase()}`) || link.name}
              </a>
            ))}
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
                <div className="absolute right-0 top-full mt-2 bg-background border rounded-lg shadow-lg p-1 min-w-[200px] max-h-[450px] overflow-y-auto z-50 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:rounded [&::-webkit-scrollbar-thumb]:bg-muted [scrollbar-width:thin]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setShowLangMenu(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded hover:bg-accent transition-colors flex items-center gap-3 ${
                        language === lang.code ? "text-primary font-medium bg-accent/50" : ""
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="flex-1">{lang.nativeName}</span>
                      <span className="text-xs text-muted-foreground hidden sm:inline">{lang.name}</span>
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
            <Button onClick={() => scrollToSection("#contact")}>
              {Constants.HERO.secondaryButton}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="flex flex-col gap-4 py-4">
            {Constants.NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === link.href
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {t(`nav.${link.name.toLowerCase()}`) || link.name}
              </a>
            ))}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="hover:bg-accent"
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="px-3 py-2 rounded-lg border border-input bg-background text-sm appearance-none pr-8"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.nativeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button onClick={() => scrollToSection("#contact")}>
              {Constants.HERO.secondaryButton}
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

