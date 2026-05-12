import { cn } from "@/lib/utils"

interface IsraelMapProps {
  className?: string
  dotCount?: number
}

/**
 * Stylized outline of Israel. Hand-rolled SVG path — approximation, not geographic accuracy.
 * Dots are scattered across the polygon for the "supporter flags" effect.
 */
export function IsraelMap({ className, dotCount = 47 }: IsraelMapProps) {
  // Pseudo-random dots seeded so they don't reshuffle on re-render.
  // Each entry: [x, y, radius, isPulse]
  const dots = generateDots(dotCount)

  return (
    <div className={cn("relative w-full", className)}>
      <svg
        viewBox="0 0 360 700"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="מפת ישראל"
      >
        <defs>
          <linearGradient id="land-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#EEF2F7" />
          </linearGradient>
          <radialGradient id="dot-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B82C8" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#3B82C8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3B82C8" stopOpacity="0" />
          </radialGradient>
          <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="#1B2D52"
              floodOpacity="0.08"
            />
          </filter>
        </defs>

        {/* Stylized outline of Israel — approximate, narrow north-south shape */}
        <path
          d="
            M 178 18
            L 198 24
            L 210 38
            L 212 60
            L 226 78
            L 232 96
            L 226 112
            L 218 126
            L 224 144
            L 244 156
            L 252 172
            L 258 196
            L 252 218
            L 244 238
            L 238 262
            L 232 284
            L 228 308
            L 222 332
            L 214 358
            L 208 384
            L 200 412
            L 188 440
            L 176 468
            L 160 498
            L 144 528
            L 130 558
            L 118 590
            L 108 620
            L 100 652
            L 92 678
            L 86 686
            L 80 678
            L 86 658
            L 96 626
            L 108 596
            L 124 564
            L 138 534
            L 150 504
            L 158 478
            L 162 452
            L 160 426
            L 156 400
            L 150 374
            L 142 350
            L 132 326
            L 122 302
            L 114 280
            L 110 258
            L 112 236
            L 120 214
            L 128 192
            L 138 170
            L 144 148
            L 146 126
            L 142 106
            L 138 86
            L 142 66
            L 152 48
            L 162 32
            L 178 18 Z
          "
          fill="url(#land-fill)"
          stroke="#1B2D52"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeLinejoin="round"
          filter="url(#soft-shadow)"
        />

        {/* Inland accents — Sea of Galilee, Dead Sea shapes */}
        <ellipse cx="222" cy="138" rx="9" ry="13" fill="#CFE0EE" opacity="0.7" />
        <ellipse cx="212" cy="332" rx="8" ry="22" fill="#CFE0EE" opacity="0.7" />

        {/* Supporter dots */}
        {dots.map(([x, y, r, isPulse], i) => (
          <g key={i}>
            {isPulse && (
              <circle cx={x} cy={y} r={r * 4} fill="url(#dot-glow)">
                <animate
                  attributeName="opacity"
                  values="0.6;0.2;0.6"
                  dur={`${2.4 + (i % 5) * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )}
            <circle
              cx={x}
              cy={y}
              r={r}
              fill="#1B2D52"
              opacity={isPulse ? 1 : 0.85}
            />
          </g>
        ))}

        {/* "You are here" indicator — a single highlighted dot near Tel Aviv */}
        <g>
          <circle cx="166" cy="266" r="12" fill="url(#dot-glow)">
            <animate
              attributeName="r"
              values="10;16;10"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="166" cy="266" r="5" fill="#3B82C8" stroke="#fff" strokeWidth="2" />
        </g>
      </svg>
    </div>
  )
}

function generateDots(count: number): Array<[number, number, number, boolean]> {
  // Deterministic pseudo-random points roughly inside the Israel polygon bounding curve.
  // Hand-tuned to look natural — denser in center (urban), sparser at extremes.
  const seed = 91347
  const dots: Array<[number, number, number, boolean]> = []
  for (let i = 0; i < count; i++) {
    const r1 = pseudo(seed + i * 17)
    const r2 = pseudo(seed + i * 31 + 5)
    const r3 = pseudo(seed + i * 47 + 11)

    // Y range: 30 - 680, biased to populated areas (north + center)
    const yBand = r1
    let y: number
    if (yBand < 0.35) y = 60 + r2 * 120 // Galilee/north
    else if (yBand < 0.7) y = 200 + r2 * 120 // Center/Tel Aviv-Jerusalem belt
    else if (yBand < 0.9) y = 360 + r2 * 120 // Negev north
    else y = 520 + r2 * 140 // Negev/Eilat

    // X: narrow near top/bottom, wider in middle
    let xCenter: number
    let xSpread: number
    if (y < 200) {
      xCenter = 180 + (y - 60) * 0.2
      xSpread = 40 + (y - 60) * 0.15
    } else if (y < 380) {
      xCenter = 200 - (y - 200) * 0.15
      xSpread = 55
    } else if (y < 540) {
      xCenter = 180 - (y - 380) * 0.2
      xSpread = 38 - (y - 380) * 0.05
    } else {
      xCenter = 130 - (y - 540) * 0.25
      xSpread = 18
    }
    const x = xCenter + (r3 - 0.5) * xSpread * 2

    const radius = 2 + (i % 4 === 0 ? 1.5 : 0) + r1 * 1
    const isPulse = i % 7 === 0
    dots.push([Math.round(x), Math.round(y), Number(radius.toFixed(1)), isPulse])
  }
  return dots
}

function pseudo(seed: number): number {
  // Mulberry32-style hash → [0,1)
  let t = (seed + 0x6d2b79f5) | 0
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}
