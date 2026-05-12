// Shared region definitions used by the Map Explorer variants.
// Hebrew region labels + their canonical "fly-to" focal points.

export interface Region {
  id: "galilee" | "center" | "jerusalem" | "judea-samaria" | "negev"
  hebrew: string
  english: string
  // Center of mass: [lng, lat]
  center: [number, number]
  // Approximate radius in degrees for the deck.gl/zoom-in target
  zoomKm: number
}

export const REGIONS: Region[] = [
  {
    id: "galilee",
    hebrew: "הגליל",
    english: "Galilee",
    center: [35.4, 32.95],
    zoomKm: 50,
  },
  {
    id: "center",
    hebrew: "המרכז",
    english: "Center / Tel Aviv",
    center: [34.82, 32.07],
    zoomKm: 30,
  },
  {
    id: "jerusalem",
    hebrew: "ירושלים",
    english: "Jerusalem corridor",
    center: [35.21, 31.77],
    zoomKm: 30,
  },
  {
    id: "judea-samaria",
    hebrew: "יהודה ושומרון",
    english: "Judea & Samaria",
    center: [35.22, 31.95],
    zoomKm: 50,
  },
  {
    id: "negev",
    hebrew: "הנגב",
    english: "Negev",
    center: [34.85, 30.7],
    zoomKm: 80,
  },
]

// Major city pins used by the MapLibre fly-to variant.
export interface CityPin {
  id: string
  hebrew: string
  english: string
  lng: number
  lat: number
}

export const CITIES: CityPin[] = [
  { id: "tlv", hebrew: "תל אביב", english: "Tel Aviv", lng: 34.78, lat: 32.08 },
  { id: "jlm", hebrew: "ירושלים", english: "Jerusalem", lng: 35.21, lat: 31.77 },
  { id: "hfa", hebrew: "חיפה", english: "Haifa", lng: 34.99, lat: 32.79 },
  { id: "bsh", hebrew: "באר שבע", english: "Be'er Sheva", lng: 34.79, lat: 31.25 },
  { id: "eil", hebrew: "אילת", english: "Eilat", lng: 34.95, lat: 29.56 },
]
