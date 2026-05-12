import { Logo } from "./Logo"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface PageShellProps {
  children: ReactNode
  className?: string
  showHeader?: boolean
  bgVariant?: "white" | "subtle"
}

export function PageShell({
  children,
  className,
  showHeader = true,
  bgVariant = "white",
}: PageShellProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col",
        bgVariant === "subtle"
          ? "bg-gradient-to-b from-white via-[#F8FAFC] to-white"
          : "bg-white"
      )}
    >
      {showHeader && (
        <header className="w-full border-b border-[#E5E7EB]/60 backdrop-blur-sm bg-white/70 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
            <Logo size="md" />
            <div className="text-xs text-[#6B7280] hidden sm:block">
              דמו · גרסה לתצוגה בלבד
            </div>
          </div>
        </header>
      )}
      <main className={cn("flex-1 animate-fade-up", className)}>
        {children}
      </main>
    </div>
  )
}
