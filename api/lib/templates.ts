import { escapeHtml } from "./escape"

export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
  productUrl?: string
  linkedin?: string
  github?: string
}

export const PORTFOLIO_LINKS = {
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
  page: "#070b14",
  border: "#e2e8f0",
  softBg: "#f8fafc",
}

function linkButton(href: string, label: string, filled = false): string {
  if (filled) {
    return `<a href="${href}" style="display:inline-block;background:${brand.primary};color:#ffffff;text-decoration:none;font-weight:600;font-size:13px;padding:12px 18px;border-radius:999px;margin:0 6px 8px 0;">${label}</a>`
  }
  return `<a href="${href}" style="display:inline-block;background:${brand.primarySoft};color:${brand.primary};text-decoration:none;font-weight:600;font-size:13px;padding:12px 18px;border-radius:999px;border:1px solid #bfdbfe;margin:0 6px 8px 0;">${label}</a>`
}

function shell(opts: {
  preheader: string
  eyebrow: string
  title: string
  subtitle?: string
  bodyHtml: string
  footerNote: string
}): string {
  const { preheader, eyebrow, title, subtitle, bodyHtml, footerNote } = opts
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${brand.page};font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${escapeHtml(preheader)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.page};padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${brand.card};border-radius:22px;overflow:hidden;border:1px solid ${brand.border};box-shadow:0 24px 60px rgba(0,0,0,0.4);">
          <tr>
            <td style="background:linear-gradient(145deg,${brand.primary} 0%,${brand.primaryDark} 48%,#172554 100%);padding:34px 34px 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.78);font-weight:700;">
                      ${escapeHtml(eyebrow)}
                    </p>
                    <h1 style="margin:0;font-size:28px;line-height:1.2;color:#ffffff;font-weight:700;">
                      ${escapeHtml(title)}
                    </h1>
                    ${
                      subtitle
                        ? `<p style="margin:12px 0 0;font-size:14px;line-height:1.5;color:rgba(255,255,255,0.9);">${escapeHtml(subtitle)}</p>`
                        : `<p style="margin:12px 0 0;font-size:14px;color:rgba(255,255,255,0.88);">Android Developer · Kotlin · Compose · React Native</p>`
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:34px;color:${brand.ink};font-size:15px;line-height:1.65;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0 34px 30px;">
              <div style="height:1px;background:${brand.border};margin:0 0 18px;"></div>
              <p style="margin:0;font-size:12px;line-height:1.55;color:${brand.muted};">
                ${escapeHtml(footerNote)}
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:18px 0 0;font-size:11px;color:#64748b;">
          © ${new Date().getFullYear()} Muhammad Salman · m-salman-dev.vercel.app
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function detailRow(label: string, valueHtml: string): string {
  return `
    <tr>
      <td style="padding:13px 16px;border-bottom:1px solid ${brand.border};width:118px;vertical-align:top;background:${brand.softBg};">
        <span style="font-size:11px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:${brand.muted};">${label}</span>
      </td>
      <td style="padding:13px 16px;border-bottom:1px solid ${brand.border};vertical-align:top;color:${brand.ink};font-size:14px;">
        ${valueHtml}
      </td>
    </tr>`
}

function externalLink(url: string, label: string): string {
  const safe = escapeHtml(url)
  return `<a href="${safe}" style="color:${brand.primary};text-decoration:none;font-weight:600;word-break:break-all;">${escapeHtml(label)}</a>`
}

function senderLinksSection(data: ContactPayload): string {
  const rows: string[] = []
  if (data.productUrl) {
    rows.push(detailRow("Product", externalLink(data.productUrl, data.productUrl)))
  }
  if (data.linkedin) {
    rows.push(detailRow("LinkedIn", externalLink(data.linkedin, data.linkedin)))
  }
  if (data.github) {
    rows.push(detailRow("GitHub", externalLink(data.github, data.github)))
  }
  if (rows.length === 0) return ""

  return `
    <p style="margin:26px 0 10px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${brand.muted};">
      Their links
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.border};border-radius:14px;overflow:hidden;border-collapse:collapse;">
      ${rows.join("")}
    </table>`
}

/** Email sent to you when someone submits the contact form. */
export function inquiryEmailHtml(data: ContactPayload): string {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const subject = escapeHtml(data.subject)
  const message = escapeHtml(data.message).replace(/\n/g, "<br />")

  const bodyHtml = `
    <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${brand.primary};">
      New lead
    </p>
    <p style="margin:0 0 22px;font-size:16px;color:${brand.ink};">
      A visitor contacted you through the portfolio. Review their details and reply when ready.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.border};border-radius:14px;overflow:hidden;border-collapse:collapse;">
      ${detailRow("Name", `<strong>${name}</strong>`)}
      ${detailRow("Email", `<a href="mailto:${email}" style="color:${brand.primary};text-decoration:none;font-weight:600;">${email}</a>`)}
      ${detailRow("Subject", subject)}
    </table>
    ${senderLinksSection(data)}
    <p style="margin:26px 0 10px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${brand.muted};">
      Message
    </p>
    <div style="padding:18px 20px;border-radius:14px;background:${brand.primarySoft};border:1px solid #bfdbfe;color:${brand.ink};font-size:14px;line-height:1.7;">
      ${message}
    </div>
    <p style="margin:28px 0 0;">
      ${linkButton(`mailto:${email}?subject=${encodeURIComponent(`Re: ${data.subject}`)}`, `Reply to ${name}`, true)}
    </p>`

  return shell({
    preheader: `New inquiry from ${data.name}: ${data.subject}`,
    eyebrow: "Portfolio contact",
    title: "New portfolio inquiry",
    bodyHtml,
    footerNote:
      "Sent from m-salman-dev.vercel.app. Reply directly to continue the conversation.",
  })
}

/** Thank-you email sent to the visitor. */
export function thankYouEmailHtml(data: ContactPayload, ownerName: string): string {
  const name = escapeHtml(data.name)
  const owner = escapeHtml(ownerName)
  const subject = escapeHtml(data.subject)

  const bodyHtml = `
    <p style="margin:0 0 14px;font-size:17px;">Hi ${name},</p>
    <p style="margin:0 0 14px;">
      Thanks for reaching out about
      <strong style="color:${brand.ink};">${subject}</strong>.
      I’ve received your message and usually reply within a day.
    </p>
    <p style="margin:0 0 22px;color:${brand.muted};">
      Meanwhile, explore my work or connect on these channels:
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">
      <tr>
        <td>
          ${linkButton(PORTFOLIO_LINKS.portfolio, "View Portfolio", true)}
          ${linkButton(PORTFOLIO_LINKS.linkedin, "LinkedIn")}
          ${linkButton(PORTFOLIO_LINKS.github, "GitHub")}
        </td>
      </tr>
    </table>
    <div style="margin:26px 0 0;padding:18px 20px;border-radius:14px;background:${brand.softBg};border:1px solid ${brand.border};">
      <p style="margin:0;color:${brand.ink};font-weight:700;font-size:15px;">${owner}</p>
      <p style="margin:4px 0 0;color:${brand.muted};font-size:13px;">Android Developer</p>
      <p style="margin:12px 0 0;font-size:12px;">
        <a href="${PORTFOLIO_LINKS.portfolio}" style="color:${brand.primary};text-decoration:none;font-weight:600;">m-salman-dev.vercel.app</a>
      </p>
    </div>`

  return shell({
    preheader: `Thanks ${data.name} — I got your message and will reply soon.`,
    eyebrow: "Muhammad Salman",
    title: "Thanks for getting in touch",
    subtitle: "Your message is in my inbox — I’ll get back to you soon.",
    bodyHtml,
    footerNote:
      "You received this because you submitted the contact form on Muhammad Salman’s portfolio.",
  })
}
