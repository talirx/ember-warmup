// AES-256-GCM encryption for mailbox credentials (IMAP/SMTP passwords / tokens).
// Key comes from EMBER_CRYPTO_KEY (32 bytes, base64). Never store plaintext creds.

import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'node:crypto'

function key(): Buffer {
  const raw = process.env.EMBER_CRYPTO_KEY
  if (!raw) throw new Error('EMBER_CRYPTO_KEY is not set')
  return createHash('sha256').update(raw).digest()
}

export function encrypt(plain: string): string {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key(), iv)
  const enc = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return [iv.toString('base64'), tag.toString('base64'), enc.toString('base64')].join('.')
}

export function decrypt(payload: string): string {
  const [iv, tag, data] = payload.split('.')
  const decipher = createDecipheriv('aes-256-gcm', key(), Buffer.from(iv, 'base64'))
  decipher.setAuthTag(Buffer.from(tag, 'base64'))
  return Buffer.concat([decipher.update(Buffer.from(data, 'base64')), decipher.final()]).toString('utf8')
}
