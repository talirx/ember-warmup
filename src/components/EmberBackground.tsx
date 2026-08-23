import { useMemo } from 'react'
import type { CSSProperties } from 'react'

interface Ember {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  drift: number
}

/** Fondo fijo con resplandores cálidos y brasas ascendentes. */
export default function EmberBackground() {
  const embers = useMemo<Ember[]>(() => {
    const count = 28
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 6 + Math.random() * 9,
      delay: Math.random() * 9,
      drift: (Math.random() - 0.5) * 130,
    }))
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* warm glow blobs */}
      <div className="absolute -top-32 -right-24 h-[40rem] w-[40rem] rounded-full bg-ember-400/15 blur-[140px]" />
      <div className="absolute -bottom-56 -left-32 h-[44rem] w-[44rem] rounded-full bg-amber-400/10 blur-[150px]" />

      {/* rising embers */}
      {embers.map((e) => (
        <span
          key={e.id}
          className="ember-bg"
          style={
            {
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
              '--drift': `${e.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
