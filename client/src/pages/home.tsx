import { useEffect } from "react"
import { Hero } from "@/components/sections/hero"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"

export function Home() {
  useEffect(() => {
    // Handle hash navigation on mount
    const hash = window.location.hash
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.querySelector(hash) as HTMLElement
        if (element) {
          // Get navbar height dynamically
          const navbar = document.querySelector("nav")
          const navbarHeight = navbar ? navbar.offsetHeight : 80
          const elementPosition = element.offsetTop - navbarHeight
          window.scrollTo({
            top: Math.max(0, elementPosition),
            behavior: "smooth"
          })
        }
      }, 100)
    }
  }, [])

  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Contact />
    </>
  )
}

