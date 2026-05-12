import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageShell } from "@/components/brand/PageShell"
import { StepIndicator } from "@/components/brand/StepIndicator"
import { IsraelMap, type MapVariant } from "@/components/brand/IsraelMap"
import { Check, Clock, RotateCcw, TrendingUp, Users, MapPin } from "lucide-react"

const CURRENT = 12847
const TARGET = 150000
const PCT = (CURRENT / TARGET) * 100

const INVITEES = [
  {
    initials: "ר.כ",
    name: "רותם כהן",
    city: "תל אביב-יפו",
    status: "approved" as const,
    when: "לפני 2 ימים",
  },
  {
    initials: "א.ל",
    name: "אופיר לוי",
    city: "ראשון לציון",
    status: "approved" as const,
    when: "לפני 3 ימים",
  },
  {
    initials: "ש.מ",
    name: "שירה מזרחי",
    city: "חיפה",
    status: "pending" as const,
    when: "אתמול",
  },
]

const VARIANT_LABELS: Array<{ value: MapVariant; label: string }> = [
  { value: "simple-maps", label: "SVG פשוט" },
  { value: "leaflet", label: "אריחים בהירים" },
  { value: "maplibre", label: "MapLibre וקטור" },
  { value: "visx", label: "visx" },
  { value: "globe", label: "גלובוס תלת-ממדי" },
]

