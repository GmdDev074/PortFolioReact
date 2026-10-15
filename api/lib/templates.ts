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

function iconBadge(symbol: string): string {
  return `<span style="display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;border-radius:7px;background:${brand.primarySoft};color:${brand.primary};font-size:12px;font-weight:700;vertical-align:middle;margin-right:8px;">${symbol}</span>`
}

function sectionTitle(symbol: string, label: string): string {
  return `
    <p style="margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${brand.primary};">
      ${iconBadge(symbol)}${escapeHtml(label)}
    </p>`
}

function linkButton(
  href: string,
  label: string,
  opts: { filled?: boolean; fullWidth?: boolean; icon?: string } = {}
): string {
  const { filled = false, fullWidth = false, icon } = opts
  const iconHtml = icon
    ? `<span style="margin-right:8px;font-size:14px;line-height:1;">${icon}</span>`
    : ""
  const display = fullWidth ? "block" : "inline-block"
  const width = fullWidth ? "width:100%;box-sizing:border-box;text-align:center;" : ""
  const margin = fullWidth ? "margin:0;" : "margin:0 8px 10px 0;"

  if (filled) {
    return `<a href="${href}" style="display:${display};${width}${margin}background:${brand.primary};color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 20px;border-radius:12px;">${iconHtml}${escapeHtml(label)}</a>`
  }
  return `<a href="${href}" style="display:${display};${width}${margin}background:${brand.primarySoft};color:${brand.primary};text-decoration:none;font-weight:600;font-size:13px;padding:12px 16px;border-radius:999px;border:1px solid #C7D7FF;">${iconHtml}${escapeHtml(label)}</a>`
}

function shell(opts: {
  preheader: string
  eyebrow: string
  title: string
  subtitle?: string
  bodyHtml: string
  footerNote: string
  footerHtml?: string
}): string {
  const { preheader, eyebrow, title, subtitle, bodyHtml, footerNote, footerHtml } =
    opts
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${brand.page};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${escapeHtml(preheader)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.page};padding:36px 14px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${brand.card};border-radius:18px;overflow:hidden;border:1px solid ${brand.border};box-shadow:0 20px 50px rgba(0,0,0,0.35);">
          <tr>
            <td style="background:${brand.primary};padding:32px 32px 28px;">
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.8);font-weight:700;">
                ${escapeHtml(eyebrow)}
              </p>
              <h1 style="margin:0;font-size:26px;line-height:1.25;color:#ffffff;font-weight:700;">
                ${escapeHtml(title)}
              </h1>
              <p style="margin:12px 0 0;font-size:14px;line-height:1.5;color:rgba(255,255,255,0.92);">
                ${escapeHtml(
                  subtitle ||
                    "Android Developer · Kotlin · Compose · React Native"
                )}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:30px 32px 8px;color:${brand.ink};font-size:15px;line-height:1.65;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px 28px;">
              ${footerHtml || ""}
              <div style="height:1px;background:${brand.border};margin:0 0 16px;"></div>
              <p style="margin:0;font-size:12px;line-height:1.55;color:${brand.muted};">
                ${footerNote}
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-size:11px;color:#64748b;">
          © ${new Date().getFullYear()} Muhammad Salman · m-salman-dev.vercel.app
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function detailRow(label: string, valueHtml: string, isLast = false): string {
  const border = isLast ? "none" : `1px solid ${brand.border}`
  return `
    <tr>
      <td style="padding:12px 14px;border-bottom:${border};width:110px;vertical-align:top;background:${brand.labelBg};">
        <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${brand.muted};">${escapeHtml(label)}</span>
      </td>
      <td style="padding:12px 14px;border-bottom:${border};vertical-align:top;color:${brand.ink};font-size:14px;background:${brand.card};">
        ${valueHtml}
      </td>
    </tr>`
}

