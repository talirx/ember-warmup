import type { CSSProperties } from 'react'

/**
 * FlameMascot — flama viva estilo Calcifer.
 * SVG en capas (exterior → núcleo) con flicker, glow pulsante,
 * parpadeo de ojos y brasas que suben.
 */
export default function FlameMascot({
  size = 120,
  className = '',
  style,
}: {
  size?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <div className={`flame-sway inline-block ${className}`} style={{ width: size, height: size, ...style }}>
      <svg viewBox="0 0 120 120" width={size} height={size} aria-label="Flama viva de Ember">
        <defs>
          <radialGradient id="emberGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff8a4d" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ff4d00" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="emberOuter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff8a4d" />
            <stop offset="100%" stopColor="#e8490f" />
          </linearGradient>
          <linearGradient id="emberMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffb020" />
            <stop offset="100%" stopColor="#ff8a00" />
          </linearGradient>
          <linearGradient id="emberCore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe6bb" />
            <stop offset="100%" stopColor="#ffd166" />
          </linearGradient>
        </defs>

        {/* halo glow */}
        <circle className="flame-glow" cx="60" cy="60" r="52" fill="url(#emberGlow)" />

        {/* flame body (flickers together) */}
        <g className="flame-flicker">
          <path
            d="M60 5 C71 23 79 40 79 57 C79 79 70 92 60 97 C50 92 41 79 41 57 C41 40 49 23 60 5 Z"
            fill="url(#emberOuter)"
          />
          <path
            d="M60 16 C68 30 74 42 74 55 C74 72 67 84 60 90 C53 84 46 72 46 55 C46 42 52 30 60 16 Z"
            fill="url(#emberMid)"
          />
          <path
            d="M60 30 C65 39 69 46 69 54 C69 65 64 73 60 77 C56 73 51 65 51 54 C51 46 55 39 60 30 Z"
            fill="url(#emberCore)"
          />
        </g>

        {/* face */}
        <g>
          {/* eyes (blink) */}
          <g className="flame-eye">
            <ellipse cx="54.5" cy="60" rx="2.6" ry="3.4" fill="#2a1608" />
            <circle cx="55.3" cy="58.6" r="0.9" fill="#fff" />
          </g>
          <g className="flame-eye" style={{ animationDelay: '0.12s' } as CSSProperties}>
            <ellipse cx="65.5" cy="60" rx="2.6" ry="3.4" fill="#2a1608" />
            <circle cx="66.3" cy="58.6" r="0.9" fill="#fff" />
          </g>
          {/* smile */}
          <path
            d="M55.5 69 Q60 74 64.5 69"
            stroke="#2a1608"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* blush */}
          <circle cx="49.5" cy="66" r="2.5" fill="#ff6a2b" opacity="0.55" />
          <circle cx="70.5" cy="66" r="2.5" fill="#ff6a2b" opacity="0.55" />
        </g>

        {/* rising embers */}
        <circle className="ember-particle" cx="52" cy="90" r="2.2" fill="#ffb020" style={{ '--dx': '-5px' } as CSSProperties} />
        <circle className="ember-particle" cx="66" cy="92" r="1.8" fill="#ff6a2b" style={{ '--dx': '5px', animationDelay: '0.6s' } as CSSProperties} />
        <circle className="ember-particle" cx="60" cy="94" r="1.6" fill="#ffd166" style={{ '--dx': '2px', animationDelay: '1.2s' } as CSSProperties} />
        <circle className="ember-particle" cx="47" cy="88" r="1.4" fill="#ffb020" style={{ '--dx': '-3px', animationDelay: '0.3s' } as CSSProperties} />
      </svg>
    </div>
  )
}
