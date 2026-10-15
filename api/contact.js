/**
 * Vercel serverless contact endpoint (CommonJS).
 * Sends inquiry + thank-you via Gmail SMTP (App Password).
 */
const nodemailer = require("nodemailer")
const emailIcons = require("./lib/email-icons.js")

const OWNER_NAME_DEFAULT = "Muhammad Salman"

const LINKS = {
  linkedin: "https://www.linkedin.com/in/muhammad-salman-5672a0203/",
  portfolio: "https://m-salman-dev.vercel.app/",
  github: "https://github.com/GmdDev074",
}

const CID = {
  mail: "icon-mail",
  link: "icon-link",
  message: "icon-message",
  reply: "icon-reply",
  external: "icon-external",
  externalBlue: "icon-external-blue",
  linkedin: "icon-linkedin",
  github: "icon-github",
}

const brand = {
  primary: "#0066FF",
  primaryDeep: "#002BB8",
  primaryMid: "#0052FF",
  primarySoft: "#EAF1FF",
  primarySoftBorder: "#C9DAFF",
  ink: "#0F172A",
  muted: "#64748B",
  card: "#FFFFFF",
  page: "#07111F",
  border: "#E2E8F0",
  labelBg: "#F1F5F9",
  softBg: "#F7F9FC",
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function cidImg(cid, size) {
  const s = size || 14
  return `<img src="cid:${cid}" width="${s}" height="${s}" alt="" style="display:block;border:0;outline:none;text-decoration:none;line-height:0;" />`
}

function pillButton(href, cid, label, filled) {
  const bg = filled ? brand.primary : brand.primarySoft
  const color = filled ? "#ffffff" : brand.primary
  const border = filled ? "none" : `1px solid ${brand.primarySoftBorder}`
  const weight = filled ? 700 : 600
  const textColor = !filled && label === "GitHub" ? brand.ink : color
  return `<a href="${href}" style="display:inline-block;background:${bg};color:${textColor};text-decoration:none;border-radius:999px;border:${border};">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr>
<td style="padding:11px 6px 11px 15px;vertical-align:middle;line-height:0;">${cidImg(cid, 14)}</td>
<td style="padding:11px 15px 11px 2px;vertical-align:middle;font-size:13px;font-weight:${weight};color:${textColor};line-height:1;white-space:nowrap;">${escapeHtml(label)}</td>
</tr></table></a>`
}

function iconChip(cid) {
  return `<span style="display:inline-block;width:28px;height:28px;line-height:28px;text-align:center;border-radius:8px;background:${brand.primarySoft};vertical-align:middle;">${cidImg(cid, 14)}</span>`
}

function sectionTitle(cid, label) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 12px;"><tr>
<td style="vertical-align:middle;padding:0 10px 0 0;">${iconChip(cid)}</td>
<td style="vertical-align:middle;"><span style="font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${brand.primary};">${escapeHtml(label)}</span></td>
</tr></table>`
}

function detailRow(label, valueHtml, isLast) {
  const border = isLast ? "none" : `1px solid ${brand.border}`
  return `<tr>
<td style="padding:13px 16px;border-bottom:${border};width:108px;vertical-align:middle;background:${brand.labelBg};">
<span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${brand.muted};">${escapeHtml(label)}</span>
</td>
<td style="padding:13px 16px;border-bottom:${border};vertical-align:middle;color:${brand.ink};font-size:14px;line-height:1.45;background:${brand.card};">${valueHtml}</td>
</tr>`
}

function detailsTable(rowsHtml) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.border};border-radius:12px;overflow:hidden;border-collapse:collapse;margin:0 0 26px;">${rowsHtml}</table>`
}

function externalLink(url) {
  const safe = escapeHtml(url)
  return `<a href="${safe}" style="color:${brand.primary};text-decoration:none;font-weight:600;word-break:break-all;">${safe}</a>`
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
  return `${sectionTitle(CID.link, "Their links")}${detailsTable(rows)}`
}

