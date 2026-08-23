import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

export interface WarmupSettings {
  volume: number
  replyTarget: number
  randomizer: number
  updatedAt: number
}

const DEFAULTS: WarmupSettings = {
  volume: 20,
  replyTarget: 40,
  randomizer: 60,
  updatedAt: Date.now(),
}

function settingsDoc(uid: string) {
  return doc(db, 'ember_users', uid, 'ember_settings', 'warmup')
}

export async function loadSettings(uid: string): Promise<WarmupSettings> {
  const snap = await getDoc(settingsDoc(uid))
  if (!snap.exists()) return { ...DEFAULTS }
  const d = snap.data() as Partial<WarmupSettings>
  return {
    volume: d.volume ?? DEFAULTS.volume,
    replyTarget: d.replyTarget ?? DEFAULTS.replyTarget,
    randomizer: d.randomizer ?? DEFAULTS.randomizer,
    updatedAt: d.updatedAt ?? Date.now(),
  }
}

export async function saveSettings(uid: string, s: Partial<WarmupSettings>): Promise<void> {
  const snap = await getDoc(settingsDoc(uid))
  if (snap.exists()) {
    await updateDoc(settingsDoc(uid), { ...s, updatedAt: Date.now() })
  } else {
    await setDoc(settingsDoc(uid), { ...DEFAULTS, ...s, updatedAt: Date.now() })
  }
}
