import type { ContactPayload } from "./templates"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string }

export function validateContactBody(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Invalid request body." }
  }

  const body = raw as Record<string, unknown>

  // Honeypot — bots fill hidden fields; humans leave empty
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return { ok: false, error: "Unable to send message." }
  }

  const name = typeof body.name === "string" ? body.name.trim() : ""
  const email = typeof body.email === "string" ? body.email.trim() : ""
  const subject = typeof body.subject === "string" ? body.subject.trim() : ""
  const message = typeof body.message === "string" ? body.message.trim() : ""

  if (name.length < 2 || name.length > 80) {
    return { ok: false, error: "Please enter your name (2–80 characters)." }
  }
  if (!EMAIL_RE.test(email) || email.length > 120) {
    return { ok: false, error: "Please enter a valid email address." }
  }
  if (subject.length < 3 || subject.length > 120) {
    return { ok: false, error: "Please enter a subject (3–120 characters)." }
  }
  if (message.length < 10 || message.length > 4000) {
    return { ok: false, error: "Please enter a message (10–4000 characters)." }
  }

  return {
    ok: true,
    data: { name, email, subject, message },
  }
}