function shell({ preheader, eyebrow, title, subtitle, bodyHtml, footerInnerHtml }) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="color-scheme" content="light"/></head>
<body style="margin:0;padding:0;background:${brand.page};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.page};padding:40px 12px;"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${brand.card};border-radius:16px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.45);">
<tr><td style="background-color:${brand.primaryMid};background-image:linear-gradient(165deg,${brand.primaryDeep} 0%,${brand.primaryMid} 45%,${brand.primary} 100%);padding:34px 32px 30px;">
<p style="margin:0 0 10px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.82);font-weight:700;">${escapeHtml(eyebrow)}</p>
<h1 style="margin:0;font-size:28px;line-height:1.2;color:#ffffff;font-weight:700;letter-spacing:-0.02em;">${escapeHtml(title)}</h1>
<p style="margin:12px 0 0;font-size:14px;line-height:1.5;color:rgba(255,255,255,0.92);">${escapeHtml(subtitle)}</p>
</td></tr>
<tr><td style="padding:30px 32px 10px;color:${brand.ink};font-size:15px;line-height:1.65;background:${brand.card};">${bodyHtml}</td></tr>
<tr><td style="padding:12px 32px 28px;background:${brand.card};">${footerInnerHtml}</td></tr>
</table>
</td></tr></table></body></html>`
}

function inquiryHtml(data) {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const subject = escapeHtml(data.subject)
  const message = escapeHtml(data.message).replace(/\n/g, "<br/>")
  const replyHref = `mailto:${data.email}?subject=${encodeURIComponent(`Re: ${data.subject}`)}`

  return shell({
    preheader: `New inquiry from ${data.name}: ${data.subject}`,
    eyebrow: "— Portfolio contact",
    title: "New portfolio inquiry",
    subtitle: "Android Developer • Kotlin • Compose • React Native",
    bodyHtml: `${sectionTitle(CID.mail, "New lead")}
<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${brand.ink};">A visitor contacted you through the portfolio. Review their details and reply when ready.</p>
${detailsTable(
  detailRow("Name", `<strong style="color:${brand.ink};font-weight:700;">${name}</strong>`) +
    detailRow(
      "Email",
      `<a href="mailto:${email}" style="color:${brand.primary};text-decoration:none;font-weight:600;">${email}</a>`
    ) +
    detailRow("Subject", `<span style="color:${brand.ink};">${subject}</span>`, true)
)}
${senderLinksSection(data)}
${sectionTitle(CID.message, "The message")}
<div style="padding:18px;border-radius:12px;background:${brand.primarySoft};border:1px solid ${brand.primarySoftBorder};color:${brand.ink};font-size:14px;line-height:1.7;">${message}</div>`,
    footerInnerHtml: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 0;"><tr>
<td align="center" bgcolor="${brand.primary}" style="border-radius:12px;background-color:${brand.primary};">
<a href="${replyHref}" style="display:block;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:12px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr><td align="center" style="padding:15px 20px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 auto;"><tr><td style="vertical-align:middle;padding:0 8px 0 0;line-height:0;">${cidImg(CID.reply, 16)}</td><td style="vertical-align:middle;font-size:15px;font-weight:700;color:#ffffff;line-height:1;white-space:nowrap;">Reply to ${name}</td></tr></table></td></tr></table></a>
</td></tr></table>
<p style="margin:18px 0 0;font-size:12px;line-height:1.55;color:${brand.muted};">Sent from <a href="${LINKS.portfolio}" style="color:${brand.primary};text-decoration:none;font-weight:600;">m-salman-dev.vercel.app</a>. Reply directly to continue the conversation.</p>`,
  })
}

