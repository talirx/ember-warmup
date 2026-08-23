// Warm-up engine: builds a realistic, randomized outbound email batch.

export interface EngineConfig {
  volume: number // emails per day
  replyTarget: number // desired reply-rate %
  randomizer: number // 0..100 human-like variation
}

const SUBJECTS = [
  'Re: seguimiento de nuestra última llamada',
  'Sobre la propuesta que hablamos',
  'Quick check-in',
  'Adjunto el material que pediste',
  'Pregunta rápida',
  'Retomando el hilo de la semana pasada',
  'Gracias por tu respuesta',
  'Actualización del proyecto',
  '¿Viste mi último correo?',
  'Coordinamos agenda',
]

const BODIES = [
  'Hola, ¿cómo vas con lo que comentamos? Quería saber si pudiste revisarlo.\n\nSaludos,',
  'Buenas. Te reenvío por si no te llegó el anterior.\n\nGracias,',
  'Hola, quedó pendiente cerrar un par de puntos. ¿Te viene bien esta semana?\n\nUn abrazo,',
  'Hola, solo un recordatorio rápido de lo que hablamos. Avísame si necesitas algo.\n\nSaludos,',
  'Buen día. ¿Tuviste oportunidad de ver el documento? Me interesa tu opinión.\n\nGracias,',
]

const POOL = [
  'carla.m@outlook.com',
  'diego@summitlabs.io',
  'maria@northwind.co',
  'jorge@acme-corp.com',
  'laura@brightpath.app',
  'pedro@hexagon.dev',
  'ana@lumen.hq',
  'carlos@orbitmail.com',
]

export function seededRandom(seed: number): () => number {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function buildBatch(cfg: EngineConfig, seed = Date.now()): Array<{ to: string; subject: string; body: string }> {
  const rnd = seededRandom(seed)
  const count = Math.max(1, Math.round(cfg.volume * (1 + (cfg.randomizer / 100) * (rnd() - 0.5))))
  const out = []
  for (let i = 0; i < count; i++) {
    const to = POOL[Math.floor(rnd() * POOL.length)]
    const subject = SUBJECTS[Math.floor(rnd() * SUBJECTS.length)]
    const body = BODIES[Math.floor(rnd() * BODIES.length)]
    out.push({ to, subject, body })
  }
  return out
}
