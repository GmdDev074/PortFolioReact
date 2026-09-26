import { motion } from "framer-motion"
import { Github, Linkedin } from "lucide-react"
import { Constants } from "@/lib/constants"
import { FadeIn } from "@/components/motion/reveal"
import { transition } from "@/lib/motion"

const iconMap = {
  Github,
  Linkedin,
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 py-12 text-slate-50 sm:py-16 lg:pb-16 pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_20%_0%,hsl(221_83%_53%/0.12),transparent_55%)]"
      />
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mb-6 grid grid-cols-1 gap-6 sm:mb-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          <FadeIn>
            <h3 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">
              {Constants.PERSONAL.name}
            </h3>
            <p className="text-sm text-slate-400 sm:text-base">
              {Constants.FOOTER.description}
            </p>
          </FadeIn>

          <FadeIn>
            <h4 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">
              {Constants.FOOTER.quickLinks}
            </h4>
            <ul className="flex flex-col gap-2">
              {Constants.FOOTER.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors duration-200 hover:text-primary sm:text-base"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn>
            <h4 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">
              {Constants.FOOTER.connect}
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
                    className="glass-icon inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-50 transition-colors duration-200 hover:border-primary/40 hover:bg-primary"
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
            {Constants.FOOTER.allRightsReserved}
          </p>
        </FadeIn>
      </div>
    </footer>
  )
}