function thanksHtml(data, ownerName) {
  const name = escapeHtml(data.name)
  const owner = escapeHtml(ownerName)
  const subject = escapeHtml(data.subject)
  const initials =
    String(ownerName)
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => (p[0] ? p[0].toUpperCase() : ""))
      .join("") || "MS"

  return shell({
    preheader: `Thanks ${data.name} — I got your message and will reply soon.`,
    eyebrow: "↺ Auto-reply",
    title: "Thanks for getting in touch",
    subtitle: "Your message is in my inbox — I’ll get back to you soon",
    bodyHtml: `<p style="margin:0 0 12px;font-size:17px;font-weight:700;color:${brand.ink};">Hi ${name},</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:${brand.ink};">Thanks for reaching out about <strong style="font-weight:700;">${subject}</strong>. I’ve received your message and usually reply within a day.</p>
<p style="margin:0 0 18px;font-size:14px;color:${brand.muted};">Meanwhile, explore my work or connect on these channels:</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;"><tr>
<td style="padding:0 8px 8px 0;vertical-align:middle;">${pillButton(LINKS.portfolio, CID.external, "View Portfolio", true)}</td>
<td style="padding:0 8px 8px 0;vertical-align:middle;">${pillButton(LINKS.linkedin, CID.linkedin, "LinkedIn", false)}</td>
<td style="padding:0 0 8px 0;vertical-align:middle;">${pillButton(LINKS.github, CID.github, "GitHub", false)}</td>
</tr></table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.primarySoftBorder};border-radius:14px;background:${brand.softBg};"><tr>
<td style="padding:18px 12px 18px 18px;width:56px;vertical-align:middle;"><div style="width:48px;height:48px;line-height:48px;border-radius:999px;background:${brand.primary};color:#ffffff;font-size:15px;font-weight:700;text-align:center;">${escapeHtml(initials)}</div></td>
<td style="padding:18px 18px 18px 4px;vertical-align:middle;">
<p style="margin:0;color:${brand.ink};font-weight:700;font-size:15px;">${owner}</p>
<p style="margin:3px 0 0;color:${brand.muted};font-size:13px;">Android Developer</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:8px 0 0;"><tr>
<td style="vertical-align:middle;padding:0 4px 0 0;font-size:13px;font-weight:600;line-height:1;"><a href="${LINKS.portfolio}" style="color:${brand.primary};text-decoration:none;font-weight:600;">m-salman-dev.vercel.app</a></td>
<td style="vertical-align:middle;line-height:0;"><a href="${LINKS.portfolio}" style="text-decoration:none;line-height:0;">${cidImg(CID.externalBlue, 12)}</a></td>
</tr></table>
</td></tr></table>`,
    footerInnerHtml: `<div style="height:1px;background:${brand.border};margin:22px 0 16px;"></div>
<p style="margin:0;font-size:12px;line-height:1.55;color:${brand.muted};">You received this because you submitted the contact form on Muhammad Salman’s portfolio.</p>`,
  })
}

function attachIcons(keys) {
  const map = {
    mail: emailIcons.mail,
    link: emailIcons.link,
    message: emailIcons.message,
    reply: emailIcons.reply,
    external: emailIcons.external,
    externalBlue: emailIcons["external-blue"],
    linkedin: emailIcons.linkedin,
    github: emailIcons.github,
  }
  return keys.map((key) => ({
    filename: `${key}.png`,
    content: map[key],
    cid: CID[key],
    contentDisposition: "inline",
  }))
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

    if (req.method === "OPTIONS") return res.status(204).end()
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
    if (validated.honeypot) return json(res, 200, { ok: true })
    if (validated.error) {
      return json(res, 400, { ok: false, error: validated.error })
    }

    const data = validated.data
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: gmailUser, pass: gmailPass },
    })

    const from = `"${ownerName}" <${gmailUser}>`

    await transporter.sendMail({
      from,
      to: contactTo,
      replyTo: data.email,
      subject: `Portfolio inquiry: ${data.subject}`,
      html: inquiryHtml(data),
      attachments: attachIcons(["mail", "link", "message", "reply"]),
    })

    let thanksSent = true
    let warning
    try {
      await transporter.sendMail({
        from,
        to: data.email,
        subject: `Thanks ${data.name} — I got your message`,
        html: thanksHtml(data, ownerName),
        attachments: attachIcons([
          "external",
          "externalBlue",
          "linkedin",
          "github",
        ]),
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

module.exports.config = { maxDuration: 30 }
