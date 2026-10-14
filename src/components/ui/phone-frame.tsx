import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PhoneFrameProps {
  children: ReactNode
  className?: string
  /** Slightly larger bezel / radius for hero showcase */
  size?: "sm" | "md" | "lg"
}

/**
 * Minimal device chrome for app screenshots — not a glass card.
 */
export function PhoneFrame({
  children,
  className,
  size = "md",
}: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-zinc-950 shadow-[0_28px_60px_-28px_rgba(15,23,42,0.65)]",
        "ring-1 ring-white/15",
        size === "sm" && "rounded-[1.35rem] p-[5px]",
        size === "md" && "rounded-[1.65rem] p-[6px]",
        size === "lg" && "rounded-[2rem] p-[7px] sm:rounded-[2.15rem] sm:p-[8px]",
        className
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-zinc-950",
          size === "sm" && "top-[7px] h-1 w-10",
          size === "md" && "top-[8px] h-1.5 w-12",
          size === "lg" && "top-[10px] h-1.5 w-14 sm:top-[11px] sm:w-16"
        )}
      />
      <div
        className={cn(
          "relative overflow-hidden bg-black",
          size === "sm" && "rounded-[1.1rem]",
          size === "md" && "rounded-[1.35rem]",
          size === "lg" && "rounded-[1.55rem] sm:rounded-[1.75rem]"
        )}
      >
        {children}
      </div>
    </div>
  )
}