function detailsTable(rows: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.border};border-radius:12px;overflow:hidden;border-collapse:collapse;margin:0 0 22px;">
      ${rows}
    </table>`
}

function externalLink(url: string, label?: string): string {
  const safe = escapeHtml(url)
  const text = escapeHtml(label || url)
  return `<a href="${safe}" style="color:${brand.primary};text-decoration:none;font-weight:600;word-break:break-all;">${text}</a>`
}

function senderLinksSection(data: ContactPayload): string {
  const items: Array<[string, string]> = []
  if (data.productUrl) items.push(["Product", data.productUrl])
  if (data.linkedin) items.push(["LinkedIn", data.linkedin])
  if (data.github) items.push(["GitHub", data.github])
  if (items.length === 0) return ""

  const rows = items
    .map(([label, url], i) =>
      detailRow(label, externalLink(url), i === items.length - 1)
    )
    .join("")

  return `
    ${sectionTitle("↗", "Their links")}
    ${detailsTable(rows)}`
}

/** Email sent to you when someone submits the contact form. */
export function inquiryEmailHtml(data: ContactPayload): string {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const subject = escapeHtml(data.subject)
  const message = escapeHtml(data.message).replace(/\n/g, "<br />")
  const replyHref = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(`Re: ${data.subject}`)}`

  const bodyHtml = `
    ${sectionTitle("✉", "New lead")}
    <p style="margin:0 0 16px;font-size:15px;color:${brand.ink};">
      A visitor contacted you through the portfolio. Review their details and reply when ready.
    </p>
    ${detailsTable(
      [
        detailRow("Name", `<strong style="color:${brand.ink};">${name}</strong>`),
        detailRow(
          "Email",
          `<a href="mailto:${email}" style="color:${brand.primary};text-decoration:none;font-weight:600;">${email}</a>`
        ),
        detailRow("Subject", subject, true),
      ].join("")
    )}
    ${senderLinksSection(data)}
    ${sectionTitle("💬", "The message")}
    <div style="padding:16px 18px;border-radius:12px;background:${brand.primarySoft};border:1px solid #C7D7FF;color:${brand.ink};font-size:14px;line-height:1.7;margin:0 0 8px;">
      ${message}
    </div>`

  const footerHtml = `
    <div style="margin:0 0 22px;">
      ${linkButton(replyHref, `Reply to ${data.name}`, {
        filled: true,
        fullWidth: true,
        icon: "↩",
      })}
    </div>`

  return shell({
    preheader: `New inquiry from ${data.name}: ${data.subject}`,
    eyebrow: "— Portfolio contact",
    title: "New portfolio inquiry",
    bodyHtml,
    footerHtml,
    footerNote: `Sent from <a href="${PORTFOLIO_LINKS.portfolio}" style="color:${brand.primary};text-decoration:none;font-weight:600;">m-salman-dev.vercel.app</a>. Reply directly to continue the conversation.`,
  })
}

/** Thank-you email sent to the visitor. */
export function thankYouEmailHtml(data: ContactPayload, ownerName: string): string {
  const name = escapeHtml(data.name)
  const owner = escapeHtml(ownerName)
  const subject = escapeHtml(data.subject)
  const initials = ownerName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("")

  const bodyHtml = `
    <p style="margin:0 0 12px;font-size:17px;color:${brand.ink};">Hi ${name},</p>
    <p style="margin:0 0 14px;color:${brand.ink};">
      Thanks for reaching out about
      <strong style="color:${brand.ink};">${subject}</strong>.
      I’ve received your message and usually reply within a day.
    </p>
    <p style="margin:0 0 18px;color:${brand.muted};">
      Meanwhile, explore my work or connect on these channels:
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;">
      <tr>
        <td style="padding:0 8px 8px 0;">
          ${linkButton(PORTFOLIO_LINKS.portfolio, "View Portfolio", {
            filled: true,
            icon: "↗",
          })}
        </td>
        <td style="padding:0 8px 8px 0;">
          ${linkButton(PORTFOLIO_LINKS.linkedin, "LinkedIn")}
        </td>
        <td style="padding:0 0 8px 0;">
          ${linkButton(PORTFOLIO_LINKS.github, "GitHub")}
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #C7D7FF;border-radius:14px;background:${brand.softBg};overflow:hidden;">
      <tr>
        <td style="padding:18px 20px;" align="center">
          <div style="width:52px;height:52px;line-height:52px;border-radius:999px;background:${brand.primary};color:#ffffff;font-size:16px;font-weight:700;margin:0 auto 12px;text-align:center;">
            ${escapeHtml(initials || "MS")}
          </div>
          <p style="margin:0;color:${brand.ink};font-weight:700;font-size:15px;">${owner}</p>
          <p style="margin:4px 0 0;color:${brand.muted};font-size:13px;">Android Developer</p>
          <p style="margin:10px 0 0;font-size:13px;">
            <a href="${PORTFOLIO_LINKS.portfolio}" style="color:${brand.primary};text-decoration:none;font-weight:600;">m-salman-dev.vercel.app ↗</a>
          </p>
        </td>
      </tr>
    </table>`

  return shell({
    preheader: `Thanks ${data.name} — I got your message and will reply soon.`,
    eyebrow: "↺ Auto-reply",
    title: "Thanks for getting in touch",
    subtitle: "Your message is in my inbox — I’ll get back to you soon",
    bodyHtml,
    footerNote:
      "You received this because you submitted the contact form on Muhammad Salman’s portfolio.",
  })
}
