import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#1B2D52] text-white",
        success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
        warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
        muted: "bg-[#F4F5F7] text-[#6B7280] ring-1 ring-[#E5E7EB]",
        outline: "border border-[#1B2D52]/20 text-[#1B2D52]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
