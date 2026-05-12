import { Suspense, lazy, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageShell } from "@/components/brand/PageShell"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowRight } from "lucide-react"

type ExplorerVariant =
  | "three-fiber" // V4 default
  | "deck"
  | "kepler"
  | "cesium"
  | "maplibre-fly"

const DeckGLVariant = lazy(
  () => import("@/components/brand/explorer-variants/DeckGLVariant")
)
const KeplerVariant = lazy(
  () => import("@/components/brand/explorer-variants/KeplerVariant")
)
const CesiumVariant = lazy(
  () => import("@/components/brand/explorer-variants/CesiumVariant")
)
const ThreeFiberVariant = lazy(
  () => import("@/components/brand/explorer-variants/ThreeFiberVariant")
)
const MapLibreFlyVariant = lazy(
  () => import("@/components/brand/explorer-variants/MapLibreFlyVariant")
)

const TABS: Array<{
  value: ExplorerVariant
  label: string
  caption: string
}> = [
  {
    value: "three-fiber",
    label: "Three.js · תלת-ממד",
    caption:
      "מסה תלת-ממדית של ישראל ב-WebGL טהור עם react-three-fiber. הצפת הקו החיצוני, מצלמת מסלול, ספירות זוהרות לתומכים פעילים, וטולטיפ בריחוף. הכי 'wow' מהחמישה — מציג מה אפשר בעולם של גרפיקה אינטראקטיבית.",
  },
  {
    value: "deck",
    label: "deck.gl · נתונים",
    caption:
      "מנוע ה-WebGL של Uber לויזואליזציית נתונים. שילוב שכבת מתאר, היסטוגרמת משושים תלת-ממדית של צפיפות תומכים, ושכבת נקודות. לחץ על כפתור אזור לטיסה חלקה.",
  },
  {
    value: "kepler",
    label: "kepler.gl · לוח-בקרה",
    caption:
      "סגנון לוח-בקרה בהשראת kepler.gl: סרגל-צד עם הפעלת שכבות, מסננים, ופקדי רדיוס. בנוי על אותו מנוע deck.gl ש-kepler משתמש בו — אותו מראה, ללא נטל Redux של 1.2MB.",
  },
  {
    value: "cesium",
    label: "Cesium · גלובוס",
    caption:
      "גלובוס תלת-ממדי מלא עם Cesium. ישראל ממוקמת על כדור-הארץ עם הטיית מצלמה ריאליסטית. לחץ על תומך — המצלמה גולשת לתצוגת קרובה. ללא מפתח Ion (טופוגרפיה שטוחה, אריחי OSM ציבוריים).",
  },
  {
    value: "maplibre-fly",
    label: "MapLibre · טיסה",
    caption:
      "מפה וקטורית אמיתית (OpenFreeMap) עם אנימציות flyTo: לחץ עיר → המצלמה מטה ל-60°, מתקרבת ל-zoom 11, ופותחת popup. ללא מפתח API. הקרוב ביותר ל'UX של מפות מודרניות'.",
  },
]

export function MapExplorerPage() {
  const navigate = useNavigate()
  const [variant, setVariant] = useState<ExplorerVariant>("three-fiber")
  const active = TABS.find((t) => t.value === variant)!

  return (
    <PageShell className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1B2D52]/5 px-3 py-1 mb-3 ring-1 ring-[#1B2D52]/10">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#3B82C8]" />
              <span className="text-[11px] font-semibold text-[#1B2D52] tracking-wide">
                חוקרי המפה · אינטראקטיבי · 3D
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0F1B36]">
              חוקרי המפה
            </h1>
            <p className="mt-2 text-base lg:text-lg text-[#4B5563]">
              חמש ספריות מפה אינטראקטיביות · 62 תומכים · אותם נתונים, מנועים שונים
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="self-start sm:self-end"
          >
            חזרה לבית
            <ArrowRight className="size-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs
          value={variant}
          onValueChange={(v) => setVariant(v as ExplorerVariant)}
          dir="rtl"
        >
          <TabsList className="w-full flex flex-wrap h-auto p-1 gap-1">
            {TABS.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="flex-1 min-w-[140px] text-xs sm:text-sm py-2"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Map canvas */}
        <div className="mt-5 h-[60vh] min-h-[480px] max-h-[700px]">
          <Suspense fallback={<VariantSkeleton />}>
            {variant === "three-fiber" && <ThreeFiberVariant />}
            {variant === "deck" && <DeckGLVariant />}
            {variant === "kepler" && <KeplerVariant />}
            {variant === "cesium" && <CesiumVariant />}
            {variant === "maplibre-fly" && <MapLibreFlyVariant />}
          </Suspense>
        </div>

        {/* Caption card */}
        <div className="mt-5 rounded-lg border border-[#E5E7EB] bg-white p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-0.5">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-[#1B2D52]/5 text-[#1B2D52] text-sm font-bold ring-1 ring-[#1B2D52]/10">
                {TABS.findIndex((t) => t.value === variant) + 1}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-[#0F1B36] mb-1">
                {active.label}
              </h2>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {active.caption}
              </p>
            </div>
          </div>
        </div>

        {/* Sub-note */}
        <p className="mt-6 text-xs text-[#6B7280] text-center">
          כל ספרייה נטענת רק כאשר הטאב שלה נבחר (lazy-load). בחרו ספרייה למעלה כדי לראות את אותם 62 התומכים בצורה אחרת.
        </p>
      </div>
    </PageShell>
  )
}

function VariantSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F8FAFC] rounded-lg ring-1 ring-[#E5E7EB]">
      <div className="flex flex-col items-center gap-3 text-[#6B7280]">
        <Loader2 className="size-8 animate-spin" />
        <span className="text-xs font-semibold">טוען את הספרייה…</span>
      </div>
    </div>
  )
}
