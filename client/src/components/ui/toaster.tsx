import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
}

let toastState: Toast[] = []
let listeners: ((toasts: Toast[]) => void)[] = []

const subscribe = (listener: (toasts: Toast[]) => void) => {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

const notify = (toasts: Toast[]) => {
  toastState = toasts
  listeners.forEach((listener) => listener(toasts))
}

export const toast = {
  success: (message: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    notify([...toastState, { id, message, type: "success" }])
    setTimeout(() => {
      notify(toastState.filter((t) => t.id !== id))
    }, 3000)
  },
  error: (message: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    notify([...toastState, { id, message, type: "error" }])
    setTimeout(() => {
      notify(toastState.filter((t) => t.id !== id))
    }, 3000)
  },
  info: (message: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    notify([...toastState, { id, message, type: "info" }])
    setTimeout(() => {
      notify(toastState.filter((t) => t.id !== id))
    }, 3000)
  },
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    return subscribe(setToasts)
  }, [])

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`
              pointer-events-auto rounded-lg px-4 py-3 shadow-lg
              ${
                toast.type === "success"
                  ? "bg-green-500 text-white"
                  : toast.type === "error"
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
              }
            `}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

