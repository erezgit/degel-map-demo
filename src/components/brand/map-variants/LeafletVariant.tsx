import { MapContainer, TileLayer, CircleMarker, Circle } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { SUPPORTERS } from "@/data/supporters"

/**
 * V2 — react-leaflet with CartoDB Positron tiles.
 * Real raster tile map, clean light theme. Fixed view centered on Israel.
 */
export default function LeafletVariant() {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden ring-1 ring-[#E5E7EB]">
      <MapContainer
        center={[31.5, 35.0]}
        zoom={7}
        scrollWheelZoom={false}
        dragging={true}
        zoomControl={false}
        attributionControl={false}
        style={{
          width: "100%",
          height: "100%",
          background: "#F8FAFC",
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />
        {SUPPORTERS.map((s, i) =>
          s.pulse ? (
            <Circle
              key={i}
              center={[s.lat, s.lng]}
              radius={4500}
              pathOptions={{
                color: "#3B82C8",
                fillColor: "#3B82C8",
                fillOpacity: 0.7,
                weight: 1.5,
              }}
            />
          ) : (
            <CircleMarker
              key={i}
              center={[s.lat, s.lng]}
              radius={4}
              pathOptions={{
                color: "#FFFFFF",
                weight: 1,
                fillColor: "#1B2D52",
                fillOpacity: 0.92,
              }}
            />
          )
        )}
      </MapContainer>
    </div>
  )
}
