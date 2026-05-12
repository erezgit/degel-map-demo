import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/brand/Logo"
import { ArrowLeft } from "lucide-react"

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Subtle gradient backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F8FAFC] to-white" />
        <div className="absolute -top-40 -end-40 h-[500px] w-[500px] rounded-full bg-[#3B82C8]/10 blur-3xl" />
        <div className="absolute -bottom-40 -start-40 h-[500px] w-[500px] rounded-full bg-[#1B2D52]/5 blur-3xl" />
      </div>

      {/* Header — logo top-right (visually right in RTL) */}
      <header className="w-full px-6 lg:px-12 pt-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo size="md" />
          <div className="text-xs font-medium text-[#6B7280] hidden sm:flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            פלטפורמה פעילה
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 lg:px-12 pt-20 lg:pt-32 pb-24 animate-fade-up">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#1B2D52]/5 px-4 py-2 mb-8 ring-1 ring-[#1B2D52]/10">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1B2D52]" />
            <span className="text-xs font-semibold text-[#1B2D52] tracking-wide">
              מפת הדגל · קמפיין 2026
            </span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tight text-[#0F1B36] leading-[0.95] text-balance">
            אל הדגל
          </h1>

          <p className="mt-6 text-2xl lg:text-3xl font-medium text-[#1B2D52]/80 leading-relaxed text-balance">
            דור חדש של ציונות
          </p>

          <p className="mt-8 text-lg text-[#4B5563] leading-relaxed max-w-2xl text-balance">
            צרפו את עצמכם למאה וחמישים אלף ישראלים המתחייבים לתמוך
            בתנועה. כל מי שמצטרף — מוסיף דגל למפה. יחד נראה את עוצמת
            התנועה.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-start gap-5">
            <Button
              size="xl"
              onClick={() => navigate("/login")}
              className="group min-w-[200px] shadow-lg shadow-[#1B2D52]/20"
            >
              כניסה
              <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
            </Button>
            <Button
              size="xl"
              variant="outline"
              onClick={() => navigate("/map-explorer")}
              className="group min-w-[200px]"
            >
              חקור את המפה
              <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
            </Button>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-[#1B2D52]">
                ההצטרפות בהזמנה בלבד
              </span>
              <span className="text-xs text-[#6B7280]">
                פלטפורמה מאובטחת · ללא שיתוף מידע אישי
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-24 lg:mt-32 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 border-t border-[#E5E7EB] pt-12">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl lg:text-4xl font-extrabold text-[#1B2D52] tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-[#6B7280] leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB]/60">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
          <span>© 2026 אל הדגל · כל הזכויות שמורות</span>
          <span>elhadegel.co.il</span>
        </div>
      </footer>
    </div>
  )
}

const STATS = [
  { value: "12,847", label: "תומכים שכבר הצטרפו" },
  { value: "150,000", label: "היעד הקרוב" },
  { value: "147", label: "ערים בהן יש תומכים" },
  { value: "8.6%", label: "מהיעד הושג" },
]
