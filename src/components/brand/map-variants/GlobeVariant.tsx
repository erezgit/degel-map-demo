import { useEffect, useRef, useState } from "react"
import Globe from "react-globe.gl"
import { SUPPORTERS } from "@/data/supporters"

/**
 * V5 — react-globe.gl (Three.js).
 * Rotating 3D globe centered on Israel with the 62 supporter points lit up.
 * Uses Natural Earth country boundaries (the library's default — full
 * contiguous Israel including the West Bank).
 */
export default function GlobeVariant() {
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<unknown>(null)
  const [dims, setDims] = useState({ w: 500, h: 500 })

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect
      setDims({ w: Math.floor(cr.width), h: Math.floor(cr.height) })
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    // Point the camera at Israel and gently auto-rotate
    if (!globeRef.current) return
    type GR = {
      pointOfView: (v: object, ms: number) => void
      controls: () => {
        autoRotate: boolean
        autoRotateSpeed: number
        enableZoom: boolean
      }
    }
    const g = globeRef.current as GR
    g.pointOfView({ lat: 31.5, lng: 35.0, altitude: 1.4 }, 0)
    const c = g.controls()
    c.autoRotate = true
    c.autoRotateSpeed = 0.4
    c.enableZoom = false
  }, [dims])

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center bg-[#0F1B36] rounded-lg overflow-hidden"
    >
      <Globe
        ref={globeRef as never}
        width={dims.w}
        height={dims.h}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#3B82C8"
        atmosphereAltitude={0.18}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        pointsData={SUPPORTERS}
        pointLat={(d: object) => (d as { lat: number }).lat}
        pointLng={(d: object) => (d as { lng: number }).lng}
        pointAltitude={(d: object) =>
          (d as { pulse: boolean }).pulse ? 0.06 : 0.02
        }
        pointRadius={(d: object) =>
          (d as { pulse: boolean }).pulse ? 0.4 : 0.25
        }
        pointColor={(d: object) =>
          (d as { pulse: boolean }).pulse ? "#3B82C8" : "#E8F0FA"
        }
        pointResolution={6}
      />
    </div>
  )
}
