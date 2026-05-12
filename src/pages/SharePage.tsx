import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PageShell } from "@/components/brand/PageShell"
import { StepIndicator } from "@/components/brand/StepIndicator"
import {
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Users,
  MessageCircle,
} from "lucide-react"

const INVITE_URL = "https://degel.il/i/A3F9-Q2B7"

export function SharePage() {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(INVITE_URL).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <PageShell bgVariant="subtle">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <StepIndicator current={3} total={4} className="mb-10" />

        <div className="space-y-3 mb-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F1B36] leading-tight text-balance">
            הקישור הייחודי שלכם
          </h1>
          <p className="text-lg text-[#4B5563] leading-relaxed">
            שתפו את הקישור עם חברים. כל מי שמצטרף דרכו — מוסיף נקודה
            למפת הדגל.
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg">הקישור שלך</CardTitle>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 ring-1 ring-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-semibold text-emerald-700 tracking-wide">
                  פעיל
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            {/* URL display */}
            <div className="rounded-xl bg-[#F8FAFC] ring-1 ring-[#E5E7EB] p-1.5 flex items-center gap-2">
              <div
                className="flex-1 px-4 py-3 font-mono text-sm sm:text-base text-[#1B2D52] truncate"
                dir="ltr"
              >
                {INVITE_URL}
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleCopy}
                className="shrink-0 h-10 px-3"
              >
                {copied ? (
                  <>
                    <Check className="size-4" />
                    הועתק
                  </>
                ) : (
                  <>
                    <Copy className="size-4" />
                    העתקה
                  </>
                )}
              </Button>
            </div>

            {/* One big primary share button */}
            <Button
              size="xl"
              onClick={() => navigate("/status")}
              className="w-full mt-6 group shadow-lg shadow-[#1B2D52]/20"
            >
              <Share2 className="size-5" />
              שתפו
            </Button>

            <p className="text-center text-xs text-[#6B7280] mt-4 leading-relaxed">
              מותקן? נשלח דרך WhatsApp, Email, או כל אפליקציה שתבחרו.
            </p>

            {/* Mini info row */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-xl bg-[#F8FAFC] ring-1 ring-[#E5E7EB] p-4">
                <div className="flex items-center gap-2 text-[#6B7280] text-xs font-medium mb-1.5">
                  <Users className="size-3.5" />
                  כבר הזמינו
                </div>
                <div className="text-2xl font-extrabold text-[#1B2D52]">
                  0
                </div>
                <div className="text-xs text-[#6B7280] mt-0.5">
                  התחלה — בואו ניצור גלים
                </div>
              </div>
              <div className="rounded-xl bg-[#F8FAFC] ring-1 ring-[#E5E7EB] p-4">
                <div className="flex items-center gap-2 text-[#6B7280] text-xs font-medium mb-1.5">
                  <MessageCircle className="size-3.5" />
                  ההצעה שלנו
                </div>
                <div className="text-base font-semibold text-[#1B2D52] leading-tight">
                  3 חברים = השפעה
                </div>
                <div className="text-xs text-[#6B7280] mt-0.5">
                  לשתף עם שלושה אנשים שמכירים אתכם.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pro tip */}
        <div className="mt-6 rounded-xl border border-[#3B82C8]/20 bg-[#3B82C8]/5 p-4 flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#3B82C8]/15 flex items-center justify-center shrink-0">
            <Share2 className="size-4 text-[#1B2D52]" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#1B2D52]">
              טיפ — תוסיפו הודעה אישית
            </div>
            <div className="text-xs text-[#4B5563] mt-1 leading-relaxed">
              שיתוף עם משפט אישי קצר ("שווה בדיקה — אני בפנים")
              מכפיל פי 3 את שיעור ההצטרפות מהקישור.
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/signup")}
            className="text-[#6B7280] hover:text-[#1B2D52]"
          >
            חזרה
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/status")}
            className="group min-w-[200px]"
          >
            דלגו לסטטוס
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </Button>
        </div>
      </div>
    </PageShell>
  )
}
