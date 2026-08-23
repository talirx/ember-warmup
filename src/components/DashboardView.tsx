import { useMemo, useState } from 'react'
import type { ActivityItem, ActivityStatus } from '../types'
import FlameMascot from './FlameMascot'
import Slider from './Slider'
import PaywallModal from './PaywallModal'

interface DashboardViewProps {
  mailbox: string
  onSignOut: () => void
}

const FREE_LIMIT = 20
const TOTAL_EMAILS = 600

const ACTIVITY: ActivityItem[] = [
  { mail: 'carla.m@outlook.com', subject: 'Re: propuesta de colaboración', status: 'reply' },
  { mail: 'diego@summitlabs.io', subject: 'Seguimiento de onboarding', status: 'open' },
  { mail: 'maria@northwind.co', subject: 'Recordatorio amistoso', status: 'click' },
  { mail: 'jorge@acme-corp.com', subject: 'Introducción', status: 'sent' },
  { mail: 'laura@brightpath.app', subject: 'Tocando base', status: 'open' },
]

const STATUS_CHIP: Record<ActivityStatus, { label: string; cls: string }> = {
  reply: { label: 'Respuesta', cls: 'bg-ember-400/15 text-ember-400' },
  open: { label: 'Abierto', cls: 'bg-moss/15 text-moss' },
  click: { label: 'Clic', cls: 'bg-amber-400/15 text-amber-400' },
  sent: { label: 'Enviado', cls: 'bg-ash-700 text-cream-faint' },
}

