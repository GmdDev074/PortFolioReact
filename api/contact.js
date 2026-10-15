/**
 * Vercel serverless contact endpoint (CommonJS — reliable with package.json "type": "module").
 * Sends inquiry + thank-you via Gmail SMTP (App Password).
 */
const nodemailer = require("nodemailer")

const OWNER_NAME_DEFAULT = "Muhammad Salman"

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function shell({ preheader, title, bodyHtml, footerNote }) {
  const primary = "#2563eb"
  const page = "#0b1220"
  const card = "#ffffff"
  const border = "#e2e8f0"
  const muted = "#64748b"
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/></head>
<body style="margin:0;padding:0;background:${page};font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${page};padding:32px 16px;"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${card};border-radius:16px;overflow:hidden;border:1px solid ${border};">
<tr><td style="background:linear-gradient(135deg,${primary} 0%,#1d4ed8 100%);padding:28px;">
<p style="margin:0 0 6px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.85);font-weight:600;">Muhammad Salman</p>
<h1 style="margin:0;font-size:22px;color:#fff;font-weight:700;">${escapeHtml(title)}</h1>
</td></tr>
<tr><td style="padding:28px;color:#0f172a;font-size:15px;line-height:1.6;">${bodyHtml}</td></tr>
<tr><td style="padding:0 28px 28px;"><p style="margin:0;font-size:12px;color:${muted};">${escapeHtml(footerNote)}</p></td></tr>
</table></td></tr></table></body></html>`
}

function inquiryHtml(data) {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const subject = escapeHtml(data.subject)
  const message = escapeHtml(data.message).replace(/\n/g, "<br/>")
  return shell({
    preheader: `${data.name}: ${data.subject}`,
    title: "New portfolio inquiry",
    bodyHtml: `<p style="margin:0 0 18px;">New message from your portfolio contact form.</p>
<p><strong>Name:</strong> ${name}<br/><strong>Email:</strong> <a href="mailto:${email}">${email}</a><br/><strong>Subject:</strong> ${subject}</p>
<p style="margin:16px 0 0;">${message}</p>`,
    footerNote: "Sent from your portfolio contact form.",
  })
}

function thanksHtml(data, ownerName) {
  return shell({
    preheader: `Thanks ${data.name} — I got your message.`,
    title: "Thanks for getting in touch",
    bodyHtml: `<p>Hi ${escapeHtml(data.name)},</p>
<p>Thanks for reaching out about <strong>${escapeHtml(data.subject)}</strong>. I usually reply within a day.</p>
<p style="color:#64748b;">— ${escapeHtml(ownerName)}<br/>Android Developer</p>`,
    footerNote: "You received this because you used the portfolio contact form.",
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
