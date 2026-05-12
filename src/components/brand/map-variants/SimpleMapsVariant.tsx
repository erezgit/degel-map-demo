import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { SUPPORTERS } from "@/data/supporters"
import israelGeo from "@/data/israel.geo.json"

/**
 * V1 — react-simple-maps (D3-geo + SVG).
 * Clean, brandable SVG render of Israel including the West Bank.
 * Uses an embedded Natural Earth GeoJSON (full contiguous outline).
 */
export default function SimpleMapsVariant() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [35.0, 31.5],
          scale: 9500,
        }}
        width={500}
        height={700}
        style={{ width: "auto", height: "100%", maxHeight: "100%" }}
      >
        <Geographies geography={israelGeo as object}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#5C7BB0"
                stroke="#1B2D52"
                strokeWidth={0.4}
                style={{
                  default: {
                    outline: "none",
                    filter: "drop-shadow(0 6px 10px rgba(27,45,82,0.25))",
                  },
                  hover: { outline: "none", fill: "#5C7BB0" },
                  pressed: { outline: "none", fill: "#5C7BB0" },
                }}
              />
            ))
          }
        </Geographies>

        {SUPPORTERS.map((s, i) => (
          <Marker key={i} coordinates={[s.lng, s.lat]}>
            {s.pulse && (
              <>
                <circle r={6} fill="#3B82C8" opacity={0.18}>
                  <animate
                    attributeName="r"
                    values="4;9;4"
                    dur="2.2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  r={2.6}
                  fill="#3B82C8"
                  stroke="#FFFFFF"
                  strokeWidth={0.8}
                />
              </>
            )}
            {!s.pulse && (
              <circle
                r={2.2}
                fill="#1B2D52"
                opacity={0.92}
                stroke="#FFFFFF"
                strokeWidth={0.4}
              />
            )}
          </Marker>
        ))}
      </ComposableMap>
    </div>
  )
}
