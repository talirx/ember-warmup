// POST /api/mailbox/test — validate SMTP + IMAP credentials before storing them.
// Body: { host, port, secure, user, pass, imapHost, imapPort }
// Never persists creds here; returns ok/error only. Passwords are only used to
// test the connection and are not logged or stored.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { testSmtp, testImap, type MailboxCreds } from './_lib/mail'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const creds = req.body as MailboxCreds
  if (!creds?.host || !creds?.user || !creds?.pass) {
    return res.status(400).json({ ok: false, error: 'Faltan credenciales (host/user/pass)' })
  }

  const smtp = await testSmtp(creds)
  const imap = creds.imapHost ? await testImap(creds) : { ok: false, error: 'Sin host IMAP' }

  res.status(200).json({
    ok: smtp.ok && imap.ok,
    smtp: smtp.ok ? 'ok' : smtp.error,
    imap: imap.ok ? 'ok' : imap.error,
  })
}
