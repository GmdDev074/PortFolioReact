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

/** CID icon ids — must match attachments in mailer / contact.js */
export const EMAIL_ICON_CIDS = {
  mail: "icon-mail",
  link: "icon-link",
  message: "icon-message",
  reply: "icon-reply",
  external: "icon-external",
  externalBlue: "icon-external-blue",
  linkedin: "icon-linkedin",
  github: "icon-github",
} as const

/** Exact mockup palette */
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

function cidImg(cid: string, size = 14): string {
  return `<img src="cid:${cid}" width="${size}" height="${size}" alt="" style="display:block;border:0;outline:none;text-decoration:none;line-height:0;" />`
}

/** Email-safe pill: icon + label vertically centered via nested table */
function pillButton(
  href: string,
  cid: string,
  label: string,
  opts: { filled?: boolean; iconSize?: number } = {}
): string {
  const { filled = false, iconSize = 14 } = opts
  const bg = filled ? brand.primary : brand.primarySoft
  const color = filled ? "#ffffff" : brand.primary
  const border = filled
    ? "none"
    : `1px solid ${brand.primarySoftBorder}`
  const weight = filled ? 700 : 600
  // GitHub label uses ink in mockup
  const textColor = !filled && label === "GitHub" ? brand.ink : color

  return `<a href="${href}" style="display:inline-block;background:${bg};color:${textColor};text-decoration:none;border-radius:999px;border:${border};">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
      <tr>
        <td style="padding:11px 6px 11px 15px;vertical-align:middle;line-height:0;">
          ${cidImg(cid, iconSize)}
        </td>
        <td style="padding:11px 15px 11px 2px;vertical-align:middle;font-size:13px;font-weight:${weight};color:${textColor};line-height:1;white-space:nowrap;">
          ${escapeHtml(label)}
        </td>
      </tr>
    </table>
  </a>`
}

function iconChip(cid: string): string {
  return `<span style="display:inline-block;width:28px;height:28px;line-height:28px;text-align:center;border-radius:8px;background:${brand.primarySoft};vertical-align:middle;">${cidImg(cid, 14)}</span>`
}

function sectionTitle(cid: string, label: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 12px;">
      <tr>
        <td style="vertical-align:middle;padding:0 10px 0 0;">${iconChip(cid)}</td>
        <td style="vertical-align:middle;">
          <span style="font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${brand.primary};">${escapeHtml(label)}</span>
        </td>
      </tr>
    </table>`
}

function detailRow(label: string, valueHtml: string, isLast = false): string {
  const border = isLast ? "none" : `1px solid ${brand.border}`
  return `
    <tr>
      <td style="padding:13px 16px;border-bottom:${border};width:108px;vertical-align:middle;background:${brand.labelBg};">
        <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${brand.muted};">${escapeHtml(label)}</span>
      </td>
      <td style="padding:13px 16px;border-bottom:${border};vertical-align:middle;color:${brand.ink};font-size:14px;line-height:1.45;background:${brand.card};">
        ${valueHtml}
      </td>
    </tr>`
}

function detailsTable(rowsHtml: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.border};border-radius:12px;overflow:hidden;border-collapse:collapse;margin:0 0 26px;">
      ${rowsHtml}
    </table>`
}

function externalLink(url: string): string {
  const safe = escapeHtml(url)
  return `<a href="${safe}" style="color:${brand.primary};text-decoration:none;font-weight:600;word-break:break-all;">${safe}</a>`
}

function senderLinksSection(data: ContactPayload): string {
  const items: Array<[string, string]> = []
  if (data.productUrl) items.push(["Product", data.productUrl])
  if (data.linkedin) items.push(["LinkedIn", data.linkedin])
  if (data.github) items.push(["GitHub", data.github])
  if (!items.length) return ""

  const rows = items
    .map(([label, url], i) =>
      detailRow(label, externalLink(url), i === items.length - 1)
    )
    .join("")

  return `${sectionTitle(EMAIL_ICON_CIDS.link, "Their links")}${detailsTable(rows)}`
}

