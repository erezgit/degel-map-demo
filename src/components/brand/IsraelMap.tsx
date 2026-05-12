import { Suspense, lazy } from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type MapVariant =
  | "simple-maps" // V1 react-simple-maps (SVG via D3-geo)
  | "leaflet"     // V2 react-leaflet + CartoDB Positron tiles
  | "maplibre"    // V3 react-map-gl + MapLibre GL vector tiles
  | "visx"        // V4 @visx/geo (visx Mercator + custom SVG)
  | "globe"       // V5 react-globe.gl (3D Three.js globe)

interface IsraelMapProps {
  className?: string
  variant?: MapVariant
}

// Each variant lives in its own chunk — only the active one is loaded.
const SimpleMapsVariant = lazy(
  () => import("./map-variants/SimpleMapsVariant")
)
const LeafletVariant = lazy(() => import("./map-variants/LeafletVariant"))
const MapLibreVariant = lazy(
  () => import("./map-variants/MapLibreVariant")
)
const VisxVariant = lazy(() => import("./map-variants/VisxVariant"))
const GlobeVariant = lazy(() => import("./map-variants/GlobeVariant"))

function MapSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center text-[#6B7280]">
      <Loader2 className="size-6 animate-spin" />
    </div>
  )
}

export function IsraelMap({
  className,
  variant = "simple-maps",
}: IsraelMapProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Suspense fallback={<MapSkeleton />}>
        {variant === "simple-maps" && <SimpleMapsVariant />}
        {variant === "leaflet" && <LeafletVariant />}
        {variant === "maplibre" && <MapLibreVariant />}
        {variant === "visx" && <VisxVariant />}
        {variant === "globe" && <GlobeVariant />}
      </Suspense>
    </div>
  )
}
