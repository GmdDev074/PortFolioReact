import type { Plugin } from "vite"
import type { IncomingMessage, ServerResponse } from "node:http"
import { Resend } from "resend"
import { inquiryEmailHtml, thankYouEmailHtml } from "../api/lib/templates"
import { validateContactBody } from "../api/lib/validate"

const OWNER_NAME = "Muhammad Salman"
const DEFAULT_TO = "gmddev074@gmail.com"
const DEFAULT_FROM = "Portfolio <onboarding@resend.dev>"

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)))
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8")
        resolve(raw ? JSON.parse(raw) : {})
      } catch (err) {
        reject(err)
      }
    })
    req.on("error", reject)
  })
}

function sendJson(
  res: ServerResponse,
  status: number,
  body: Record<string, unknown>
) {
  res.statusCode = status
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(body))
}

function resendMessage(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "Could not deliver your message. Please try again."
  }
  const message =
    "message" in error ? String((error as { message?: string }).message || "") : ""
  if (/only send testing emails/i.test(message)) {
    return "Resend test mode can only email your Resend account address. Set CONTACT_TO_EMAIL to that email, or verify a domain and set CONTACT_FROM_EMAIL."
  }
  if (message) return message
  return "Could not deliver your message. Please try again."
}

/**
 * Local Vite middleware so `npm run dev` can hit POST /api/contact
 * (same behavior as the Vercel serverless function).
 */
export function contactApiDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: "contact-api-dev",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0]
        if (url !== "/api/contact") {
          next()
          return
        }

        if (req.method === "OPTIONS") {
          res.statusCode = 204
          res.end()
          return
        }

        if (req.method !== "POST") {
          sendJson(res, 405, { ok: false, error: "Method not allowed." })
          return
        }

        try {
          const apiKey = env.RESEND_API_KEY?.trim()
          if (!apiKey || apiKey === "re_xxxxxxxx") {
            sendJson(res, 500, {
              ok: false,
              error:
                "RESEND_API_KEY is missing in .env. Add your Resend key and restart the dev server.",
            })
            return
          }

          const body = await readJsonBody(req)
          const validated = validateContactBody(body)
          if (!validated.ok) {
            if (validated.error === "Unable to send message.") {
              sendJson(res, 200, { ok: true })
              return
            }
            sendJson(res, 400, { ok: false, error: validated.error })
            return
          }

          const { data } = validated
          const toEmail = env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO
          const fromEmail = env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM
          const ownerName = env.CONTACT_OWNER_NAME?.trim() || OWNER_NAME
          const resend = new Resend(apiKey)

          const inquiry = await resend.emails.send({
            from: fromEmail,
            to: [toEmail],
            replyTo: data.email,
            subject: `Portfolio inquiry: ${data.subject}`,
            html: inquiryEmailHtml(data),
          })

          if (inquiry.error) {
            sendJson(res, 502, {
              ok: false,
              error: resendMessage(inquiry.error),
            })
            return
          }

          const thanks = await resend.emails.send({
            from: fromEmail,
            to: [data.email],
            subject: `Thanks ${data.name} — I got your message`,
            html: thankYouEmailHtml(data, ownerName),
          })

          if (thanks.error) {
            sendJson(res, 200, {
              ok: true,
              inquirySent: true,
              thanksSent: false,
              warning:
                "Your message reached the inbox, but the thank-you email was blocked. Resend’s free test sender can only email the Resend account address — verify a domain to send thank-you mail to visitors.",
            })
            return
          }

          sendJson(res, 200, {
            ok: true,
            inquirySent: true,
            thanksSent: true,
          })
        } catch (err) {
          console.error("[contact-api-dev]", err)
          sendJson(res, 500, {
            ok: false,
            error: "Something went wrong sending your message. Please try again.",
          })
        }
      })
    },
  }
}
