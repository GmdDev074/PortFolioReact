import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Resend } from "resend"
import { inquiryEmailHtml, thankYouEmailHtml } from "./lib/templates"
import { validateContactBody } from "./lib/validate"

const OWNER_NAME = "Muhammad Salman"
const DEFAULT_TO = "salmanhy123456@gmail.com"
const DEFAULT_FROM = "Portfolio <onboarding@resend.dev>"

function setCors(res: VercelResponse, origin: string | undefined) {
  const allowed = process.env.CONTACT_ALLOWED_ORIGIN?.trim()
  if (allowed && origin === allowed) {
    res.setHeader("Access-Control-Allow-Origin", allowed)
  } else if (!allowed && origin) {
    res.setHeader("Access-Control-Allow-Origin", origin)
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
}

function resendMessage(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "Could not deliver your message. Please try again."
  }
  const message = "message" in error ? String((error as { message?: string }).message || "") : ""
  if (/only send testing emails/i.test(message)) {
    return "Resend test mode can only email your Resend account address. Set CONTACT_TO_EMAIL to that email, or verify a domain and set CONTACT_FROM_EMAIL."
  }
  if (message) return message
  return "Could not deliver your message. Please try again."
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : undefined
  setCors(res, origin)

  if (req.method === "OPTIONS") {
    return res.status(204).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed." })
  }

  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey || apiKey === "re_xxxxxxxx") {
    return res.status(500).json({
      ok: false,
      error:
        "RESEND_API_KEY is missing on the server. Add it in Vercel → Settings → Environment Variables, then redeploy.",
    })
  }

  const validated = validateContactBody(req.body)
  if (!validated.ok) {
    if (validated.error === "Unable to send message.") {
      return res.status(200).json({ ok: true })
    }
    return res.status(400).json({ ok: false, error: validated.error })
  }

  const { data } = validated
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM
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
        ok: false,
        error: resendMessage(inquiry.error),
      })
    }

    const thanks = await resend.emails.send({
      from: fromEmail,
      to: [data.email],
      subject: `Thanks ${data.name} — I got your message`,
      html: thankYouEmailHtml(data, ownerName),
    })

    if (thanks.error) {
      console.error("[contact] thank-you email failed", thanks.error)
      // Inquiry already sent — still success for the form
      return res.status(200).json({
        ok: true,
        inquirySent: true,
        thanksSent: false,
        warning:
          "Your message reached the inbox, but the thank-you email was blocked. Resend’s free test sender can only email the Resend account address — verify a domain to send thank-you mail to visitors.",
      })
    }

    return res.status(200).json({
      ok: true,
      inquirySent: true,
      thanksSent: true,
    })
  } catch (err) {
    console.error("[contact] unexpected error", err)
    return res.status(500).json({
      ok: false,
      error: "Something went wrong sending your message. Please try again.",
    })
  }
}
