import { useMemo } from "react"
import Map, { Source, Layer } from "react-map-gl/maplibre"
import type { CircleLayerSpecification } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { SUPPORTERS } from "@/data/supporters"

/**
 * V3 — react-map-gl + MapLibre GL JS (vector tiles).
 * Sharper than raster Leaflet. Uses the free demo MapLibre style.
 */
export default function MapLibreVariant() {
  const geojson = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: SUPPORTERS.map((s) => ({
        type: "Feature" as const,
        properties: { pulse: s.pulse },
        geometry: {
          type: "Point" as const,
          coordinates: [s.lng, s.lat],
        },
      })),
    }),
    []
  )

  const dotLayer: CircleLayerSpecification = {
    id: "supporters",
    type: "circle",
    source: "supporters",
    filter: ["!=", ["get", "pulse"], true],
    paint: {
      "circle-radius": 4,
      "circle-color": "#1B2D52",
      "circle-stroke-color": "#FFFFFF",
      "circle-stroke-width": 1,
      "circle-opacity": 0.95,
    },
  }
  const pulseLayer: CircleLayerSpecification = {
    id: "supporters-pulse",
    type: "circle",
    source: "supporters",
    filter: ["==", ["get", "pulse"], true],
    paint: {
      "circle-radius": 6,
      "circle-color": "#3B82C8",
      "circle-stroke-color": "#FFFFFF",
      "circle-stroke-width": 1.4,
      "circle-opacity": 0.95,
    },
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden ring-1 ring-[#E5E7EB]">
      <Map
        initialViewState={{
          longitude: 35.0,
          latitude: 31.5,
          zoom: 6.4,
        }}
        mapStyle="https://demotiles.maplibre.org/style.json"
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
        dragRotate={false}
        touchPitch={false}
      >
        <Source id="supporters" type="geojson" data={geojson}>
          <Layer {...dotLayer} />
          <Layer {...pulseLayer} />
        </Source>
      </Map>
    </div>
  )
}