function shell(opts: {
  preheader: string
  eyebrow: string
  title: string
  subtitle: string
  bodyHtml: string
  footerInnerHtml: string
}): string {
  const { preheader, eyebrow, title, subtitle, bodyHtml, footerInnerHtml } = opts
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${brand.page};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.page};padding:40px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${brand.card};border-radius:16px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.45);">
          <tr>
            <td style="background-color:${brand.primaryMid};background-image:linear-gradient(165deg,${brand.primaryDeep} 0%,${brand.primaryMid} 45%,${brand.primary} 100%);padding:34px 32px 30px;">
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.82);font-weight:700;">
                ${escapeHtml(eyebrow)}
              </p>
              <h1 style="margin:0;font-size:28px;line-height:1.2;color:#ffffff;font-weight:700;letter-spacing:-0.02em;">
                ${escapeHtml(title)}
              </h1>
              <p style="margin:12px 0 0;font-size:14px;line-height:1.5;color:rgba(255,255,255,0.92);">
                ${escapeHtml(subtitle)}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:30px 32px 10px;color:${brand.ink};font-size:15px;line-height:1.65;background:${brand.card};">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:12px 32px 28px;background:${brand.card};">
              ${footerInnerHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/** Email sent to portfolio owner. */
export function inquiryEmailHtml(data: ContactPayload): string {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const subject = escapeHtml(data.subject)
  const message = escapeHtml(data.message).replace(/\n/g, "<br />")
  const replyHref = `mailto:${data.email}?subject=${encodeURIComponent(`Re: ${data.subject}`)}`

  const bodyHtml = `
    ${sectionTitle(EMAIL_ICON_CIDS.mail, "New lead")}
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${brand.ink};">
      A visitor contacted you through the portfolio. Review their details and reply when ready.
    </p>
    ${detailsTable(
      [
        detailRow(
          "Name",
          `<strong style="color:${brand.ink};font-weight:700;">${name}</strong>`
        ),
        detailRow(
          "Email",
          `<a href="mailto:${email}" style="color:${brand.primary};text-decoration:none;font-weight:600;">${email}</a>`
        ),
        detailRow(
          "Subject",
          `<span style="color:${brand.ink};">${subject}</span>`,
          true
        ),
      ].join("")
    )}
    ${senderLinksSection(data)}
    ${sectionTitle(EMAIL_ICON_CIDS.message, "The message")}
    <div style="padding:18px;border-radius:12px;background:${brand.primarySoft};border:1px solid ${brand.primarySoftBorder};color:${brand.ink};font-size:14px;line-height:1.7;">
      ${message}
    </div>`

  const footerInnerHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 0;">
      <tr>
        <td align="center" bgcolor="${brand.primary}" style="border-radius:12px;background-color:${brand.primary};">
          <a href="${replyHref}" style="display:block;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:12px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <tr>
                <td align="center" style="padding:15px 20px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 auto;">
                    <tr>
                      <td style="vertical-align:middle;padding:0 8px 0 0;line-height:0;">${cidImg(EMAIL_ICON_CIDS.reply, 16)}</td>
                      <td style="vertical-align:middle;font-size:15px;font-weight:700;color:#ffffff;line-height:1;white-space:nowrap;">Reply to ${name}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:18px 0 0;font-size:12px;line-height:1.55;color:${brand.muted};">
      Sent from <a href="${PORTFOLIO_LINKS.portfolio}" style="color:${brand.primary};text-decoration:none;font-weight:600;">m-salman-dev.vercel.app</a>. Reply directly to continue the conversation.
    </p>`

  return shell({
    preheader: `New inquiry from ${data.name}: ${data.subject}`,
    eyebrow: "— Portfolio contact",
    title: "New portfolio inquiry",
    subtitle: "Android Developer • Kotlin • Compose • React Native",
    bodyHtml,
    footerInnerHtml,
  })
}

/** Thank-you / auto-reply to visitor. */
export function thankYouEmailHtml(
  data: ContactPayload,
  ownerName: string
): string {
  const name = escapeHtml(data.name)
  const owner = escapeHtml(ownerName)
  const subject = escapeHtml(data.subject)
  const initials =
    ownerName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("") || "MS"

  const bodyHtml = `
    <p style="margin:0 0 12px;font-size:17px;font-weight:700;color:${brand.ink};">Hi ${name},</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:${brand.ink};">
      Thanks for reaching out about
      <strong style="font-weight:700;">${subject}</strong>.
      I’ve received your message and usually reply within a day.
    </p>
    <p style="margin:0 0 18px;font-size:14px;color:${brand.muted};">
      Meanwhile, explore my work or connect on these channels:
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="padding:0 8px 8px 0;vertical-align:middle;">
          ${pillButton(PORTFOLIO_LINKS.portfolio, EMAIL_ICON_CIDS.external, "View Portfolio", { filled: true })}
        </td>
        <td style="padding:0 8px 8px 0;vertical-align:middle;">
          ${pillButton(PORTFOLIO_LINKS.linkedin, EMAIL_ICON_CIDS.linkedin, "LinkedIn")}
        </td>
        <td style="padding:0 0 8px 0;vertical-align:middle;">
          ${pillButton(PORTFOLIO_LINKS.github, EMAIL_ICON_CIDS.github, "GitHub")}
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.primarySoftBorder};border-radius:14px;background:${brand.softBg};">
      <tr>
        <td style="padding:18px 12px 18px 18px;width:56px;vertical-align:middle;">
          <div style="width:48px;height:48px;line-height:48px;border-radius:999px;background:${brand.primary};color:#ffffff;font-size:15px;font-weight:700;text-align:center;">
            ${escapeHtml(initials)}
          </div>
        </td>
        <td style="padding:18px 18px 18px 4px;vertical-align:middle;">
          <p style="margin:0;color:${brand.ink};font-weight:700;font-size:15px;">${owner}</p>
          <p style="margin:3px 0 0;color:${brand.muted};font-size:13px;">Android Developer</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:8px 0 0;">
            <tr>
              <td style="vertical-align:middle;padding:0 4px 0 0;font-size:13px;font-weight:600;line-height:1;">
                <a href="${PORTFOLIO_LINKS.portfolio}" style="color:${brand.primary};text-decoration:none;font-weight:600;">m-salman-dev.vercel.app</a>
              </td>
              <td style="vertical-align:middle;line-height:0;">
                <a href="${PORTFOLIO_LINKS.portfolio}" style="text-decoration:none;line-height:0;">${cidImg(EMAIL_ICON_CIDS.externalBlue, 12)}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`

  const footerInnerHtml = `
    <div style="height:1px;background:${brand.border};margin:22px 0 16px;"></div>
    <p style="margin:0;font-size:12px;line-height:1.55;color:${brand.muted};">
      You received this because you submitted the contact form on Muhammad Salman’s portfolio.
    </p>`

  return shell({
    preheader: `Thanks ${data.name} — I got your message and will reply soon.`,
    eyebrow: "↺ Auto-reply",
    title: "Thanks for getting in touch",
    subtitle: "Your message is in my inbox — I’ll get back to you soon",
    bodyHtml,
    footerInnerHtml,
  })
}
