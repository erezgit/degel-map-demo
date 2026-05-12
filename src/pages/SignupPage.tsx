import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PageShell } from "@/components/brand/PageShell"
import { StepIndicator } from "@/components/brand/StepIndicator"
import { ArrowLeft } from "lucide-react"

export function SignupPage() {
  const navigate = useNavigate()
  const [reason, setReason] = useState<string | undefined>()

  return (
    <PageShell bgVariant="subtle">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <StepIndicator current={2} total={4} className="mb-10" />

        <div className="space-y-3 mb-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F1B36] leading-tight text-balance">
            ספרו לנו עליכם
          </h1>
          <p className="text-lg text-[#4B5563] leading-relaxed">
            שלוש שאלות קצרות שיעזרו לנו להבין מי מצטרף, ולהגיע יותר טוב
            לקהילות שלכם.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">פרטים בסיסיים</CardTitle>
            <CardDescription>כל השדות חובה · לוקח פחות מדקה</CardDescription>
          </CardHeader>
          <CardContent className="space-y-7">
            {/* City */}
            <div className="space-y-2.5">
              <Label htmlFor="city">עיר מגורים</Label>
              <Input
                id="city"
                placeholder="לדוגמה: תל אביב, ירושלים, חיפה"
                defaultValue="תל אביב-יפו"
              />
              <p className="text-xs text-[#6B7280] leading-relaxed">
                העיר תופיע על מפת התומכים — לא נשתף אותה עם אף גורם
                אחר.
              </p>
            </div>

            {/* Source */}
            <div className="space-y-2.5">
              <Label>איך הגעת אלינו?</Label>
              <Select defaultValue="friend">
                <SelectTrigger>
                  <SelectValue placeholder="בחרו ערוץ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friend">חבר/ה הזמין/ה אותי</SelectItem>
                  <SelectItem value="social">פייסבוק / אינסטגרם</SelectItem>
                  <SelectItem value="tv">טלוויזיה או רדיו</SelectItem>
                  <SelectItem value="press">עיתון או אתר חדשות</SelectItem>
                  <SelectItem value="event">אירוע קהילתי / הרצאה</SelectItem>
                  <SelectItem value="other">אחר</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reason */}
            <div className="space-y-3">
              <Label>למה את/ה תומכ/ת באל הדגל?</Label>
              <RadioGroup
                value={reason}
                onValueChange={setReason}
                className="gap-0 divide-y divide-[#E5E7EB] rounded-lg ring-1 ring-[#E5E7EB] overflow-hidden"
              >
                {REASONS.map((opt) => (
                  <label
                    key={opt.value}
                    htmlFor={opt.value}
                    className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors ${
                      reason === opt.value
                        ? "bg-[#1B2D52]/[0.03]"
                        : "hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <RadioGroupItem
                      value={opt.value}
                      id={opt.value}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#1B2D52] leading-tight">
                        {opt.label}
                      </div>
                      <div className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                        {opt.hint}
                      </div>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Action */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/welcome")}
            className="text-[#6B7280] hover:text-[#1B2D52]"
          >
            חזרה
          </Button>
          <Button
            size="lg"
            onClick={() => navigate("/share")}
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

const REASONS = [
  {
    value: "zionism",
    label: "ציונות חדשה, אופטימית",
    hint: "אני מאמין/ה שהגיע הזמן לחזון פוזיטיבי לישראל.",
  },
  {
    value: "leadership",
    label: "ההנהגה והאנשים",
    hint: "הצוות והדמויות שמובילים את התנועה.",
  },
  {
    value: "change",
    label: "צריך שינוי במערכת הפוליטית",
    hint: "הזמן לחלופה אמיתית בכנסת הבאה.",
  },
  {
    value: "community",
    label: "הקהילה שמסביב",
    hint: "אני רוצה להיות חלק מתנועה אזרחית רחבה.",
  },
  {
    value: "other",
    label: "סיבה אחרת",
    hint: "אספר לכם בהמשך, אם תרצו.",
  },
]
