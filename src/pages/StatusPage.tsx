import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PageShell } from "@/components/brand/PageShell"
import { StepIndicator } from "@/components/brand/StepIndicator"
import { IsraelMap } from "@/components/brand/IsraelMap"
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

export function StatusPage() {
  const navigate = useNavigate()

  return (
    <PageShell bgVariant="subtle">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <StepIndicator current={4} total={4} className="mb-10" />

        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div className="space-y-3 max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F1B36] leading-tight text-balance">
              הסטטוס שלך
            </h1>
            <p className="text-lg text-[#4B5563] leading-relaxed">
              התומכים נספרים בזמן אמת. כל הצטרפות חדשה — דגל חדש על
              המפה.
            </p>
          </div>
          <Badge variant="success" className="px-3 py-1.5 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            מתעדכן עכשיו
          </Badge>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* LEFT (visually right in RTL): counter + invitees */}
          <div className="lg:col-span-3 space-y-6">
            {/* Counter card */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-baseline gap-3 mb-1">
                  <TrendingUp className="size-5 text-[#3B82C8]" />
                  <span className="text-sm font-semibold text-[#1B2D52]">
                    התקדמות לעבר היעד
                  </span>
                </div>

                <div className="flex items-end gap-3 mt-4 flex-wrap" dir="ltr">
                  <span className="text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1B2D52] tabular-nums">
                    {CURRENT.toLocaleString("en-US")}
                  </span>
                  <span className="text-2xl lg:text-3xl font-bold text-[#6B7280] tabular-nums pb-1">
                    / {TARGET.toLocaleString("en-US")}
                  </span>
                </div>

                <div className="mt-6">
                  <Progress value={PCT} className="h-3" />
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-[#6B7280]">
                      <span className="font-semibold text-[#1B2D52]">
                        {PCT.toFixed(1)}%
                      </span>{" "}
                      מהיעד
                    </span>
                    <span className="text-[#6B7280]">
                      נותרו {(TARGET - CURRENT).toLocaleString("he-IL")}{" "}
                      תומכים
                    </span>
                  </div>
                </div>

                {/* Mini stats row */}
                <div className="mt-8 pt-6 border-t border-[#E5E7EB] grid grid-cols-3 gap-4">
                  <MiniStat icon={Users} label="היום" value="+247" />
                  <MiniStat icon={MapPin} label="ערים פעילות" value="147" />
                  <MiniStat icon={TrendingUp} label="גידול שבועי" value="+18%" />
                </div>
              </CardContent>
            </Card>

            {/* Invitees */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div className="text-sm font-semibold text-[#1B2D52]">
                      החברים שהזמנתם
                    </div>
                    <p className="text-xs text-[#6B7280] mt-1">
                      {INVITEES.filter((i) => i.status === "approved").length}{" "}
                      אישרו ·{" "}
                      {INVITEES.filter((i) => i.status === "pending").length}{" "}
                      בהמתנה
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {INVITEES.length} סה״כ
                  </Badge>
                </div>

                <Separator className="my-5" />

                <ul className="space-y-3">
                  {INVITEES.map((invitee, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-4 p-3 -mx-3 rounded-lg hover:bg-[#F8FAFC] transition-colors"
                    >
                      <Avatar className="h-11 w-11 ring-2 ring-white shadow-sm">
                        <AvatarFallback>{invitee.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-[#0F1B36] truncate">
                          {invitee.name}
                        </div>
                        <div className="text-xs text-[#6B7280] mt-0.5">
                          {invitee.city} · {invitee.when}
                        </div>
                      </div>
                      {invitee.status === "approved" ? (
                        <Badge variant="success">
                          <Check className="size-3" />
                          הצטרפ/ה
                        </Badge>
                      ) : (
                        <Badge variant="warning">
                          <Clock className="size-3" />
                          בהמתנה
                        </Badge>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 rounded-lg bg-[#F8FAFC] border border-dashed border-[#E5E7EB] p-4 text-center">
                  <div className="text-sm font-semibold text-[#1B2D52]">
                    הזמינו עוד חבר/ה
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1">
                    הקישור שלכם:{" "}
                    <span className="font-mono text-[#1B2D52]" dir="ltr">
                      degel.il/i/A3F9-Q2B7
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT (visually left in RTL): map */}
          <div className="lg:col-span-2">
            <Card className="lg:sticky lg:top-24 overflow-hidden">
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-semibold text-[#1B2D52]">
                    מפת התומכים
                  </div>
                  <Badge variant="muted">חי</Badge>
                </div>
                <p className="text-xs text-[#6B7280] mt-1">
                  כל נקודה — תומכ/ה אמיתי/ת שהצטרף/ה לתנועה.
                </p>

                <div className="mt-4 rounded-xl bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F7] ring-1 ring-[#E5E7EB] p-4 lg:p-6">
                  <IsraelMap className="max-h-[480px] mx-auto" dotCount={62} />
                </div>

                {/* Legend */}
                <div className="mt-4 flex items-center justify-center gap-5 text-xs text-[#6B7280]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#1B2D52]" />
                    תומכ/ת
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#3B82C8] ring-2 ring-[#3B82C8]/30" />
                    את/ה
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action — restart */}
        <div className="mt-12 flex items-center justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/")}
            className="group"
          >
            <RotateCcw className="size-4 transition-transform group-hover:-rotate-180 duration-500" />
            התחל מחדש
          </Button>
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
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-[#6B7280] mb-1 font-semibold">
        <Icon className="size-3" />
        {label}
      </div>
      <div className="text-xl font-extrabold text-[#1B2D52] tabular-nums">
        {value}
      </div>
    </div>
  )
}
