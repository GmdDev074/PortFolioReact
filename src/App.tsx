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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <CursorSpotlight />
      {!shouldHideNavbarFooter && <Navbar />}
      <main id="main-content" className="relative z-[2] flex flex-1 flex-col">
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
