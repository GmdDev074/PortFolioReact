import { useEffect } from "react"
import { motion } from "framer-motion"
import { Download, ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocation } from "wouter"
import { Constants } from "@/lib/constants"

export function Resume() {
  const [, setLocation] = useLocation()
  const resumePath = "/resume/Muhammad_Salman_Resume.pdf"

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    document.title = `Resume · ${Constants.PERSONAL.name}`
    return () => {
      document.title = `${Constants.PERSONAL.name} · Android Developer`
    }
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
    <div className="min-h-screen bg-background pb-28 pt-20 sm:pt-24 lg:pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 flex flex-col items-stretch justify-between gap-3 sm:mb-6 sm:flex-row sm:items-center sm:gap-4"
        >
          <Button
            variant="ghost"
            onClick={handleBackToHome}
            className="flex w-full items-center justify-center gap-2 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <Button
            onClick={handleDownload}
            className="flex w-full items-center justify-center gap-2 sm:w-auto"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </Button>
        </motion.div>

        {/* Mobile: download-first (iframe PDFs often fail on phones) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="sm:hidden"
        >
          <div className="rounded-xl border border-border/60 bg-muted/20 px-5 py-10 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FileText className="h-6 w-6" />
            </div>
            <h1 className="mb-2 text-lg font-semibold">Resume PDF</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              Mobile browsers often can&apos;t preview PDFs inline. Download the file to
              open it in your PDF app.
            </p>
            <Button onClick={handleDownload} size="lg" className="w-full gap-2">
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
            <a
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-primary underline-offset-4 hover:underline"
            >
              Or try opening in a new tab
            </a>
          </div>
        </motion.div>

        {/* Desktop / tablet preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden w-full sm:block"
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            <iframe
              src={resumePath}
              className="h-[calc(100vh-200px)] min-h-[800px] w-full border-0"
              title="Resume"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
