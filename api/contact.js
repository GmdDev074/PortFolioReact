/**
 * Vercel serverless contact endpoint (CommonJS — reliable with package.json "type": "module").
 * Sends inquiry + thank-you via Gmail SMTP (App Password).
 */
const nodemailer = require("nodemailer")

const OWNER_NAME_DEFAULT = "Muhammad Salman"

const LINKS = {
  linkedin: "https://www.linkedin.com/in/muhammad-salman-5672a0203/",
  portfolio: "https://m-salman-dev.vercel.app/",
  github: "https://github.com/GmdDev074",
}

const brand = {
  primary: "#0052FF",
  primaryDark: "#003FCC",
  primarySoft: "#EEF3FF",
  ink: "#0F172A",
  muted: "#64748B",
  card: "#FFFFFF",
  page: "#0B1220",
  border: "#E2E8F0",
  softBg: "#F8FAFC",
  labelBg: "#F1F5F9",
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function iconBadge(symbol) {
  return `<span style="display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;border-radius:7px;background:${brand.primarySoft};color:${brand.primary};font-size:12px;font-weight:700;vertical-align:middle;margin-right:8px;">${symbol}</span>`
}

function sectionTitle(symbol, label) {
  return `<p style="margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${brand.primary};">${iconBadge(symbol)}${escapeHtml(label)}</p>`
}

function linkButton(href, label, opts = {}) {
  const { filled = false, fullWidth = false, icon } = opts
  const iconHtml = icon
    ? `<span style="margin-right:8px;font-size:14px;line-height:1;">${icon}</span>`
    : ""
  const display = fullWidth ? "block" : "inline-block"
  const width = fullWidth
    ? "width:100%;box-sizing:border-box;text-align:center;"
    : ""
  const margin = fullWidth ? "margin:0;" : "margin:0 8px 10px 0;"
  if (filled) {
    return `<a href="${href}" style="display:${display};${width}${margin}background:${brand.primary};color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 20px;border-radius:12px;">${iconHtml}${escapeHtml(label)}</a>`
  }
  return `<a href="${href}" style="display:${display};${width}${margin}background:${brand.primarySoft};color:${brand.primary};text-decoration:none;font-weight:600;font-size:13px;padding:12px 16px;border-radius:999px;border:1px solid #C7D7FF;">${iconHtml}${escapeHtml(label)}</a>`
}

function shell({
  preheader,
  eyebrow,
  title,
  subtitle,
  bodyHtml,
  footerNote,
  footerHtml,
}) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/></head>
<body style="margin:0;padding:0;background:${brand.page};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.page};padding:36px 14px;"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${brand.card};border-radius:18px;overflow:hidden;border:1px solid ${brand.border};box-shadow:0 20px 50px rgba(0,0,0,0.35);">
<tr><td style="background:${brand.primary};padding:32px 32px 28px;">
<p style="margin:0 0 10px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.8);font-weight:700;">${escapeHtml(eyebrow)}</p>
<h1 style="margin:0;font-size:26px;line-height:1.25;color:#ffffff;font-weight:700;">${escapeHtml(title)}</h1>
<p style="margin:12px 0 0;font-size:14px;line-height:1.5;color:rgba(255,255,255,0.92);">${escapeHtml(subtitle || "Android Developer · Kotlin · Compose · React Native")}</p>
</td></tr>
<tr><td style="padding:30px 32px 8px;color:${brand.ink};font-size:15px;line-height:1.65;">${bodyHtml}</td></tr>
<tr><td style="padding:18px 32px 28px;">
${footerHtml || ""}
<div style="height:1px;background:${brand.border};margin:0 0 16px;"></div>
<p style="margin:0;font-size:12px;line-height:1.55;color:${brand.muted};">${footerNote}</p>
</td></tr>
</table>
<p style="margin:16px 0 0;font-size:11px;color:#64748b;">© ${new Date().getFullYear()} Muhammad Salman · m-salman-dev.vercel.app</p>
</td></tr></table></body></html>`
}

function detailRow(label, valueHtml, isLast) {
  const border = isLast ? "none" : `1px solid ${brand.border}`
  return `<tr>
<td style="padding:12px 14px;border-bottom:${border};width:110px;vertical-align:top;background:${brand.labelBg};">
<span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${brand.muted};">${escapeHtml(label)}</span>
</td>
<td style="padding:12px 14px;border-bottom:${border};vertical-align:top;color:${brand.ink};font-size:14px;background:${brand.card};">${valueHtml}</td>
</tr>`
}

function detailsTable(rows) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.border};border-radius:12px;overflow:hidden;border-collapse:collapse;margin:0 0 22px;">${rows}</table>`
}

