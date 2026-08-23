interface PaywallModalProps {
  open: boolean
  onClose: () => void
  onUpgrade: () => void
  upgrading: boolean
}

export default function PaywallModal({ open, onClose, onUpgrade, upgrading }: PaywallModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-5 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="paywall-title"
    >
      <div className="animate-pop w-full max-w-[480px] rounded-[var(--radius-card)] border border-ash-500 bg-ash-900 p-7 shadow-2xl">
        <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-amber-400/15">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ffb020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h3 id="paywall-title" className="text-[1.3rem] font-extrabold tracking-tight">
          Llegaste al límite gratuito
        </h3>
        <p className="mt-2 text-[0.9rem] text-cream-muted">
          El plan Free Forever permite hasta <b className="text-cream">20 correos/día</b>. Para un warm-up más
          agresivo, escala tu volumen.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-[var(--radius-btn)] border border-ash-600 p-4">
            <div className="text-[0.9rem] font-bold">Free Forever</div>
            <div className="mt-1.5 mb-2.5 text-[1.4rem] font-extrabold tracking-tight">
              $0<span className="text-[0.75rem] font-semibold text-cream-muted">/mes</span>
            </div>
            <ul className="text-[0.78rem] text-cream-muted">
              <PlanItem>20 correos/día</PlanItem>
              <PlanItem>1 buzón</PlanItem>
              <PlanItem>Reportes básicos</PlanItem>
            </ul>
          </div>

          <div className="relative rounded-[var(--radius-btn)] border border-ember-400 bg-ember-400/10 p-4">
            <span className="absolute -top-2.5 right-3 rounded-full bg-ember-400 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-[#1a0d04]">
              Recomendado
            </span>
            <div className="text-[0.9rem] font-bold">Scale</div>
            <div className="mt-1.5 mb-2.5 text-[1.4rem] font-extrabold tracking-tight">
              $29<span className="text-[0.75rem] font-semibold text-cream-muted">/mes</span>
            </div>
            <ul className="text-[0.78rem] text-cream-muted">
              <PlanItem>Hasta 250 correos/día</PlanItem>
              <PlanItem>Buzones ilimitados</PlanItem>
              <PlanItem>Aleatoriedad avanzada</PlanItem>
              <PlanItem>Reportes en tiempo real</PlanItem>
            </ul>
          </div>
        </div>

        <button
          onClick={onUpgrade}
          disabled={upgrading}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-ember-400 px-4 py-3 text-[0.95rem] font-bold text-[#1a0d04] shadow-[0_4px_18px_rgba(255,106,43,0.3)] transition hover:brightness-105 active:translate-y-px disabled:opacity-60"
        >
          {upgrading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          )}
          {upgrading ? 'Procesando…' : 'Escalar servicio →'}
        </button>
        <button onClick={onClose} className="mt-3 w-full bg-transparent text-center text-[0.82rem] text-cream-faint transition hover:text-cream-muted">
          Quizá más tarde
        </button>
      </div>
    </div>
  )
}

function PlanItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-1.5 py-0.5">
      <span className="text-moss">✓</span>
      {children}
    </li>
  )
}