export function StatusPage() {
  const navigate = useNavigate()
  const [variant, setVariant] = useState<MapVariant>("simple-maps")

  return (
    <PageShell bgVariant="subtle">
      {/* Header is 65px (h-16 + 1px border). Content = 100vh - 65px. */}
      <div className="h-[calc(100vh-65px)] overflow-hidden flex flex-col">
        <div className="flex-1 max-w-6xl w-full mx-auto px-6 lg:px-10 pt-4 pb-3 flex flex-col min-h-0">
          {/* Compact header — step indicator + title + status badge on one row */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <StepIndicator current={4} total={4} />
            <Badge variant="success" className="px-2.5 py-1 text-xs shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              מתעדכן עכשיו
            </Badge>
          </div>

          <div className="mb-3">
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0F1B36] leading-tight">
              הסטטוס שלך
            </h1>
            <p className="text-sm text-[#4B5563] mt-0.5">
              התומכים נספרים בזמן אמת. כל הצטרפות חדשה — דגל חדש על המפה.
            </p>
          </div>

          {/* Two-column layout — map dominates ~62% on lg+ */}
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 flex-1 min-h-0">
            {/* Map column (left visually in RTL = first in flow) */}
            <div className="lg:col-span-5 min-h-0 flex flex-col">
              <Card className="flex-1 overflow-hidden flex flex-col">
                <CardContent className="p-4 lg:p-5 flex flex-col h-full min-h-0">
                  {/* Variant tabs */}
                  <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
                    <div>
                      <div className="text-sm font-semibold text-[#1B2D52]">
                        מפת התומכים
                      </div>
                      <p className="text-[11px] text-[#6B7280]">
                        כל נקודה — תומכ/ה שהצטרף/ה לתנועה
                      </p>
                    </div>
                    <Tabs
                      value={variant}
                      onValueChange={(v) => setVariant(v as MapVariant)}
                    >
                      <TabsList className="h-8">
                        {VARIANT_LABELS.map((v) => (
                          <TabsTrigger
                            key={v.value}
                            value={v.value}
                            className="text-[11px] px-2 py-0.5 h-7"
                          >
                            {v.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="flex-1 min-h-0 rounded-xl overflow-hidden bg-white ring-1 ring-[#E5E7EB]">
                    <IsraelMap variant={variant} />
                  </div>

                  {/* Legend */}
                  <div className="mt-2 flex items-center justify-center gap-5 text-[11px] text-[#6B7280]">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#1B2D52]" />
                      תומכ/ת
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#3B82C8] ring-2 ring-[#3B82C8]/30" />
                      תומכ/ת מובלט/ת
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right column — status + invitees + share, stacked + compact */}
            <div className="lg:col-span-3 flex flex-col gap-3 min-h-0 overflow-hidden">
              {/* Counter card */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="size-4 text-[#3B82C8]" />
                    <span className="text-xs font-semibold text-[#1B2D52]">
                      התקדמות לעבר היעד
                    </span>
                  </div>

                  <div
                    className="flex items-end gap-2 mt-1 flex-wrap"
                    dir="ltr"
                  >
                    <span className="text-3xl font-extrabold tracking-tight text-[#1B2D52] tabular-nums leading-none">
                      {CURRENT.toLocaleString("en-US")}
                    </span>
                    <span className="text-lg font-bold text-[#6B7280] tabular-nums leading-none pb-0.5">
                      / {TARGET.toLocaleString("en-US")}
                    </span>
                  </div>

                  <div className="mt-3">
                    <Progress value={PCT} className="h-2" />
                    <div className="mt-1.5 flex items-center justify-between text-[11px]">
                      <span className="text-[#6B7280]">
                        <span className="font-semibold text-[#1B2D52]">
                          {PCT.toFixed(1)}%
                        </span>{" "}
                        מהיעד
                      </span>
                      <span className="text-[#6B7280]">
                        נותרו{" "}
                        {(TARGET - CURRENT).toLocaleString("he-IL")} תומכים
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#E5E7EB] grid grid-cols-3 gap-2">
                    <MiniStat icon={Users} label="היום" value="+247" />
                    <MiniStat icon={MapPin} label="ערים" value="147" />
                    <MiniStat
                      icon={TrendingUp}
                      label="שבוע"
                      value="+18%"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Invitees */}
              <Card className="flex-1 min-h-0 overflow-hidden flex flex-col">
                <CardContent className="p-4 flex flex-col min-h-0 flex-1">
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <div>
                      <div className="text-xs font-semibold text-[#1B2D52]">
                        החברים שהזמנת
                      </div>
                      <p className="text-[11px] text-[#6B7280] mt-0.5">
                        {INVITEES.filter((i) => i.status === "approved").length}{" "}
                        אישרו ·{" "}
                        {INVITEES.filter((i) => i.status === "pending").length}{" "}
                        בהמתנה
                      </p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {INVITEES.length} סה״כ
                    </Badge>
                  </div>

                  <Separator className="my-2" />

                  <ul className="space-y-1.5 overflow-y-auto flex-1 min-h-0">
                    {INVITEES.map((invitee, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 p-1.5 -mx-1.5 rounded-md hover:bg-[#F8FAFC] transition-colors"
                      >
                        <Avatar className="h-8 w-8 ring-1 ring-white shadow-sm">
                          <AvatarFallback className="text-[10px]">
                            {invitee.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-[#0F1B36] truncate">
                            {invitee.name}
                          </div>
                          <div className="text-[10px] text-[#6B7280] mt-0.5 truncate">
                            {invitee.city} · {invitee.when}
                          </div>
                        </div>
                        {invitee.status === "approved" ? (
                          <Badge variant="success" className="text-[10px]">
                            <Check className="size-2.5" />
                            הצטרפ/ה
                          </Badge>
                        ) : (
                          <Badge variant="warning" className="text-[10px]">
                            <Clock className="size-2.5" />
                            בהמתנה
                          </Badge>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2 rounded-md bg-[#F8FAFC] border border-dashed border-[#E5E7EB] p-2 text-center">
                    <div className="text-[11px] font-semibold text-[#1B2D52]">
                      הזמינו עוד חבר/ה
                    </div>
                    <p className="text-[10px] text-[#6B7280] mt-0.5">
                      הקישור שלכם:{" "}
                      <span
                        className="font-mono text-[#1B2D52]"
                        dir="ltr"
                      >
                        degel.il/i/A3F9-Q2B7
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer — restart action */}
          <div className="mt-3 flex items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="group h-8 text-xs"
            >
              <RotateCcw className="size-3.5 transition-transform group-hover:-rotate-180 duration-500" />
              התחל מחדש
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

interface MiniStatProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}

function MiniStat({ icon: Icon, label, value }: MiniStatProps) {
  return (
    <div>
      <div className="flex items-center gap-1 text-[9px] uppercase tracking-wide text-[#6B7280] mb-0.5 font-semibold">
        <Icon className="size-2.5" />
        {label}
      </div>
      <div className="text-base font-extrabold text-[#1B2D52] tabular-nums leading-none">
        {value}
      </div>
    </div>
  )
}
