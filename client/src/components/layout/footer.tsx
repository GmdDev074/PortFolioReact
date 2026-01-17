import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Play } from "lucide-react"
import { Constants } from "@/lib/constants"
import { useLanguage } from "@/contexts/language-context"

const iconMap = {
  Github,
  Linkedin,
  Twitter,
  Play,
}

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-slate-900 text-slate-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">{Constants.PERSONAL.name}</h3>
            <p className="text-slate-400">{t("footer.description")}</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="flex flex-col gap-2">
              {Constants.FOOTER.links.map((link) => {
                const linkKey = link.name.toLowerCase()
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-primary transition-colors"
                    >
                      {t(`footer.links.${linkKey}`)}
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">{t("footer.connect")}</h4>
            <div className="flex gap-4">
              {Constants.FOOTER.social.map((social) => {
                const Icon = iconMap[social.icon as keyof typeof iconMap]
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-slate-800 hover:bg-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {Icon && <Icon size={20} />}
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="border-t border-slate-800 pt-8 text-center text-slate-400"
        >
          <p>&copy; {new Date().getFullYear()} {Constants.PERSONAL.name}. {t("footer.allRightsReserved")}</p>
        </motion.div>
      </div>
    </footer>
  )
}

