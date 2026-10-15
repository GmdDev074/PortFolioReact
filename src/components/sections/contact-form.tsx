import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import { CheckCircle2, Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FormState = {
  name: string
  email: string
  subject: string
  message: string
  /** Honeypot — must stay empty */
  website: string
}

const initial: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
}

type Status = "idle" | "submitting" | "success" | "error"

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial)
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [warning, setWarning] = useState<string | null>(null)
  const [thanksSent, setThanksSent] = useState(true)

  const update =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }))
      if (status === "error") {
        setStatus("idle")
        setError(null)
      }
    }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === "submitting") return

    setStatus("submitting")
    setError(null)
    setWarning(null)
    setThanksSent(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const contentType = res.headers.get("content-type") || ""
      const raw = await res.text()

      // Vite without the contact middleware returns HTML instead of JSON
      if (!contentType.includes("application/json")) {
        throw new Error(
          "Contact API is not reachable. Restart `npm run dev`, or test on your deployed Vercel URL after redeploying."
        )
      }

      const payload = JSON.parse(raw || "{}") as {
        ok?: boolean
        error?: string
        warning?: string
        thanksSent?: boolean
        inquirySent?: boolean
      }

      if (!res.ok || !payload.ok) {
        throw new Error(
          payload.error || "Could not send your message. Please try again."
        )
      }

      setThanksSent(payload.thanksSent !== false)
      setWarning(payload.warning ?? null)
      setStatus("success")
      setForm(initial)
    } catch (err) {
      setStatus("error")
      setError(
        err instanceof Error
          ? err.message
          : "Could not send your message. Please try again."
      )
    }
  }

  if (status === "success") {
    return (
      <div className="glass-card rounded-2xl p-6 text-center sm:p-8">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mb-1.5 text-lg font-semibold text-foreground">Message sent</h3>
        <p className="mx-auto mb-3 max-w-md text-sm text-muted-foreground">
          {thanksSent
            ? "Thanks — your message was delivered, and a confirmation email was sent to you. I usually reply within a day."
            : "Thanks — your message was delivered to my inbox. A confirmation email to you could not be sent yet (Resend test-mode limit)."}
        </p>
        {warning && (
          <p className="mx-auto mb-5 max-w-md rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-left text-xs text-foreground/90 sm:text-sm">
            {warning}
          </p>
        )}
        {!warning && <div className="mb-5" />}
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setStatus("idle")
            setError(null)
            setWarning(null)
            setThanksSent(true)
          }}
        >
          Send another message
        </Button>
      </div>
    )
  }

  const fieldClass = cn(
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-foreground",
    "placeholder:text-muted-foreground/70 outline-none transition-[border-color,box-shadow,background-color] duration-200",
    "focus:border-primary/45 focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/20",
    "dark:border-white/10"
  )

  const labelClass = "mb-1.5 block text-xs font-semibold tracking-wide text-foreground"

  return (
    <form
      onSubmit={onSubmit}
      className="relative glass-card rounded-2xl p-4 sm:p-6"
      noValidate
    >
      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0" aria-hidden>
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={update("website")}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={update("name")}
            className={fieldClass}
            disabled={status === "submitting"}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={120}
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={update("email")}
            className={fieldClass}
            disabled={status === "submitting"}
          />
        </div>
      </div>

      <div className="mt-3 sm:mt-4">
        <label htmlFor="contact-subject" className={labelClass}>
          Subject *
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          maxLength={120}
          placeholder="Project idea, collaboration, question…"
          value={form.subject}
          onChange={update("subject")}
          className={fieldClass}
          disabled={status === "submitting"}
        />
      </div>

      <div className="mt-3 sm:mt-4">
        <label htmlFor="contact-message" className={labelClass}>
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          placeholder="Tell me a bit about what you need…"
          value={form.message}
          onChange={update("message")}
          className={cn(fieldClass, "resize-y min-h-[120px]")}
          disabled={status === "submitting"}
        />
      </div>

      {error && (
        <p className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive sm:text-sm" role="alert">
          {error}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-muted-foreground sm:text-xs">
          You’ll get a short confirmation email after sending.
        </p>
        <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send message
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
