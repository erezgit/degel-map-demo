import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/brand/Logo"
import { IsraelMap } from "@/components/brand/IsraelMap"
import { ArrowLeft } from "lucide-react"

const CURRENT = 12847
const TARGET = 150000
const PCT = ((CURRENT / TARGET) * 100).toFixed(1)
const REMAINING = (TARGET - CURRENT).toLocaleString("he-IL")
const CURRENT_FMT = CURRENT.toLocaleString("he-IL")
const TARGET_FMT = TARGET.toLocaleString("he-IL")

// Landing — Variant A · Momentum-first
// Counter is the hero. Map dominates above the fold. About + Join below.
export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white text-[#0F1B36]">
      {/* Header */}
      <header className="border-b border-[#E5E7EB]/70 bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#6B7280]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              פלטפורמה פעילה
            </span>
            <Link
              to="/landing-b"
              className="hidden sm:inline-flex text-xs font-medium text-[#6B7280] hover:text-[#1B2D52] underline-offset-4 hover:underline"
            >
              גרסת סיפור ↗
            </Link>
            <Button size="sm" onClick={() => navigate("/login")}>
              הצטרף
              <ArrowLeft className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero — counter prominent, brand tagline, Join CTA */}
      <section className="border-b border-[#E5E7EB]/70 bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 lg:pt-16 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1B2D52]/5 px-4 py-1.5 mb-6 ring-1 ring-[#1B2D52]/10">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1B2D52]" />
                <span className="text-xs font-semibold text-[#1B2D52] tracking-wide">
                  פרויקט 150,000 · קמפיין 2026
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[0.95] text-balance">
                אל הדגל
              </h1>

              <p className="mt-5 text-xl lg:text-2xl font-medium text-[#1B2D52]/85 leading-relaxed text-balance">
                דור חדש של ציונות. תנועה אחת. מפה אחת.
                <br />
                כל מי שמצטרף — מוסיף את הדגל שלו.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
                <Button
                  size="xl"
                  onClick={() => navigate("/login")}
                  className="group min-w-[200px] shadow-lg shadow-[#1B2D52]/20"
                >
                  הצטרפו עכשיו
                  <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
                </Button>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-[#1B2D52]">
                    פתוח לכולם · ללא חיוב
                  </span>
                  <span className="text-xs text-[#6B7280]">
                    כניסה עם Google או אימייל · ללא שיתוף מידע אישי
                  </span>
                </div>
              </div>
            </div>

            {/* Counter — the momentum signal */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#1B2D52]/15 bg-white shadow-xl shadow-[#1B2D52]/5 p-7">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    התקדמות לעבר היעד
                  </span>
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    זמן אמת
                  </span>
                </div>
                <div className="flex items-end gap-3 mb-1">
                  <div className="text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1B2D52] leading-none tabular-nums">
                    {CURRENT_FMT}
                  </div>
                  <div className="text-2xl font-semibold text-[#6B7280] pb-1">
                    / {TARGET_FMT}
                  </div>
                </div>
                <div className="text-sm text-[#6B7280] mb-4">
                  עוד {REMAINING} תומכות ותומכים — והדגל עולה.
                </div>
                {/* progress bar */}
                <div className="h-2 rounded-full bg-[#1B2D52]/10 overflow-hidden">
                  <div
                    className="h-full bg-[#1B2D52] rounded-full transition-all duration-700"
                    style={{ width: `${PCT}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-[#6B7280]">
                  <span>{PCT}% מהיעד</span>
                  <span>147 ערים בהן יש תומכים</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Big map section — full-width, dominant */}
      <section className="bg-[#F8FAFC] border-b border-[#E5E7EB]/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-12">
          <div className="flex items-baseline justify-between mb-4 gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0F1B36]">
                מפת התומכים בזמן אמת
              </h2>
              <p className="text-sm text-[#4B5563] mt-1">
                כל נקודה היא תומכ/ה שהצטרף/ה לתנועה. כל אזור — מספר התומכים שלו.
                התקרבו עם הגלגלת כדי לראות עיר אחר עיר.
              </p>
            </div>
            <div className="text-xs text-[#6B7280] hidden md:block">
              נתונים: OpenStreetMap · CARTO
            </div>
          </div>

          <div className="rounded-2xl border border-[#1B2D52]/15 bg-white shadow-xl shadow-[#1B2D52]/5 overflow-hidden">
            <div className="h-[60vh] min-h-[480px] w-full">
              <IsraelMap />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 flex-wrap text-xs text-[#6B7280]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1B2D52]" />
                תומכ/ת
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#3B82C8]" />
                הצטרפו לאחרונה
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#1B2D52] flex items-center justify-center text-[8px] font-bold text-white">
                  N
                </span>
                אזור עם מספר תומכים
              </span>
            </div>
            <span>המפה מתעדכנת בזמן אמת.</span>
          </div>
        </div>
      </section>

      {/* About El HaDegel */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#1B2D52]/5 px-3 py-1 mb-5 ring-1 ring-[#1B2D52]/10">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1B2D52]">
              על אל הדגל
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0F1B36] leading-tight">
            תנועה שנולדה מתוך השבעה באוקטובר.
          </h2>
          <div className="mt-6 space-y-4 text-lg text-[#374151] leading-relaxed">
            <p>
              אל הדגל היא תנועה ציונית חדשה שנוסדה על ידי לוחמי מילואים, מחנכים,
              יזמים ואנשי ציבור — אנשים שחזרו מהמלחמה והבינו שצריך משהו אחר. לא
              ימין, לא שמאל. ארץ לפני מחנה.
            </p>
            <p>
              אנחנו מאמינים שאפשר להחליף את הפוליטיקאים הקיימים בהנהגה שמשרתת את
              הציבור, להבטיח שירות לאומי לכל הסקטורים, ולקדם רפורמות בביטחון,
              חינוך, כלכלה וממשל. כדי להגיע לכנסת אנחנו צריכים{" "}
              <strong className="text-[#1B2D52]">150,000 תומכים</strong>.
            </p>
            <p className="text-[#1B2D52] font-medium">
              כאן זה מתחיל. כל הצטרפות — דגל חדש על המפה.
            </p>
          </div>

          {/* Three pillars */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-5"
              >
                <div className="text-2xl font-bold text-[#1B2D52] mb-1">
                  {p.num}
                </div>
                <div className="text-base font-semibold text-[#0F1B36] mb-1">
                  {p.title}
                </div>
                <div className="text-sm text-[#4B5563] leading-relaxed">
                  {p.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA — bottom */}
      <section className="bg-[#1B2D52] text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-20 text-center">
          <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight text-balance">
            מוכן/ה להניף את הדגל?
          </h2>
          <p className="mt-5 text-lg text-white/80 leading-relaxed max-w-2xl mx-auto text-balance">
            התומכות והתומכים שכבר הצטרפו זקוקות לך. אתה אחד מ-{REMAINING} שעוד
            חסרים. סרטון של שלוש דקות, ואז אתה על המפה.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="xl"
              variant="secondary"
              onClick={() => navigate("/login")}
              className="group min-w-[220px] bg-white text-[#1B2D52] hover:bg-white/90"
            >
              כניסה והוספת הדגל שלך
              <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
            </Button>
            <div className="text-xs text-white/60">
              ללא תשלום · ללא ספאם · ביטול בכל רגע
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
          <span>© 2026 אל הדגל · כל הזכויות שמורות</span>
          <div className="flex items-center gap-4">
            <Link to="/landing-b" className="hover:text-[#1B2D52]">
              גרסת סיפור
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
    title: "החלפת הפוליטיקאים",
    body: "הנהגה ערכית, מנוסה ומכבדת — לא קריירה פוליטית.",
  },
  {
    num: "02",
    title: "שירות לאומי לכולם",
    body: "כל הסקטורים שותפים להגנת המדינה ולפיתוחה — ללא פטורים.",
  },
  {
    num: "03",
    title: "ריסטארט לאומי",
    body: "רפורמות במבנה הביטחון, החינוך, הכלכלה והממשל.",
  },
]
