import { useMemo } from "react"
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  ZoomControl,
} from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import L from "leaflet"
import "leaflet.markercluster" // augments the L namespace with MarkerCluster
import "leaflet/dist/leaflet.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import { SUPPORTERS } from "@/data/supporters"
import { cn } from "@/lib/utils"

export type TileVariant =
  | "positron"
  | "voyager"
  | "alidade"
  | "toner"
  | "esri"

interface TileSpec {
  url: string
  attribution: string
  maxZoom: number
}

const TILE_VARIANTS: Record<TileVariant, TileSpec> = {
  positron: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; OpenStreetMap',
    maxZoom: 19,
  },
  voyager: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; OpenStreetMap',
    maxZoom: 19,
  },
  alidade: {
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; OpenStreetMap',
    maxZoom: 20,
  },
  toner: {
    url: "https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; Stamen',
    maxZoom: 20,
  },
  esri: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri",
    maxZoom: 16,
  },
}

interface IsraelMapProps {
  variant?: TileVariant
  className?: string
}

/**
 * Single Leaflet map with 5 interchangeable tile-layer skins.
 * Only the `<TileLayer>` URL changes between variants — the supporter
 * cluster overlay, dot styling, viewport, and interaction model are
 * identical across all five.
 */
export function IsraelMap({ variant = "positron", className }: IsraelMapProps) {
  const tile = TILE_VARIANTS[variant]

  // Build city index once (lat/lng bucket → city label).
  useMemo(buildCityIndex, [])

  return (
    <div className={cn("w-full h-full", className)}>
      <MapContainer
        center={[31.4, 35.0]}
        zoom={8}
        minZoom={7}
        maxZoom={12}
        scrollWheelZoom={false}
        dragging={true}
        doubleClickZoom={true}
        zoomControl={false}
        attributionControl={true}
        style={{ width: "100%", height: "100%", background: "#F8FAFC" }}
        worldCopyJump={false}
      >
        {/* key={variant} forces tile-pane swap when the user changes skin */}
        <TileLayer
          key={variant}
          url={tile.url}
          attribution={tile.attribution}
          maxZoom={tile.maxZoom}
          subdomains={variant === "esri" ? ["server"] : "abcd"}
        />

        <ZoomControl position="topleft" />

        <MarkerClusterGroup
          chunkedLoading
          showCoverageOnHover={false}
          spiderfyOnMaxZoom={false}
          disableClusteringAtZoom={11}
          maxClusterRadius={55}
          iconCreateFunction={createClusterIcon}
        >
          {SUPPORTERS.map((s, i) => (
            <CircleMarker
              key={i}
              center={[s.lat, s.lng]}
              radius={s.pulse ? 6 : 4}
              pathOptions={{
                color: "#FFFFFF",
                weight: 1.5,
                fillColor: s.pulse ? "#3B82C8" : "#1B2D52",
                fillOpacity: 0.95,
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -6]}
                opacity={1}
                className="degel-leaflet-tip"
                sticky
              >
                <span>תומך אחד</span>
              </Tooltip>
            </CircleMarker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}

/**
 * Custom cluster icon — navy filled circle, white count text, brand-aligned.
 * Three size tiers: small (<10), medium (10-25), large (25+).
 * The bubble itself carries a `title` attribute so hover/touch shows the
 * "X supporters in this area · cities" tooltip natively.
 */
function createClusterIcon(cluster: L.MarkerCluster): L.DivIcon {
  const count = cluster.getChildCount()
  let size = 36
  let tier = "sm"
  if (count >= 25) {
    size = 56
    tier = "lg"
  } else if (count >= 10) {
    size = 46
    tier = "md"
  }
  const cities = collectClusterCities(cluster)
  const title =
    `${count} תומכים באזור זה` +
    (cities.length ? `\n${cities.join(" · ")}` : "")
  const html = `
    <div class="degel-cluster degel-cluster-${tier}" style="width:${size}px;height:${size}px" title="${escapeHtml(title)}">
      <span class="degel-cluster-num">${count}</span>
      <span class="degel-cluster-label">תומכים</span>
    </div>
  `
  return L.divIcon({
    html,
    className: "degel-cluster-wrap",
    iconSize: L.point(size, size, true),
  })
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

/**
 * Walk the cluster's children and collect the unique city labels they touch
 * (based on a coarse lat/lng bucket → city-name index built once at startup).
 */
function collectClusterCities(cluster: L.MarkerCluster): string[] {
  const seen = new Set<string>()
  for (const m of cluster.getAllChildMarkers()) {
    const ll = m.getLatLng()
    const key = bucketKey(ll.lat, ll.lng)
    const city = CITY_INDEX.get(key)
    if (city) seen.add(city)
  }
  return Array.from(seen).slice(0, 4)
}

// ─── City index (lat/lng bucket → city label) ────────────────────────────────

const CITY_INDEX = new Map<string, string>()
function bucketKey(lat: number, lng: number): string {
  return `${Math.round(lat * 10) / 10}|${Math.round(lng * 10) / 10}`
}
function addCity(lat: number, lng: number, name: string) {
  // Tag the 3x3 bucket grid around each landmark so nearby supporter dots
  // adopt the city label even if they land 0.05° off.
  for (let dLat = -0.1; dLat <= 0.1 + 1e-9; dLat += 0.1) {
    for (let dLng = -0.1; dLng <= 0.1 + 1e-9; dLng += 0.1) {
      const k = bucketKey(lat + dLat, lng + dLng)
      if (!CITY_INDEX.has(k)) CITY_INDEX.set(k, name)
    }
  }
}
function buildCityIndex(): null {
  if (CITY_INDEX.size > 0) return null
  addCity(32.08, 34.78, "תל אביב")
  addCity(32.07, 34.84, "רמת גן")
  addCity(32.09, 34.88, "פתח תקווה")
  addCity(31.96, 34.80, "ראשון לציון")
  addCity(31.78, 35.22, "ירושלים")
  addCity(32.79, 34.99, "חיפה")
  addCity(32.83, 35.07, "קריות")
  addCity(32.70, 35.30, "נצרת")
  addCity(32.92, 35.30, "כרמיאל")
  addCity(32.79, 35.53, "טבריה")
  addCity(32.32, 34.85, "נתניה")
  addCity(32.43, 34.92, "חדרה")
  addCity(32.17, 34.91, "כפר סבא")
  addCity(31.90, 34.81, "רחובות")
  addCity(31.89, 35.01, "מודיעין")
  addCity(31.74, 34.99, "בית שמש")
  addCity(31.25, 34.79, "באר שבע")
  addCity(31.67, 34.57, "אשקלון")
  addCity(31.80, 34.64, "אשדוד")
  addCity(30.60, 34.80, "הנגב")
  addCity(29.56, 34.95, "אילת")
  addCity(31.78, 35.30, "מעלה אדומים")
  addCity(31.65, 35.17, "גוש עציון")
  addCity(32.11, 35.18, "אריאל")
  addCity(32.00, 35.25, "בית אל")
  addCity(32.05, 35.29, "שילה")
  return null
}
