import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { contactApiDevPlugin } from "./vite-plugins/contact-api-dev"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load all env keys (including RESEND_*) for the local contact API middleware
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react(), contactApiDevPlugin(env)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
