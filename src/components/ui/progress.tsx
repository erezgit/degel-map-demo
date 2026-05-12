import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const pct = Math.max(0, Math.min(100, value || 0))
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-[#F4F5F7]",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-gradient-to-l from-[#3B82C8] to-[#1B2D52] transition-all duration-700 ease-out"
        style={{ width: `${pct}%` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
