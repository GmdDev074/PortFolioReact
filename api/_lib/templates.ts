import { escapeHtml } from "./escape"

export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
}

const brand = {
  primary: "#2563eb",
  primarySoft: "#dbeafe",
  ink: "#0f172a",
  muted: "#64748b",
  card: "#ffffff",
  page: "#0b1220",
  border: "#e2e8f0",
}

function shell(opts: {
  preheader: string
  title: string
  bodyHtml: string
  footerNote: string
}): string {
  const { preheader, title, bodyHtml, footerNote } = opts
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
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.page};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${brand.card};border-radius:16px;overflow:hidden;border:1px solid ${brand.border};">
          <tr>
            <td style="background:linear-gradient(135deg,${brand.primary} 0%,#1d4ed8 100%);padding:28px 28px 24px;">
              <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.85);font-weight:600;">
                Muhammad Salman
              </p>
              <h1 style="margin:0;font-size:22px;line-height:1.3;color:#ffffff;font-weight:700;">
                ${escapeHtml(title)}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;color:${brand.ink};font-size:15px;line-height:1.6;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px;">
              <p style="margin:0;font-size:12px;line-height:1.5;color:${brand.muted};">
                ${escapeHtml(footerNote)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function row(label: string, valueHtml: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${brand.border};vertical-align:top;width:110px;">
        <span style="font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${brand.muted};">${label}</span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid ${brand.border};vertical-align:top;color:${brand.ink};">
        ${valueHtml}
      </td>
    </tr>`
}

/** Email sent to you when someone submits the contact form. */
export function inquiryEmailHtml(data: ContactPayload): string {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const subject = escapeHtml(data.subject)
  const message = escapeHtml(data.message).replace(/\n/g, "<br />")

  const bodyHtml = `
    <p style="margin:0 0 18px;">New message from your portfolio contact form.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${row("Name", name)}
      ${row("Email", `<a href="mailto:${email}" style="color:${brand.primary};text-decoration:none;">${email}</a>`)}
      ${row("Subject", subject)}
      ${row("Message", `<div style="white-space:normal;">${message}</div>`)}
    </table>
    <p style="margin:22px 0 0;">
      <a href="mailto:${email}?subject=${encodeURIComponent(`Re: ${data.subject}`)}"
         style="display:inline-block;background:${brand.primary};color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 18px;border-radius:999px;">
        Reply to ${name}
      </a>
    </p>`

  return shell({
    preheader: `${data.name}: ${data.subject}`,
    title: "New portfolio inquiry",
    bodyHtml,
    footerNote:
      "Sent from muhammad-salman portfolio contact form. Reply directly to continue the conversation.",
  })
}

/** Thank-you email sent to the visitor. */
export function thankYouEmailHtml(data: ContactPayload, ownerName: string): string {
  const name = escapeHtml(data.name)
  const owner = escapeHtml(ownerName)
  const subject = escapeHtml(data.subject)

  const bodyHtml = `
    <p style="margin:0 0 14px;">Hi ${name},</p>
    <p style="margin:0 0 14px;">
      Thanks for reaching out — I received your message about
      <strong style="color:${brand.ink};">${subject}</strong>.
    </p>
    <p style="margin:0 0 18px;">
      I usually reply within a day. In the meantime, feel free to check my latest work or connect on LinkedIn.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding-right:10px;">
          <a href="https://www.linkedin.com/in/muhammad-salman-5672a0203/"
             style="display:inline-block;background:${brand.primary};color:#ffffff;text-decoration:none;font-weight:600;font-size:13px;padding:11px 16px;border-radius:999px;">
            LinkedIn
          </a>
        </td>
        <td>
          <a href="https://github.com/GmdDev074"
             style="display:inline-block;background:${brand.primarySoft};color:${brand.primary};text-decoration:none;font-weight:600;font-size:13px;padding:11px 16px;border-radius:999px;">
            GitHub
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:22px 0 0;color:${brand.muted};font-size:14px;">
      — ${owner}<br />
      Android Developer
    </p>`

  return shell({
    preheader: `Thanks ${data.name} — I got your message and will reply soon.`,
    title: "Thanks for getting in touch",
    bodyHtml,
    footerNote:
      "You received this because you submitted the contact form on Muhammad Salman's portfolio.",
  })
}
