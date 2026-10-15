import nodemailer from "nodemailer"
import { inquiryEmailHtml, thankYouEmailHtml, type ContactPayload } from "./templates"

export type MailEnv = {
  gmailUser: string
  gmailAppPassword: string
  contactToEmail: string
  ownerName: string
}

export function readMailEnv(
  env: Record<string, string | undefined> = process.env
): MailEnv | { error: string } {
  const gmailUser = env.GMAIL_USER?.trim()
  const gmailAppPassword = env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "")
  const contactToEmail = env.CONTACT_TO_EMAIL?.trim() || gmailUser
  const ownerName = env.CONTACT_OWNER_NAME?.trim() || "Muhammad Salman"

  if (!gmailUser || !gmailAppPassword) {
    return {
      error:
        "Gmail is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD, then restart / redeploy.",
    }
  }

  return {
    gmailUser,
    gmailAppPassword,
    contactToEmail: contactToEmail || gmailUser,
    ownerName,
  }
}

function createTransport(mailEnv: MailEnv) {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailEnv.gmailUser,
      pass: mailEnv.gmailAppPassword,
    },
  })
}

export async function sendContactMails(
  data: ContactPayload,
  mailEnv: MailEnv
): Promise<{ inquirySent: true; thanksSent: boolean; warning?: string }> {
  const transporter = createTransport(mailEnv)
  const from = `"${mailEnv.ownerName}" <${mailEnv.gmailUser}>`

  await transporter.sendMail({
    from,
    to: mailEnv.contactToEmail,
    replyTo: data.email,
    subject: `Portfolio inquiry: ${data.subject}`,
    html: inquiryEmailHtml(data),
  })

  try {
    await transporter.sendMail({
      from,
      to: data.email,
      subject: `Thanks ${data.name} — I got your message`,
      html: thankYouEmailHtml(data, mailEnv.ownerName),
    })
    return { inquirySent: true, thanksSent: true }
  } catch (err) {
    console.error("[contact] thank-you email failed", err)
    return {
      inquirySent: true,
      thanksSent: false,
      warning:
        "Your message reached the inbox, but the thank-you email could not be delivered. Check spam or try again.",
    }
  }
}