export default function DashboardView({ mailbox, onSignOut }: DashboardViewProps) {
  const [volume, setVolume] = useState(FREE_LIMIT)
  const [reply, setReply] = useState(40)
  const [randomizer, setRandomizer] = useState(60)
  const [paywallOpen, setPaywallOpen] = useState(false)
  const [upgrading, setUpgrading] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [dragLock, setDragLock] = useState(false)

  const showToast = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2600)
  }

  const metrics = useMemo(() => {
    const remaining = Math.round(TOTAL_EMAILS * 0.66)
    const days = Math.max(2, Math.round(remaining / Math.max(1, volume)))
    const etaDate = new Date(Date.now() + days * 86400000)
    const open = Math.round(50 + reply * 0.18 + randomizer * 0.02)
    const replyRate = Math.round(reply * 0.45)
    return { days, etaDate, open, replyRate }
  }, [volume, reply, randomizer])

  const handleVolume = (v: number) => {
    if (v > FREE_LIMIT) {
      setVolume(FREE_LIMIT)
      if (!dragLock) {
        setDragLock(true)
        setPaywallOpen(true)
      }
    } else {
      setVolume(v)
    }
  }

  const handleUpgrade = () => {
    setUpgrading(true)
    window.setTimeout(() => {
      setUpgrading(false)
      setPaywallOpen(false)
      showToast('Pago no conectado en el POC — aquí iría el checkout.')
    }, 1000)
  }

  return (
    <div className="relative z-10">
      {/* topbar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-ash-600 bg-ash-950/85 px-6 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <FlameMascot size={28} />
          <span className="text-lg font-extrabold tracking-tight">
            Ember<span className="text-ember-400">.</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-ember-400/30 bg-ember-400/10 px-2.5 py-1 text-[0.72rem] font-bold uppercase tracking-wide text-ember-400">
            Free Forever
          </span>
          <button
            onClick={onSignOut}
            className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-ember-400 to-amber-400 text-[0.75rem] font-bold text-[#1a0d04] transition hover:brightness-110"
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
          >
            N
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[920px] px-5 py-6 pb-16">
        {/* status strip */}
        <div className="mb-5 flex flex-wrap items-center gap-3 rounded-[var(--radius-card)] border border-ash-600 bg-ash-800 px-4 py-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-moss shadow-[0_0_0_3px_rgba(74,222,128,0.15)]" />
          <span className="text-[0.9rem] font-semibold">{mailbox}</span>
          <span className="text-[0.82rem] text-cream-muted">
            Buzón conectado · <b className="font-semibold text-cream">hace 2 min</b> · 20 correos/día
          </span>
        </div>

        {/* controls */}
        <section className="mb-5 rounded-[var(--radius-card)] border border-ash-600 bg-ash-800 p-6">
          <h2 className="text-[1.05rem] font-bold tracking-tight">Panel de control</h2>
          <p className="mb-3 mt-1 text-[0.84rem] text-cream-muted">
            Ajusta la intensidad del warm-up. Más volumen = más rápido, pero el plan gratuito tiene un tope.
          </p>

          <Slider
            label="Volumen diario"
            desc="Correos de warm-up enviados por día"
            min={5}
            max={60}
            value={volume}
            unit=" / día"
            capped={volume >= FREE_LIMIT}
            onChange={handleVolume}
            onRelease={() => setDragLock(false)}
          />
          <Slider
            label="Umbral de respuesta"
            desc="% objetivo de replies que el sistema persigue"
            min={10}
            max={90}
            value={reply}
            unit="%"
            onChange={setReply}
          />
          <Slider
            label="Aleatoriedad"
            desc="Variación del comportamiento para imitar a un humano"
            min={0}
            max={100}
            value={randomizer}
            unit="%"
            onChange={setRandomizer}
          />
        </section>

        {/* reports */}
        <section className="rounded-[var(--radius-card)] border border-ash-600 bg-ash-800 p-6">
          <h2 className="text-[1.05rem] font-bold tracking-tight">Reportes de warm-up</h2>
          <p className="mb-4 mt-1 text-[0.84rem] text-cream-muted">
            Progreso y salud del buzón. Simulación del POC — datos de ejemplo.
          </p>

          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Kpi label="Tasa de apertura" value={`${metrics.open}%`} sub="▲ 4% vs. semana pasada" accent />
            <Kpi label="Tasa de respuesta" value={`${metrics.replyRate}%`} sub={`objetivo ${reply}%`} accent />
            <Kpi label="Correos enviados" value="124" sub="en los últimos 30 días" />
            <Kpi label="Finalización estimada" value={String(metrics.days) + ' días'} sub={metrics.etaDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} green />
          </div>

          {/* progress */}
          <div className="mb-5">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-[0.95rem] font-bold">Progreso de warm-up</span>
              <span className="text-[1.1rem] font-extrabold text-ember-400">34%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-ash-700">
              <div className="h-full w-[34%] rounded-full bg-gradient-to-r from-ember-400 to-amber-400" />
            </div>
          </div>

          {/* activity */}
          <div className="mb-2.5 text-[0.85rem] font-bold text-cream-muted">Actividad reciente</div>
          <ul>
            {ACTIVITY.map((a, i) => (
              <li key={i} className="flex items-center gap-3 border-b border-ash-600 py-2.5 text-[0.86rem] last:border-b-0">
                <span className="flex-1 truncate font-semibold">{a.mail}</span>
                <span className="hidden max-w-[220px] truncate text-[0.78rem] text-cream-muted sm:inline">{a.subject}</span>
                <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[0.7rem] font-bold ${STATUS_CHIP[a.status].cls}`}>
                  {STATUS_CHIP[a.status].label}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <PaywallModal open={paywallOpen} onClose={() => setPaywallOpen(false)} onUpgrade={handleUpgrade} upgrading={upgrading} />

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-ash-500 bg-ash-700 px-5 py-3 text-[0.85rem] text-cream shadow-2xl">
          {toast}
        </div>
      )}
    </div>
  )
}

function Kpi({
  label,
  value,
  sub,
  accent,
  green,
}: {
  label: string
  value: string
  sub: string
  accent?: boolean
  green?: boolean
}) {
  return (
    <div className="rounded-[var(--radius-btn)] border border-ash-600 bg-ash-700 p-3.5">
      <div className="text-[0.72rem] font-semibold uppercase tracking-wide text-cream-muted">{label}</div>
      <div
        className={`mt-1.5 text-[1.55rem] font-extrabold tracking-tight tabular-nums ${
          green ? 'text-moss' : accent ? 'text-ember-400' : 'text-cream'
        }`}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[0.74rem] text-cream-faint">{sub}</div>
    </div>
  )
}
