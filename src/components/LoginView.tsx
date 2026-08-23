import { useState } from 'react'
import FlameMascot from './FlameMascot'

interface LoginViewProps {
  onAuthed: (mailbox: string) => void
}

export default function LoginView({ onAuthed }: LoginViewProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState<string | null>(null)

  const simulate = (mailbox: string) => {
    setLoading(mailbox)
    setTimeout(() => onAuthed(mailbox), 1100)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 py-10">
      <div className="w-full max-w-[420px] rounded-[var(--radius-card)] border border-ash-600 bg-ash-900 p-8 shadow-2xl">
        {/* brand + mascot */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <FlameMascot size={34} />
            <span className="text-xl font-extrabold tracking-tight">
              Ember<span className="text-ember-400">.</span>
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <FlameMascot size={72} />
          <div>
            <h1 className="text-[1.5rem] font-bold leading-tight tracking-tight">Calienta tu buzón</h1>
            <p className="mt-1 text-[0.9rem] text-cream-muted">
              Warm-up automático: sube tu reputación de envío antes de lanzar campañas en frío.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-1.5 block text-[0.82rem] font-semibold text-cream-muted" htmlFor="email">
            Correo
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@empresa.com"
            autoComplete="username"
            className="w-full rounded-[var(--radius-btn)] border border-ash-600 bg-ash-800 px-3.5 py-3 text-[0.95rem] text-cream placeholder:text-cream-faint focus:border-ember-400 focus:outline-none focus:ring-2 focus:ring-ember-400/20"
          />
        </div>
        <div className="mt-4 mb-5">
          <label className="mb-1.5 block text-[0.82rem] font-semibold text-cream-muted" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            className="w-full rounded-[var(--radius-btn)] border border-ash-600 bg-ash-800 px-3.5 py-3 text-[0.95rem] text-cream placeholder:text-cream-faint focus:border-ember-400 focus:outline-none focus:ring-2 focus:ring-ember-400/20"
          />
        </div>

        <button
          onClick={() => simulate(email.trim() || 'neftali@zentixchatbot.cloud')}
          disabled={loading !== null}
          className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-ember-400 px-4 py-3 text-[0.95rem] font-bold text-[#1a0d04] shadow-[0_4px_18px_rgba(255,106,43,0.3)] transition hover:brightness-105 active:translate-y-px disabled:opacity-60"
        >
          {loading === 'signin' && <Spinner />}
          {loading === 'signin' ? 'Conectando…' : 'Iniciar sesión'}
        </button>

        <div className="my-5 flex items-center gap-3 text-[0.78rem] text-cream-faint">
          <span className="h-px flex-1 bg-ash-600" />
          o conecta tu buzón directo
          <span className="h-px flex-1 bg-ash-600" />
        </div>

        <div className="grid gap-2.5">
          <button
            onClick={() => simulate('neftali@gmail.com')}
            disabled={loading !== null}
            className="flex items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-ash-600 bg-ash-800 px-4 py-3 text-[0.95rem] font-semibold text-cream transition hover:border-ash-500 hover:bg-ash-700 disabled:opacity-60"
          >
            {loading === 'gmail' ? <Spinner /> : <GmailIcon />}
            {loading === 'gmail' ? 'Conectando…' : 'Conectar con Gmail'}
          </button>
          <button
            onClick={() => simulate('ventas@empresa.com')}
            disabled={loading !== null}
            className="flex items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-ash-600 bg-ash-800 px-4 py-3 text-[0.95rem] font-semibold text-cream transition hover:border-ash-500 hover:bg-ash-700 disabled:opacity-60"
          >
            {loading === 'outlook' ? <Spinner /> : <OutlookIcon />}
            {loading === 'outlook' ? 'Conectando…' : 'Conectar con Outlook / IMAP'}
          </button>
        </div>

        <p className="mt-5 text-center text-[0.82rem] text-cream-faint">
          Sin tarjeta · Prueba gratuita 14 días ·{' '}
          <a href="#" className="text-ember-400 hover:underline">
            ¿Cómo funciona el warm-up?
          </a>
        </p>
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80" />
  )
}

function GmailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="#EA4335" d="M22 6v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6l10 6 10-6z" />
      <path fill="#4285F4" d="M22 6l-10 6L2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function OutlookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" fill="#0A66C2" />
      <path d="M4 7l8 6 8-6" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  )
}
