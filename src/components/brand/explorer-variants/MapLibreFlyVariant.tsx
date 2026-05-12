import { useEffect, useRef, useMemo, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { SUPPORTERS } from "@/data/supporters"
import { CITIES } from "@/data/regions"

/**
 * V5 — MapLibre GL JS with fly-to camera animations.
 * Click a city pin → camera tilts to 60°, flies to lat/lng, opens popup.
 * Vector real-map tiles from OpenFreeMap (positron) — no API key needed.
 */

export default function MapLibreFlyVariant() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [activeCity, setActiveCity] = useState<string | null>(null)

  const supporterGeoJson = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: SUPPORTERS.map((s) => ({
        type: "Feature" as const,
        properties: { pulse: s.pulse },
        geometry: { type: "Point" as const, coordinates: [s.lng, s.lat] },
      })),
    }),
    []
  )

  useEffect(() => {
    if (!containerRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: [35.0, 31.5],
      zoom: 6.4,
      pitch: 30,
      bearing: 0,
      attributionControl: false,
    })

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: true, showZoom: true }),
      "top-right"
    )
    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-left"
    )

    map.on("load", () => {
      // Supporter dots
      map.addSource("supporters", { type: "geojson", data: supporterGeoJson })
      map.addLayer({
        id: "supporters-circles",
        type: "circle",
        source: "supporters",
        paint: {
          "circle-radius": [
            "case",
            ["==", ["get", "pulse"], true],
            7,
            4,
          ],
          "circle-color": [
            "case",
            ["==", ["get", "pulse"], true],
            "#3B82C8",
            "#1B2D52",
          ],
          "circle-stroke-color": "#FFFFFF",
          "circle-stroke-width": 1.4,
          "circle-opacity": 0.95,
        },
      })

      // Optional 3D extrusion on hill terrain (purely visual)
      map.setPitch(30)
    })

    mapRef.current = map

    return () => {
      map.remove()
    }
  }, [supporterGeoJson])

  const flyToCity = (cityId: string) => {
    const map = mapRef.current
    if (!map) return
    const city = CITIES.find((c) => c.id === cityId)
    if (!city) return

    setActiveCity(cityId)

    map.flyTo({
      center: [city.lng, city.lat],
      zoom: 11,
      pitch: 60,
      bearing: -20,
      speed: 1.2,
      curve: 1.6,
      essential: true,
    })

    // Pop up a label once the fly is done
    map.once("moveend", () => {
      const popup = new maplibregl.Popup({
        closeButton: true,
        offset: 18,
        anchor: "bottom",
      })
        .setLngLat([city.lng, city.lat])
        .setHTML(
          `<div style="font-family: inherit; padding: 4px 6px;">
            <div style="font-weight: 700; color: #1B2D52; font-size: 13px;">${city.hebrew}</div>
            <div style="color: #6B7280; font-size: 11px; margin-top: 2px;">קמפיין פעיל באזור</div>
          </div>`
        )
        .addTo(map)
      popup.on("close", () => setActiveCity(null))
    })
  }

  const resetView = () => {
    const map = mapRef.current
    if (!map) return
    setActiveCity(null)
    map.flyTo({
      center: [35.0, 31.5],
      zoom: 6.4,
      pitch: 30,
      bearing: 0,
      speed: 1.4,
      curve: 1.5,
      essential: true,
    })
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden ring-1 ring-[#E5E7EB]">
      <div ref={containerRef} className="absolute inset-0" />

      {/* City pins */}
      <div className="absolute top-4 start-4 z-10 flex flex-col gap-2">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-[#1B2D52] bg-white/90 backdrop-blur rounded px-2 py-1 ring-1 ring-[#E5E7EB]">
          טוס לעיר
        </div>
        {CITIES.map((c) => (
          <button
            key={c.id}
            onClick={() => flyToCity(c.id)}
            className={`text-xs font-semibold rounded-md backdrop-blur ring-1 px-3 py-1.5 transition-all shadow-sm ${
              activeCity === c.id
                ? "bg-[#3B82C8] text-white ring-[#3B82C8]"
                : "bg-white/90 ring-[#E5E7EB] text-[#1B2D52] hover:bg-[#3B82C8] hover:text-white hover:ring-[#3B82C8]"
            }`}
          >
            {c.hebrew}
          </button>
        ))}
        <button
          onClick={resetView}
          className="text-xs font-semibold rounded-md bg-[#1B2D52] text-white hover:bg-[#0F1B36] px-3 py-1.5 transition-all shadow-sm"
        >
          תצוגת על
        </button>
      </div>

      <div className="absolute bottom-4 end-4 z-10 bg-white/95 backdrop-blur text-[#1B2D52] text-xs px-3 py-2 rounded ring-1 ring-[#E5E7EB] max-w-[220px] text-end">
        אריחים: OpenFreeMap · ללא מפתח API
      </div>
    </div>
  )
}
