import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { PageShell } from "@/components/brand/PageShell"
import { StepIndicator } from "@/components/brand/StepIndicator"
import { Play, ArrowLeft, Sparkles } from "lucide-react"

export function WelcomePage() {
  const navigate = useNavigate()

  return (
    <PageShell bgVariant="subtle">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <StepIndicator current={1} total={4} className="mb-10" />

        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#3B82C8]/10 px-3 py-1 ring-1 ring-[#3B82C8]/20">
            <Sparkles className="h-3.5 w-3.5 text-[#3B82C8]" />
            <span className="text-xs font-semibold text-[#1B2D52]">
              ברוכים הבאים
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F1B36] leading-tight text-balance">
            דקה אחת שתסביר הכל
          </h1>
          <p className="text-lg text-[#4B5563] leading-relaxed max-w-xl">
            מי אנחנו, מה אנחנו פותרים, ולמה ההצטרפות שלכם משנה את
            המשוואה.
          </p>
        </div>

        {/* Video frame */}
        <div className="mt-10 group">
          <div className="text-xs font-semibold text-[#1B2D52] mb-3 tracking-wide">
            מה זה אל הדגל ומה אנחנו פותרים
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#0F1B36] via-[#1B2D52] to-[#15243F] shadow-2xl shadow-[#1B2D52]/30 ring-1 ring-[#1B2D52]/20">
            {/* Decorative — feels like a stylized still frame */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-1/4 start-1/4 h-40 w-40 rounded-full bg-[#3B82C8]/40 blur-3xl" />
              <div className="absolute bottom-1/4 end-1/4 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            </div>

            {/* Grid lines for texture */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Play button */}
            <button
              type="button"
              className="absolute inset-0 flex items-center justify-center transition-transform group-hover:scale-105"
              aria-label="הפעל סרטון"
            >
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-2xl ring-8 ring-white/20 transition-all group-hover:ring-white/40">
                <Play
                  className="h-9 w-9 text-[#1B2D52] -me-1"
                  fill="#1B2D52"
                  strokeWidth={0}
                />
              </span>
            </button>

            {/* Bottom overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-medium text-white/70 mb-1">
                    אל הדגל · קמפיין 2026
                  </div>
                  <div className="text-xl lg:text-2xl font-bold text-white text-balance">
                    הכוח שלכם, מסומן על המפה
                  </div>
                </div>
                <div className="hidden sm:block text-xs font-medium text-white/60 rounded-md bg-white/10 px-2 py-1 backdrop-blur-sm">
                  1:24
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs text-[#6B7280]">
            ניתן לדלג ולהמשיך אם כבר ראיתם את הסרטון.
          </div>
        </div>

        {/* Action */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/login")}
            className="text-[#6B7280] hover:text-[#1B2D52]"
          >
            חזרה
          </Button>
          <Button
            size="lg"
            onClick={() => navigate("/signup")}
            className="group min-w-[200px] shadow-lg shadow-[#1B2D52]/20"
          >
            המשך
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </Button>
        </div>
      </div>
    </PageShell>
  )
}
