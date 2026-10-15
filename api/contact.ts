import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Resend } from "resend"
import { inquiryEmailHtml, thankYouEmailHtml } from "./_lib/templates"
import { validateContactBody } from "./_lib/validate"

const OWNER_NAME = "Muhammad Salman"
const DEFAULT_TO = "salmanhy123456@gmail.com"

function setCors(res: VercelResponse, origin: string | undefined) {
  const allowed = process.env.CONTACT_ALLOWED_ORIGIN?.trim()
  if (allowed && origin === allowed) {
    res.setHeader("Access-Control-Allow-Origin", allowed)
  } else if (!allowed && origin) {
    // Dev-friendly when origin not locked down yet
    res.setHeader("Access-Control-Allow-Origin", origin)
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : undefined
  setCors(res, origin)

  if (req.method === "OPTIONS") {
    return res.status(204).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." })
  }

  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    return res.status(500).json({
      error: "Email service is not configured yet. Please try again later.",
    })
  }

  const validated = validateContactBody(req.body)
  if (!validated.ok) {
    // Honeypot trips look like success to bots
    if (validated.error === "Unable to send message.") {
      return res.status(200).json({ ok: true })
    }
    return res.status(400).json({ error: validated.error })
  }

  const { data } = validated
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() || "Portfolio <onboarding@resend.dev>"
  const ownerName = process.env.CONTACT_OWNER_NAME?.trim() || OWNER_NAME

  const resend = new Resend(apiKey)

  try {
    const inquiry = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: data.email,
      subject: `Portfolio inquiry: ${data.subject}`,
      html: inquiryEmailHtml(data),
    })

    if (inquiry.error) {
      console.error("[contact] inquiry email failed", inquiry.error)
      return res.status(502).json({
        error: "Could not deliver your message. Please try again or email me directly.",
      })
    }

    const thanks = await resend.emails.send({
      from: fromEmail,
      to: [data.email],
      subject: `Thanks ${data.name} — I got your message`,
      html: thankYouEmailHtml(data, ownerName),
    })

    if (thanks.error) {
      // Inquiry already delivered — don't fail the whole request
      console.error("[contact] thank-you email failed", thanks.error)
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error("[contact] unexpected error", err)
    return res.status(500).json({
      error: "Something went wrong sending your message. Please try again.",
    })
  }
}
