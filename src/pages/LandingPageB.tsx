import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/brand/Logo"
import { IsraelMap } from "@/components/brand/IsraelMap"
import { ArrowLeft } from "lucide-react"

const CURRENT = 12847
const TARGET = 150000
const PCT = ((CURRENT / TARGET) * 100).toFixed(1)
const CURRENT_FMT = CURRENT.toLocaleString("he-IL")

// Landing — Variant B · Story-first
// Quote leads. Personal, warm, intimate. Map appears as a reveal further down.
export function LandingPageB() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#0F1B36]">
      {/* Header */}
      <header className="border-b border-[#E5E7EB]/70 bg-[#FAFAF7]/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex text-xs font-medium text-[#6B7280] hover:text-[#1B2D52] underline-offset-4 hover:underline"
            >
              גרסת מומנטום ↗
            </Link>
            <Button size="sm" onClick={() => navigate("/login")}>
              הצטרף
              <ArrowLeft className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero — quote-driven */}
      <section className="bg-[#FAFAF7]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-20">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-8">
            אל הדגל · קמפיין 2026
          </div>

          <blockquote className="text-3xl lg:text-5xl font-bold leading-[1.2] tracking-tight text-balance text-[#0F1B36]">
            <span className="text-[#1B2D52]/30 text-7xl leading-none mr-2 align-top">״</span>
            אחרי השבעה באוקטובר שאלנו את עצמנו — מה עכשיו?
            <br />
            <span className="text-[#1B2D52]">מי יעשה את זה? נחכה למישהו אחר?</span>
            <br />
            הבנו שהתשובה זה אנחנו.
          </blockquote>

          <div className="mt-10 flex items-center gap-3 text-sm">
            <div className="w-10 h-10 rounded-full bg-[#1B2D52] flex items-center justify-center text-white font-bold">
              מ.י
            </div>
            <div>
              <div className="font-semibold text-[#0F1B36]">מתן יפה</div>
              <div className="text-xs text-[#6B7280]">יו"ר התנועה · לוחם מילואים</div>
            </div>
          </div>
        </div>
      </section>

      {/* Story narrative */}
      <section className="bg-white border-y border-[#E5E7EB]/70">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0F1B36] leading-tight">
            לא ימין. לא שמאל. ארץ.
          </h2>
          <div className="mt-6 space-y-5 text-lg text-[#374151] leading-relaxed">
            <p>
              באנו מהמלחמה. מקרבות, מצוותי החטופים, מהגיוסים שבאו בשתי דקות.
              ראינו את העם הזה במלוא עוצמתו — ואת המערכת הפוליטית במלוא כישלונה.
            </p>
            <p>
              היום אנחנו בונים תנועה חדשה. תשעה אנשי הנהגה — לוחמי מילואים,
              מחנכים, יזמים, אנשי ציבור. אין לנו קריירה פוליטית להגן עליה. יש לנו
              מדינה.
            </p>
            <p className="text-[#1B2D52] font-medium">
              אבל הקול שלנו לא מספיק. אנחנו צריכים אותך.
            </p>
          </div>
        </div>
      </section>

      {/* Map reveal — "look how many of us are here" */}
      <section className="bg-[#FAFAF7]">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="text-center mb-10">
            <p className="text-base text-[#6B7280] mb-2">
              בזמן שאתה קורא את זה
            </p>
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-[#0F1B36] leading-tight">
              <span className="text-[#1B2D52] tabular-nums">{CURRENT_FMT}</span>{" "}
              כבר הצטרפו.
            </h2>
            <p className="mt-3 text-lg text-[#4B5563] max-w-xl mx-auto">
              כל נקודה זה אדם. כל אזור — קהילה. כל הצטרפות חדשה מקרבת אותנו ליעד
              של 150,000.
            </p>
          </div>

          <div className="rounded-3xl border border-[#1B2D52]/15 bg-white shadow-2xl shadow-[#1B2D52]/10 overflow-hidden">
            <div className="h-[58vh] min-h-[460px] w-full">
              <IsraelMap />
            </div>
          </div>

          {/* progress under the map */}
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="flex items-baseline justify-between mb-2 text-sm">
              <span className="font-semibold text-[#1B2D52]">
                {CURRENT_FMT} / 150,000
              </span>
              <span className="text-[#6B7280]">{PCT}% מהיעד</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#1B2D52]/10 overflow-hidden">
              <div
                className="h-full bg-[#1B2D52] rounded-full transition-all duration-700"
                style={{ width: `${PCT}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What we stand for */}
      <section className="bg-white border-t border-[#E5E7EB]/70">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0F1B36] mb-10">
            מה אנחנו עומדים מאחוריו
          </h2>
          <div className="space-y-7">
            {PILLARS.map((p) => (
              <div key={p.title} className="flex gap-5">
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#1B2D52]/10 flex items-center justify-center text-base font-bold text-[#1B2D52]">
                  {p.num}
                </div>
                <div>
                  <div className="text-lg font-semibold text-[#0F1B36] mb-1">
                    {p.title}
                  </div>
                  <div className="text-base text-[#4B5563] leading-relaxed">
                    {p.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA — warm, personal */}
      <section className="bg-[#1B2D52] text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-16 lg:py-20 text-center">
          <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight text-balance">
            הצטרף. הנף את הדגל שלך.
          </h2>
          <p className="mt-5 text-lg text-white/80 leading-relaxed text-balance">
            תיכנס. תצפה בסרטון של שלוש דקות. תשאיר שם ועיר. הנקודה שלך תופיע על
            המפה. זה כל מה שאנחנו מבקשים — בינתיים.
          </p>
          <div className="mt-9">
            <Button
              size="xl"
              variant="secondary"
              onClick={() => navigate("/login")}
              className="group min-w-[240px] bg-white text-[#1B2D52] hover:bg-white/90"
            >
              אני בפנים
              <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
          <span>© 2026 אל הדגל · כל הזכויות שמורות</span>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-[#1B2D52]">
              גרסת מומנטום
            </Link>
            <span>elhadegel.co.il</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

const PILLARS = [
  {
    num: "01",
    title: "הנהגה שמשרתת את הציבור",
    body: "להחליף פוליטיקאים שכל מטרתם הקריירה — בהנהגה שבאה לעבוד בשביל אנשי המדינה. ערכים לפני סקרים.",
  },
  {
    num: "02",
    title: "שירות לאומי לכולם",
    body: "כל הסקטורים שותפים להגנת המדינה ולפיתוחה. אחריות משותפת — בלי פטורים ובלי קיצורי דרך.",
  },
  {
    num: "03",
    title: "ריסטארט לאומי",
    body: "רפורמות עומק בביטחון, חינוך, כלכלה וממשל — מה שהמערכת לא מסוגלת לעשות בעצמה.",
  },
]
