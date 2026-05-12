import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

/**
 * Stylized geometric waving flag in El HaDegel navy.
 * Hand-rolled SVG — simple, civic, modern.
 */
export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const dim = size === "sm" ? 28 : size === "lg" ? 56 : 40
  const textSize =
    size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl"

  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Flag pole */}
        <rect x="9" y="6" width="3" height="44" rx="1.5" fill="#1B2D52" />
        {/* Flag waving — three layered chevrons for motion */}
        <path
          d="M12 10 H38 C42 10 46 14 46 18 C46 22 42 24 38 24 H12 V10 Z"
          fill="#1B2D52"
        />
        <path
          d="M12 26 H34 C38 26 42 28 42 32 C42 36 38 38 34 38 H12 V26 Z"
          fill="#3B82C8"
        />
        {/* Accent dot — the "flag point" / supporter */}
        <circle cx="9" cy="6" r="3.5" fill="#1B2D52" />
      </svg>
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              "font-extrabold tracking-tight text-[#1B2D52]",
              textSize
            )}
          >
            אל הדגל
          </span>
          {size !== "sm" && (
            <span className="text-[10px] font-medium text-[#6B7280] mt-1 tracking-wide">
              דור חדש של ציונות
            </span>
          )}
        </div>
      )}
    </div>
  )
}