function externalLink(url, label) {
  const safe = escapeHtml(url)
  return `<a href="${safe}" style="color:${brand.primary};text-decoration:none;font-weight:600;word-break:break-all;">${escapeHtml(label || url)}</a>`
}

function senderLinksSection(data) {
  const items = []
  if (data.productUrl) items.push(["Product", data.productUrl])
  if (data.linkedin) items.push(["LinkedIn", data.linkedin])
  if (data.github) items.push(["GitHub", data.github])
  if (!items.length) return ""
  const rows = items
    .map(([label, url], i) =>
      detailRow(label, externalLink(url), i === items.length - 1)
    )
    .join("")
  return `${sectionTitle("↗", "Their links")}${detailsTable(rows)}`
}

function inquiryHtml(data) {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const subject = escapeHtml(data.subject)
  const message = escapeHtml(data.message).replace(/\n/g, "<br/>")
  const replyHref = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(`Re: ${data.subject}`)}`

  return shell({
    preheader: `New inquiry from ${data.name}: ${data.subject}`,
    eyebrow: "— Portfolio contact",
    title: "New portfolio inquiry",
    bodyHtml: `${sectionTitle("✉", "New lead")}
<p style="margin:0 0 16px;font-size:15px;color:${brand.ink};">A visitor contacted you through the portfolio. Review their details and reply when ready.</p>
${detailsTable(
  detailRow("Name", `<strong style="color:${brand.ink};">${name}</strong>`) +
    detailRow(
      "Email",
      `<a href="mailto:${email}" style="color:${brand.primary};text-decoration:none;font-weight:600;">${email}</a>`
    ) +
    detailRow("Subject", subject, true)
)}
${senderLinksSection(data)}
${sectionTitle("💬", "The message")}
<div style="padding:16px 18px;border-radius:12px;background:${brand.primarySoft};border:1px solid #C7D7FF;color:${brand.ink};font-size:14px;line-height:1.7;margin:0 0 8px;">${message}</div>`,
    footerHtml: `<div style="margin:0 0 22px;">${linkButton(replyHref, `Reply to ${data.name}`, { filled: true, fullWidth: true, icon: "↩" })}</div>`,
    footerNote: `Sent from <a href="${LINKS.portfolio}" style="color:${brand.primary};text-decoration:none;font-weight:600;">m-salman-dev.vercel.app</a>. Reply directly to continue the conversation.`,
  })
}

function thanksHtml(data, ownerName) {
  const name = escapeHtml(data.name)
  const owner = escapeHtml(ownerName)
  const subject = escapeHtml(data.subject)
  const initials = String(ownerName)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => (p[0] ? p[0].toUpperCase() : ""))
    .join("")

  return shell({
    preheader: `Thanks ${data.name} — I got your message and will reply soon.`,
    eyebrow: "↺ Auto-reply",
    title: "Thanks for getting in touch",
    subtitle: "Your message is in my inbox — I’ll get back to you soon",
    bodyHtml: `<p style="margin:0 0 12px;font-size:17px;color:${brand.ink};">Hi ${name},</p>
<p style="margin:0 0 14px;color:${brand.ink};">Thanks for reaching out about <strong>${subject}</strong>. I’ve received your message and usually reply within a day.</p>
<p style="margin:0 0 18px;color:${brand.muted};">Meanwhile, explore my work or connect on these channels:</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;"><tr>
<td style="padding:0 8px 8px 0;">${linkButton(LINKS.portfolio, "View Portfolio", { filled: true, icon: "↗" })}</td>
<td style="padding:0 8px 8px 0;">${linkButton(LINKS.linkedin, "LinkedIn")}</td>
<td style="padding:0 0 8px 0;">${linkButton(LINKS.github, "GitHub")}</td>
</tr></table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #C7D7FF;border-radius:14px;background:${brand.softBg};overflow:hidden;">
<tr><td style="padding:18px 20px;" align="center">
<div style="width:52px;height:52px;line-height:52px;border-radius:999px;background:${brand.primary};color:#ffffff;font-size:16px;font-weight:700;margin:0 auto 12px;text-align:center;">${escapeHtml(initials || "MS")}</div>
<p style="margin:0;color:${brand.ink};font-weight:700;font-size:15px;">${owner}</p>
<p style="margin:4px 0 0;color:${brand.muted};font-size:13px;">Android Developer</p>
<p style="margin:10px 0 0;font-size:13px;"><a href="${LINKS.portfolio}" style="color:${brand.primary};text-decoration:none;font-weight:600;">m-salman-dev.vercel.app ↗</a></p>
</td></tr></table>`,
    footerNote:
      "You received this because you submitted the contact form on Muhammad Salman’s portfolio.",
  })
}

function json(res, status, body) {
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  return res.status(status).json(body)
}

function readBody(req) {
  let body = req.body
  if (typeof body === "string") {
    try {
      body = JSON.parse(body || "{}")
    } catch {
      return null
    }
  }
  if (!body || typeof body !== "object") return null
  return body
}

function normalizeOptionalUrl(raw, label) {
  if (typeof raw !== "string") return undefined
  const trimmed = raw.trim()
  if (!trimmed) return undefined
  if (trimmed.length > 300) return { error: `${label} URL is too long.` }
  let url = trimmed
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`
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

