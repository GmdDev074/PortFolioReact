import { useEffect } from "react"
import { motion } from "framer-motion"
import { Download, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocation } from "wouter"
import { useLanguage } from "@/contexts/language-context"

export function Resume() {
  const [, setLocation] = useLocation()
  const { t } = useLanguage()
  const resumePath = "/resume/Muhammad_Salman_Resume.pdf"

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = resumePath
    link.download = "Muhammad_Salman_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleBackToHome = () => {
    setLocation("/")
  }

  return (
    <div className="min-h-screen bg-background pt-8 pb-8">
      <div className="container mx-auto px-4">
        {/* Header with back button and download button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between mb-6"
        >
          <Button
            variant="ghost"
            onClick={handleBackToHome}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("resume.backToHome")}
          </Button>
          <Button
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {t("resume.download")}
          </Button>
        </motion.div>

        {/* PDF Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src={resumePath}
              className="w-full h-[calc(100vh-200px)] min-h-[800px] border-0"
              title="Resume"
            />
          </div>
        </motion.div>

        {/* Download button at bottom for mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 flex justify-center md:hidden"
        >
          <Button
            onClick={handleDownload}
            size="lg"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {t("resume.download")}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

