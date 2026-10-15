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
  primary: "#2563eb",
  primaryDark: "#1d4ed8",
  primarySoft: "#eff6ff",
  ink: "#0f172a",
  muted: "#64748b",
  card: "#ffffff",
  page: "#0b1220",
  border: "#e2e8f0",
  softBg: "#f8fafc",
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function linkButton(href, label, filled) {
  if (filled) {
    return `<a href="${href}" style="display:inline-block;background:${brand.primary};color:#ffffff;text-decoration:none;font-weight:600;font-size:13px;padding:12px 18px;border-radius:999px;margin:0 6px 8px 0;">${label}</a>`
  }
  return `<a href="${href}" style="display:inline-block;background:${brand.primarySoft};color:${brand.primary};text-decoration:none;font-weight:600;font-size:13px;padding:12px 18px;border-radius:999px;border:1px solid #bfdbfe;margin:0 6px 8px 0;">${label}</a>`
}

function shell({ preheader, eyebrow, title, bodyHtml, footerNote }) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/></head>
<body style="margin:0;padding:0;background:${brand.page};font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.page};padding:40px 16px;"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:${brand.card};border-radius:20px;overflow:hidden;border:1px solid ${brand.border};box-shadow:0 20px 50px rgba(0,0,0,0.35);">
<tr><td style="background:linear-gradient(135deg,${brand.primary} 0%,${brand.primaryDark} 55%,#1e3a8a 100%);padding:32px 32px 28px;">
<p style="margin:0 0 10px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.8);font-weight:700;">${escapeHtml(eyebrow)}</p>
<h1 style="margin:0;font-size:26px;line-height:1.25;color:#ffffff;font-weight:700;">${escapeHtml(title)}</h1>
<p style="margin:12px 0 0;font-size:14px;color:rgba(255,255,255,0.88);">Android Developer · Kotlin · Jetpack Compose · React Native</p>
</td></tr>
<tr><td style="padding:32px;color:${brand.ink};font-size:15px;line-height:1.65;">${bodyHtml}</td></tr>
<tr><td style="padding:0 32px 28px;">
<div style="height:1px;background:${brand.border};margin:0 0 18px;"></div>
<p style="margin:0;font-size:12px;line-height:1.55;color:${brand.muted};">${escapeHtml(footerNote)}</p>
</td></tr>
</table>
<p style="margin:18px 0 0;font-size:11px;color:#94a3b8;">© ${new Date().getFullYear()} Muhammad Salman</p>
</td></tr></table></body></html>`
}

function detailRow(label, valueHtml) {
  return `<tr>
<td style="padding:12px 14px;border-bottom:1px solid ${brand.border};width:110px;vertical-align:top;">
<span style="font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${brand.muted};">${label}</span>
</td>
<td style="padding:12px 14px;border-bottom:1px solid ${brand.border};vertical-align:top;color:${brand.ink};font-size:14px;">${valueHtml}</td>
</tr>`
}

function inquiryHtml(data) {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const subject = escapeHtml(data.subject)
  const message = escapeHtml(data.message).replace(/\n/g, "<br/>")
  return shell({
    preheader: `New inquiry from ${data.name}: ${data.subject}`,
    eyebrow: "Portfolio contact",
    title: "New portfolio inquiry",
    bodyHtml: `<p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${brand.primary};">New lead</p>
<p style="margin:0 0 20px;font-size:16px;">Someone reached out through your portfolio. Details below.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.border};border-radius:14px;overflow:hidden;background:${brand.softBg};border-collapse:collapse;">
${detailRow("Name", `<strong>${name}</strong>`)}
${detailRow("Email", `<a href="mailto:${email}" style="color:${brand.primary};text-decoration:none;font-weight:600;">${email}</a>`)}
${detailRow("Subject", subject)}
</table>
<p style="margin:22px 0 8px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${brand.muted};">Message</p>
<div style="padding:16px 18px;border-radius:14px;background:${brand.primarySoft};border:1px solid #bfdbfe;color:${brand.ink};font-size:14px;line-height:1.65;">${message}</div>
<p style="margin:26px 0 0;">${linkButton(`mailto:${email}?subject=${encodeURIComponent(`Re: ${data.subject}`)}`, `Reply to ${name}`, true)}</p>`,
    footerNote: "Sent from m-salman-dev.vercel.app. Reply directly to continue the conversation.",
  })
}

function thanksHtml(data, ownerName) {
  return shell({
    preheader: `Thanks ${data.name} — I got your message and will reply soon.`,
    eyebrow: "Muhammad Salman",
    title: "Thanks for getting in touch",
    bodyHtml: `<p style="margin:0 0 14px;font-size:16px;">Hi ${escapeHtml(data.name)},</p>
<p style="margin:0 0 14px;">Thanks for reaching out about <strong>${escapeHtml(data.subject)}</strong>. I’ve received your message and usually reply within a day.</p>
<p style="margin:0 0 22px;color:${brand.muted};">While you wait, feel free to explore my work and connect:</p>
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td>
${linkButton(LINKS.portfolio, "View Portfolio", true)}
${linkButton(LINKS.linkedin, "LinkedIn", false)}
${linkButton(LINKS.github, "GitHub", false)}
</td></tr></table>
<div style="margin:24px 0 0;padding:16px 18px;border-radius:14px;background:${brand.softBg};border:1px solid ${brand.border};">
<p style="margin:0;color:${brand.ink};font-weight:700;">${escapeHtml(ownerName)}</p>
<p style="margin:4px 0 0;color:${brand.muted};font-size:13px;">Android Developer</p>
<p style="margin:10px 0 0;font-size:12px;"><a href="${LINKS.portfolio}" style="color:${brand.primary};text-decoration:none;">m-salman-dev.vercel.app</a></p>
</div>`,
    footerNote: "You received this because you submitted the contact form on Muhammad Salman’s portfolio.",
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

function validate(body) {
  if (typeof body.website === "string" && body.website.trim() !== "") {
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
  return { data: { name, email, subject, message } }
}

module.exports = async function handler(req, res) {
  // Always prefer JSON responses (avoids SPA HTML error pages confusing the form)
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
    const contactTo =
      process.env.CONTACT_TO_EMAIL?.trim() || gmailUser
    const ownerName =
      process.env.CONTACT_OWNER_NAME?.trim() || OWNER_NAME_DEFAULT

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
    const authFail = /invalid login|username and password|badcredentials|eauth|authentication/i.test(
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
