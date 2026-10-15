import type { VercelRequest, VercelResponse } from "@vercel/node"
import { readMailEnv, sendContactMails } from "./lib/mailer"
import { validateContactBody } from "./lib/validate"

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : undefined
  setCors(res, origin)

  if (req.method === "OPTIONS") {
    return res.status(204).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed." })
  }

  const mailEnv = readMailEnv(process.env)
  if ("error" in mailEnv) {
    return res.status(500).json({ ok: false, error: mailEnv.error })
  }

  const validated = validateContactBody(req.body)
  if (!validated.ok) {
    if (validated.error === "Unable to send message.") {
      return res.status(200).json({ ok: true })
    }
    return res.status(400).json({ ok: false, error: validated.error })
  }

  try {
    const result = await sendContactMails(validated.data, mailEnv)
    return res.status(200).json({
      ok: true,
      inquirySent: result.inquirySent,
      thanksSent: result.thanksSent,
      ...(result.warning ? { warning: result.warning } : {}),
    })
  } catch (err) {
    console.error("[contact] send failed", err)
    const message = err instanceof Error ? err.message : ""
    const authHint = /invalid login|username and password|badcredentials|eauth/i.test(
      message
    )
    return res.status(502).json({
      ok: false,
      error: authHint
        ? "Gmail login failed. Use a Google App Password (not your normal Gmail password), and enable 2-Step Verification."
        : "Could not deliver your message. Please try again or email me directly.",
    })
  }
}
