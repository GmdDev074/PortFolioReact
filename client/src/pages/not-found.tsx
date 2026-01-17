import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLocation } from "wouter"

export function NotFound() {
  const [, setLocation] = useLocation()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button size="lg" onClick={() => setLocation("/")}>
          Back to Home
        </Button>
      </motion.div>
    </div>
  )
}

