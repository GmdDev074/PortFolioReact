import { useRoute } from "wouter"
import { ThemeProvider } from "@/contexts/theme-context"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { PageTransition } from "@/components/motion/page-transition"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { CursorSpotlight } from "@/components/motion/cursor-spotlight"

function AppContent() {
  const [isDetailPage] = useRoute("/projects/:id")
  const [isResumePage] = useRoute("/resume")

  const shouldHideNavbarFooter = isDetailPage || isResumePage

  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollProgress />
      <CursorSpotlight />
      {!shouldHideNavbarFooter && <Navbar />}
      <main className="relative z-[2] flex flex-1 flex-col">
        <PageTransition />
      </main>
      {!shouldHideNavbarFooter && <Footer />}
      <ScrollToTop />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
