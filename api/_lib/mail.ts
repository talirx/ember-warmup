// SMTP send + IMAP connect helpers for the warm-up engine.

import nodemailer from 'nodemailer'
import { ImapFlow } from 'imapflow'

export interface MailboxCreds {
  host: string // SMTP host
  port: number
  secure: boolean
  user: string
  pass: string // encrypted at rest by caller
  imapHost: string
  imapPort: number
}

export async function testSmtp(creds: MailboxCreds): Promise<{ ok: boolean; error?: string }> {
  const transporter = nodemailer.createTransport({
    host: creds.host,
    port: creds.port,
    secure: creds.secure,
    auth: { user: creds.user, pass: creds.pass },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
  })
  try {
    await transporter.verify()
    return { ok: true }
  } catch (e) {
    return { ok: false, error: (e as Error).message }
  } finally {
    transporter.close()
  }
}

export async function sendMail(creds: MailboxCreds, to: string, subject: string, body: string): Promise<{ ok: boolean; error?: string }> {
  const transporter = nodemailer.createTransport({
    host: creds.host,
    port: creds.port,
    secure: creds.secure,
    auth: { user: creds.user, pass: creds.pass },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 30000,
  })
  try {
    await transporter.sendMail({
      from: creds.user,
      to,
      subject,
      text: body,
    })
    return { ok: true }
  } catch (e) {
    return { ok: false, error: (e as Error).message }
  } finally {
    transporter.close()
  }
}

export async function testImap(creds: MailboxCreds): Promise<{ ok: boolean; error?: string }> {
  const client = new ImapFlow({
    host: creds.imapHost,
    port: creds.imapPort,
    secure: creds.imapPort === 993,
    auth: { user: creds.user, pass: creds.pass },
    logger: false,
  })
  try {
    await client.connect()
    await client.mailboxOpen('INBOX')
    return { ok: true }
  } catch (e) {
    return { ok: false, error: (e as Error).message }
  } finally {
    await client.logout().catch(() => {})
  }
}

// Count replies received for warm-up tracking: look for messages in INBOX that
// arrived after `since` and are replies to our own outbound (best-effort).
export async function countReplies(creds: MailboxCreds, since: Date): Promise<number> {
  const client = new ImapFlow({
    host: creds.imapHost,
    port: creds.imapPort,
    secure: creds.imapPort === 993,
    auth: { user: creds.user, pass: creds.pass },
    logger: false,
  })
  try {
    await client.connect()
    const lock = await client.getMailboxLock('INBOX')
    try {
      const range = await client.search({ since })
      return Array.isArray(range) ? range.length : 0
    } finally {
      lock.release()
    }
  } catch {
    return 0
  } finally {
    await client.logout().catch(() => {})
  }
}
