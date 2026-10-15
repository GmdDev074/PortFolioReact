import type { Plugin } from "vite"
import type { IncomingMessage, ServerResponse } from "node:http"
import { readMailEnv, sendContactMails } from "../api/lib/mailer"
import { validateContactBody } from "../api/lib/validate"

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

/** Local Vite middleware so `npm run dev` can POST /api/contact */
export function contactApiDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: "contact-api-dev",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0] ?? ""
        if (url !== "/api/contact" && url !== "/api/contact/") {
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
          const mailEnv = readMailEnv(env)
          if ("error" in mailEnv) {
            sendJson(res, 500, { ok: false, error: mailEnv.error })
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

          const result = await sendContactMails(validated.data, mailEnv)
          sendJson(res, 200, {
            ok: true,
            inquirySent: result.inquirySent,
            thanksSent: result.thanksSent,
            ...(result.warning ? { warning: result.warning } : {}),
          })
        } catch (err) {
          console.error("[contact-api-dev]", err)
          const message = err instanceof Error ? err.message : ""
          const authHint = /invalid login|username and password|badcredentials|eauth/i.test(
            message
          )
          sendJson(res, 502, {
            ok: false,
            error: authHint
              ? "Gmail login failed. Use a Google App Password (not your normal Gmail password), and enable 2-Step Verification."
              : "Could not deliver your message. Please try again or email me directly.",
          })
        }
      })
    },
  }
}
