import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Download, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocation } from "wouter"
import { RESUME_PDF_BASE64 } from "@/assets/resume-pdf-data"

const RESUME_PAGES = [
  "/resume/preview/page-1.png",
  "/resume/preview/page-2.png",
  "/resume/preview/page-3.png",
  "/resume/preview/page-4.png",
] as const

function base64ToPdfBlob(base64: string): Blob {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new Blob([bytes], { type: "application/pdf" })
}

export function Resume() {
  const [, setLocation] = useLocation()
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleDownload = () => {
    try {
      setDownloading(true)

      const blob = base64ToPdfBlob(RESUME_PDF_BASE64)
      const objectUrl = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = objectUrl
      link.download = "Muhammad_Salman_Resume.pdf"
      link.rel = "noopener"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Keep the blob alive long enough for Chrome/IDM to finish saving
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000)
    } catch (error) {
      console.error("Resume download failed:", error)
      window.alert("Couldn't prepare the resume download. Please try again.")
    } finally {
      setDownloading(false)
    }
  }

  const handleBackToHome = () => {
    setLocation("/")
  }

  return (
    <div className="min-h-screen bg-background pb-6 pt-6 sm:pb-8 sm:pt-8">
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
            disabled={downloading}
            className="flex w-full items-center justify-center gap-2 sm:w-auto"
          >
            {downloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {downloading ? "Preparing…" : "Download Resume"}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto flex w-full max-w-4xl flex-col gap-4"
        >
          {RESUME_PAGES.map((src, index) => (
            <div
              key={src}
              className="overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <img
                src={src}
                alt={`Resume page ${index + 1}`}
                className="h-auto w-full"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 flex justify-center sm:mt-6 sm:hidden"
        >
          <Button
            onClick={handleDownload}
            disabled={downloading}
            size="lg"
            className="w-full gap-2"
          >
            {downloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {downloading ? "Preparing…" : "Download Resume"}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
