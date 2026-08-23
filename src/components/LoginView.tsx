import { useState } from 'react'
import { signInEmail, signUpEmail, signInGoogle } from '../lib/auth'
import FlameMascot from './FlameMascot'

export default function LoginView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const doEmail = async () => {
    setError(null)
    if (!email.trim()) return setError('Escribe tu correo.')
    if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.')
    setBusy('email')
    const res = mode === 'signin' ? await signInEmail(email, password) : await signUpEmail(email, password)
    setBusy(null)
    if (!res.ok) setError(res.error)
  }

  const doGoogle = async () => {
    setError(null)
    setBusy('google')
    const res = await signInGoogle()
    setBusy(null)
    if (!res.ok) setError(res.error)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 py-10">
      <div className="w-full max-w-[420px] rounded-[var(--radius-card)] border border-ash-600 bg-ash-900 p-8 shadow-2xl">
        <div className="flex items-center gap-2.5">
          <FlameMascot size={34} />
          <span className="text-xl font-extrabold tracking-tight">
            Ember<span className="text-ember-400">.</span>
          </span>
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
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            className="w-full rounded-[var(--radius-btn)] border border-ash-600 bg-ash-800 px-3.5 py-3 text-[0.95rem] text-cream placeholder:text-cream-faint focus:border-ember-400 focus:outline-none focus:ring-2 focus:ring-ember-400/20"
          />
        </div>

        {error && (
          <div className="mb-4 rounded-[var(--radius-btn)] border border-red-400/30 bg-red-400/10 px-3.5 py-2.5 text-[0.84rem] font-medium text-red-300">
            {error}
          </div>
        )}

        <button
          onClick={doEmail}
          disabled={busy !== null}
          className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-ember-400 px-4 py-3 text-[0.95rem] font-bold text-[#1a0d04] shadow-[0_4px_18px_rgba(255,106,43,0.3)] transition hover:brightness-105 active:translate-y-px disabled:opacity-60"
        >
          {busy === 'email' && <Spinner />}
          {busy === 'email' ? 'Conectando…' : mode === 'signin' ? 'Iniciar sesión' : 'Crear cuenta'}
        </button>

        <button
          onClick={() => {
            setMode(mode === 'signin' ? 'signup' : 'signin')
            setError(null)
          }}
          className="mt-3 w-full bg-transparent text-center text-[0.82rem] text-cream-muted transition hover:text-cream"
        >
          {mode === 'signin' ? '¿No tienes cuenta? Regístrate gratis' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>

        <div className="my-5 flex items-center gap-3 text-[0.78rem] text-cream-faint">
          <span className="h-px flex-1 bg-ash-600" />
          o conecta tu buzón directo
          <span className="h-px flex-1 bg-ash-600" />
        </div>

        <button
          onClick={doGoogle}
          disabled={busy !== null}
          className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-ash-600 bg-ash-800 px-4 py-3 text-[0.95rem] font-semibold text-cream transition hover:border-ash-500 hover:bg-ash-700 disabled:opacity-60"
        >
          {busy === 'google' ? <Spinner /> : <GmailIcon />}
          {busy === 'google' ? 'Conectando…' : 'Continuar con Google'}
        </button>

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
