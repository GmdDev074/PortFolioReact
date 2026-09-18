import { useEffect } from "react"
import { Hero } from "@/components/sections/hero"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Process } from "@/components/sections/process"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"

export function Home() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const timeout = window.setTimeout(() => {
      const element = document.querySelector(hash) as HTMLElement | null
      if (!element) return
      const navbar = document.querySelector("nav")
      const navbarHeight = navbar ? navbar.offsetHeight : 80
      const elementPosition = element.offsetTop - navbarHeight
      window.scrollTo({
        top: Math.max(0, elementPosition),
        behavior: "smooth",
      })
    }, 120)

    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <Process />
      <About />
      <Contact />
    </>
  )
}
