import type { ContactPayload } from "./templates"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string }

function normalizeOptionalUrl(raw: unknown, label: string): string | undefined | { error: string } {
  if (typeof raw !== "string") return undefined
  const trimmed = raw.trim()
  if (!trimmed) return undefined
  if (trimmed.length > 300) {
    return { error: `${label} URL is too long.` }
  }

  let url = trimmed
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`
  }

  try {
    const parsed = new URL(url)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { error: `Please enter a valid ${label} URL.` }
    }
    return parsed.toString()
  } catch {
    return { error: `Please enter a valid ${label} URL.` }
  }
}

export function validateContactBody(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Invalid request body." }
  }

  const body = raw as Record<string, unknown>

  // Honeypot (must stay empty) — do not reuse for real "website/product" fields
  if (typeof body.company === "string" && body.company.trim() !== "") {
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

  const productUrl = normalizeOptionalUrl(body.productUrl, "Product")
  if (productUrl && typeof productUrl === "object" && "error" in productUrl) {
    return { ok: false, error: productUrl.error }
  }
  const linkedin = normalizeOptionalUrl(body.linkedin, "LinkedIn")
  if (linkedin && typeof linkedin === "object" && "error" in linkedin) {
    return { ok: false, error: linkedin.error }
  }
  const github = normalizeOptionalUrl(body.github, "GitHub")
  if (github && typeof github === "object" && "error" in github) {
    return { ok: false, error: github.error }
  }

  return {
    ok: true,
    data: {
      name,
      email,
      subject,
      message,
      ...(typeof productUrl === "string" ? { productUrl } : {}),
      ...(typeof linkedin === "string" ? { linkedin } : {}),
      ...(typeof github === "string" ? { github } : {}),
    },
  }
}
