import { motion, useReducedMotion } from "framer-motion"
import { Route, Switch, useLocation } from "wouter"
import { EASE_OUT } from "@/lib/motion"
import { Home } from "@/pages/home"
import { ProjectDetail } from "@/pages/project-detail"
import { Resume } from "@/pages/resume"
import { NotFound } from "@/pages/not-found"

function RouteTree() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects/:id" component={ProjectDetail} />
      <Route path="/resume" component={Resume} />
      <Route component={NotFound} />
    </Switch>
  )
}

export function PageTransition() {
  const [location] = useLocation()
  const prefersReduced = useReducedMotion()
  const pathname = location.split("#")[0] || "/"

  if (prefersReduced) {
    return <RouteTree />
  }

  // Enter-only transition: snappy, no blank flash, no nested-router freeze.
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className="flex min-h-0 flex-1 flex-col"
    >
      <RouteTree />
    </motion.div>
  )
}
