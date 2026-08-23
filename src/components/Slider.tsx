import type { CSSProperties } from 'react'

interface SliderProps {
  label: string
  desc: string
  min: number
  max: number
  step?: number
  value: number
  unit?: string
  capped?: boolean
  onChange: (value: number) => void
  onRelease?: () => void
}

export default function Slider({
  label,
  desc,
  min,
  max,
  step = 1,
  value,
  unit = '',
  capped = false,
  onChange,
  onRelease,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="border-b border-ash-600 py-4 last:border-b-0">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <div>
          <div className="font-semibold text-[0.92rem]">{label}</div>
          <div className="mt-0.5 text-[0.78rem] text-cream-muted">{desc}</div>
        </div>
        <div
          className={`whitespace-nowrap text-[0.95rem] font-bold tabular-nums ${
            capped ? 'text-amber-400' : 'text-ember-400'
          }`}
        >
          {value}
          {unit}
        </div>
      </div>
      <input
        type="range"
        className={`ember-range ${capped ? 'capped' : ''}`}
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        style={{ '--fill': `${pct}%` } as CSSProperties}
        onChange={(e) => onChange(Number(e.target.value))}
        onPointerUp={onRelease}
        onKeyUp={onRelease}
      />
    </div>
  )
}
