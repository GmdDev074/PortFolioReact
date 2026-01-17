import { Route, Switch, useRoute } from "wouter"
import { QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@/contexts/theme-context"
import { LanguageProvider } from "@/contexts/language-context"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { Toaster } from "@/components/ui/toaster"
import { Home } from "@/pages/home"
import { ProjectDetail } from "@/pages/project-detail"
import { Resume } from "@/pages/resume"
import { NotFound } from "@/pages/not-found"
import { queryClient } from "@/lib/queryClient"

function AppContent() {
  const [isDetailPage] = useRoute("/project/:id")
  const [isResumePage] = useRoute("/resume")

  const shouldHideNavbarFooter = isDetailPage || isResumePage

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldHideNavbarFooter && <Navbar />}
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/project/:id" component={ProjectDetail} />
          <Route path="/resume" component={Resume} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {!shouldHideNavbarFooter && <Footer />}
      <ScrollToTop />
      <Toaster />
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App

