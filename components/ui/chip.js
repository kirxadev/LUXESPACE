import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        interactive: "border-border bg-surface text-foreground hover:border-primary hover:bg-secondary cursor-pointer",
        filter: "border-primary bg-primary text-primary-foreground cursor-pointer shadow-soft",
        tag: "border-transparent bg-secondary/50 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "interactive",
    },
  }
)

const Chip = React.forwardRef(({ className, variant, as = "button", ...props }, ref) => {
  const Comp = as
  return (
    <Comp
      ref={ref}
      className={cn(chipVariants({ variant, className }))}
      {...props}
    />
  )
})
Chip.displayName = "Chip"

export { Chip, chipVariants }
