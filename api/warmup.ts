// POST /api/warmup — trigger a warm-up send for an authenticated user's mailbox.
// Body: { idToken, settings: { volume, replyTarget, randomizer } }
// Reads the user's connected mailbox creds (encrypted) and sends a batch.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sendMail } from './_lib/mail'
import { decrypt } from './_lib/crypto'
import { buildBatch, type EngineConfig } from './_lib/engine'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { idToken, settings } = (req.body ?? {}) as { idToken?: string; settings?: EngineConfig }
  if (!idToken || !settings) {
    return res.status(400).json({ ok: false, error: 'Faltan idToken o settings' })
  }

  // NOTE: idToken verification + mailbox lookup are wired once the Ember
  // Firebase project exists (Firebase Admin SDK, service account). Until then
  // this endpoint runs in "dry-run" mode and reports the planned batch.
  const batch = buildBatch(settings)

  res.status(200).json({
    ok: true,
    dryRun: true,
    planned: batch.length,
    sample: batch.slice(0, 3),
    note: 'Motor listo; se activará al conectar el proyecto Firebase de Ember.',
  })
}
