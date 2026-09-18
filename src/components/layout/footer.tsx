import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Play } from "lucide-react"
import { Constants } from "@/lib/constants"
import { FadeIn } from "@/components/motion/reveal"
import { useLanguage } from "@/contexts/language-context"
import { transition } from "@/lib/motion"

const iconMap = {
  Github,
  Linkedin,
  Twitter,
  Play,
}

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-slate-900 py-12 text-slate-50 sm:py-16 lg:pb-16 pb-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-6 grid grid-cols-1 gap-6 sm:mb-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          <FadeIn>
            <h3 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">
              {Constants.PERSONAL.name}
            </h3>
            <p className="text-sm text-slate-400 sm:text-base">{t("footer.description")}</p>
          </FadeIn>

          <FadeIn>
            <h4 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">
              {t("footer.quickLinks")}
            </h4>
            <ul className="flex flex-col gap-2">
              {Constants.FOOTER.links.map((link) => {
                const linkKey = link.name.toLowerCase()
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors duration-200 hover:text-primary sm:text-base"
                    >
                      {t(`footer.links.${linkKey}`)}
                    </a>
                  </li>
                )
              })}
            </ul>
          </FadeIn>

          <FadeIn>
            <h4 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">
              {t("footer.connect")}
            </h4>
            <div className="flex items-center gap-3 sm:gap-4">
              {Constants.FOOTER.social.map((social) => {
                const Icon = iconMap[social.icon as keyof typeof iconMap]
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-50 transition-colors duration-200 hover:bg-primary"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    transition={transition.fast}
                    aria-label={social.name}
                  >
                    {Icon && <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />}
                  </motion.a>
                )
              })}
            </div>
          </FadeIn>
        </div>

        <FadeIn className="border-t border-slate-800 pt-6 text-center text-slate-400 sm:pt-8">
          <p className="text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} {Constants.PERSONAL.name}.{" "}
            {t("footer.allRightsReserved")}
          </p>
        </FadeIn>
      </div>
    </footer>
  )
}