function validate(body) {
  // Honeypot — must stay empty (not a real product/website field)
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return { honeypot: true }
  }
  const name = typeof body.name === "string" ? body.name.trim() : ""
  const email = typeof body.email === "string" ? body.email.trim() : ""
  const subject = typeof body.subject === "string" ? body.subject.trim() : ""
  const message = typeof body.message === "string" ? body.message.trim() : ""
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (name.length < 2 || name.length > 80) {
    return { error: "Please enter your name (2–80 characters)." }
  }
  if (!emailOk || email.length > 120) {
    return { error: "Please enter a valid email address." }
  }
  if (subject.length < 3 || subject.length > 120) {
    return { error: "Please enter a subject (3–120 characters)." }
  }
  if (message.length < 10 || message.length > 4000) {
    return { error: "Please enter a message (10–4000 characters)." }
  }

  const productUrl = normalizeOptionalUrl(body.productUrl, "Product")
  if (productUrl && productUrl.error) return { error: productUrl.error }
  const linkedin = normalizeOptionalUrl(body.linkedin, "LinkedIn")
  if (linkedin && linkedin.error) return { error: linkedin.error }
  const github = normalizeOptionalUrl(body.github, "GitHub")
  if (github && github.error) return { error: github.error }

  return {
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

module.exports = async function handler(req, res) {
  try {
    const origin = typeof req.headers.origin === "string" ? req.headers.origin : undefined
    const allowed = process.env.CONTACT_ALLOWED_ORIGIN?.trim()
    if (allowed && origin === allowed) {
      res.setHeader("Access-Control-Allow-Origin", allowed)
    } else if (!allowed && origin) {
      res.setHeader("Access-Control-Allow-Origin", origin)
    }
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    if (req.method === "OPTIONS") {
      return res.status(204).end()
    }
    if (req.method !== "POST") {
      return json(res, 405, { ok: false, error: "Method not allowed." })
    }

    const gmailUser = process.env.GMAIL_USER?.trim()
    const gmailPass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "")
    const contactTo = process.env.CONTACT_TO_EMAIL?.trim() || gmailUser
    const ownerName = process.env.CONTACT_OWNER_NAME?.trim() || OWNER_NAME_DEFAULT

    if (!gmailUser || !gmailPass) {
      return json(res, 500, {
        ok: false,
        error:
          "GMAIL_USER or GMAIL_APP_PASSWORD missing on the server. Add them in Vercel env and redeploy.",
      })
    }

    const body = readBody(req)
    if (!body) {
      return json(res, 400, { ok: false, error: "Invalid request body." })
    }

    const validated = validate(body)
    if (validated.honeypot) {
      return json(res, 200, { ok: true })
    }
    if (validated.error) {
      return json(res, 400, { ok: false, error: validated.error })
    }

    const data = validated.data
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    })

    const from = `"${ownerName}" <${gmailUser}>`

    await transporter.sendMail({
      from,
      to: contactTo,
      replyTo: data.email,
      subject: `Portfolio inquiry: ${data.subject}`,
      html: inquiryHtml(data),
    })

    let thanksSent = true
    let warning
    try {
      await transporter.sendMail({
        from,
        to: data.email,
        subject: `Thanks ${data.name} — I got your message`,
        html: thanksHtml(data, ownerName),
      })
    } catch (thanksErr) {
      console.error("[contact] thank-you failed", thanksErr)
      thanksSent = false
      warning =
        "Your message reached the inbox, but the thank-you email could not be delivered."
    }

    return json(res, 200, {
      ok: true,
      inquirySent: true,
      thanksSent,
      ...(warning ? { warning } : {}),
    })
  } catch (err) {
    console.error("[contact] fatal", err)
    const message = err && err.message ? String(err.message) : "Unknown error"
    const authFail =
      /invalid login|username and password|badcredentials|eauth|authentication/i.test(
        message
      )
    return json(res, 500, {
      ok: false,
      error: authFail
        ? "Gmail login failed. App Password must belong to GMAIL_USER, with 2-Step Verification enabled."
        : `Could not send email: ${message}`,
    })
  }
}

module.exports.config = {
  maxDuration: 30,
}
