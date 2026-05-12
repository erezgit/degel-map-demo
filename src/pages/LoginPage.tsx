import { useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageShell } from "@/components/brand/PageShell"
import { ShieldCheck, Lock } from "lucide-react"

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <PageShell bgVariant="subtle">
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <Card className="overflow-hidden">
            <CardHeader className="text-center pt-10 pb-2 px-8">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1B2D52]/5 ring-1 ring-[#1B2D52]/10">
                <Lock className="h-7 w-7 text-[#1B2D52]" strokeWidth={1.8} />
              </div>
              <CardTitle className="text-3xl">הרשמה</CardTitle>
              <CardDescription className="mt-3 text-base">
                ההצטרפות לאל הדגל פתוחה לתומכים שהוזמנו על ידי חבר.
                כניסה ראשונית מאובטחת באמצעות חשבון Google שלכם.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-10 pt-6">
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/welcome")}
                className="w-full h-14 text-base border-2 hover:bg-[#F8FAFC] gap-3 group"
              >
                <GoogleG />
                <span className="font-semibold">המשך עם Google</span>
              </Button>

              <div className="mt-8 flex items-start gap-3 rounded-lg bg-[#F8FAFC] p-4 ring-1 ring-[#E5E7EB]">
                <ShieldCheck className="h-5 w-5 text-[#3B82C8] shrink-0 mt-0.5" />
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  אנו לא חולקים את המידע שלכם עם צד שלישי. כתובת
                  האימייל משמשת לאימות בלבד וניתן להסיר את עצמכם
                  מהפלטפורמה בכל עת.
                </p>
              </div>

              <p className="mt-6 text-center text-xs text-[#6B7280]">
                בהמשך אתם מאשרים את{" "}
                <button className="text-[#1B2D52] font-semibold hover:underline">
                  תנאי השימוש
                </button>{" "}
                ו
                <button className="text-[#1B2D52] font-semibold hover:underline">
                  מדיניות הפרטיות
                </button>
              </p>
            </CardContent>
          </Card>

          <p className="text-center mt-6 text-xs text-[#6B7280]">
            אין לכם הזמנה?{" "}
            <button
              onClick={() => navigate("/")}
              className="font-semibold text-[#1B2D52] hover:underline"
            >
              חזרה לדף הבית
            </button>
          </p>
        </div>
      </div>
    </PageShell>
  )
}

function GoogleG() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.859-3.048.859-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  )
}
