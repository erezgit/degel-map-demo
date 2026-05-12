import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  current: number
  total: number
  className?: string
}

export function StepIndicator({
  current,
  total,
  className,
}: StepIndicatorProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
        <span>
          שלב {toHebrewNumber(current)} מתוך {toHebrewNumber(total)}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const isPast = i < current
          const isCurrent = i === current - 1
          return (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                isCurrent
                  ? "w-10 bg-[#1B2D52]"
                  : isPast
                  ? "w-6 bg-[#3B82C8]"
                  : "w-6 bg-[#E5E7EB]"
              )}
            />
          )
        })}
      </div>
    </div>
  )
}

function toHebrewNumber(n: number): string {
  // Keep numerals as Western Arabic — common in modern Hebrew UI.
  return String(n)
}
