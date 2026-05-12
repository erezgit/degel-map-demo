import { Mercator } from "@visx/geo"
import { SUPPORTERS } from "@/data/supporters"
import israelGeo from "@/data/israel.geo.json"
import type { FeatureCollection } from "geojson"

const W = 500
const H = 700

/**
 * V4 — @visx/geo (Airbnb visx primitives).
 * Pure SVG with D3-geo under the hood. Same data as V1 but with custom styling
 * (paper-fold effect via filters) to differentiate.
 */
export default function VisxVariant() {
  const features = israelGeo as FeatureCollection
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-auto max-h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="visx-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A6BBDB" />
            <stop offset="100%" stopColor="#1B2D52" />
          </linearGradient>
          <filter id="visx-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="6"
              floodColor="#1B2D52"
              floodOpacity="0.25"
            />
          </filter>
          <radialGradient id="visx-pulse-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B82C8" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#3B82C8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3B82C8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <Mercator<FeatureCollection["features"][number]>
          data={features.features}
          scale={9500}
          translate={[W / 2 - 35, H / 2 + 60]}
          center={[35.0, 31.5]}
        >
          {({ features: paths, projection }) => (
            <g>
              {paths.map(({ path }, i) => (
                <path
                  key={i}
                  d={path || ""}
                  fill="url(#visx-grad)"
                  stroke="#1B2D52"
                  strokeWidth={0.6}
                  filter="url(#visx-shadow)"
                />
              ))}
              {SUPPORTERS.map((s, i) => {
                const p = projection([s.lng, s.lat])
                if (!p) return null
                const [x, y] = p
                return (
                  <g key={i} transform={`translate(${x},${y})`}>
                    {s.pulse && (
                      <>
                        <circle r={10} fill="url(#visx-pulse-glow)">
                          <animate
                            attributeName="opacity"
                            values="0.6;0.2;0.6"
                            dur={`${2.2 + (i % 5) * 0.3}s`}
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle
                          r={3.2}
                          fill="#3B82C8"
                          stroke="#FFFFFF"
                          strokeWidth={1}
                        />
                      </>
                    )}
                    {!s.pulse && (
                      <circle
                        r={2.4}
                        fill="#FFFFFF"
                        stroke="#0F1B36"
                        strokeWidth={0.6}
                        opacity={0.95}
                      />
                    )}
                  </g>
                )
              })}
            </g>
          )}
        </Mercator>
      </svg>
    </div>
  )
}
