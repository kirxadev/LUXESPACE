import * as React from "react"
import { Slot, Slottable } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-soft hover:shadow-hover",
        secondary: "bg-secondary text-secondary-foreground hover:bg-accent shadow-soft",
        outline: "border border-border bg-transparent hover:bg-secondary text-foreground",
        ghost: "hover:bg-secondary hover:text-secondary-foreground text-foreground",
        text: "text-foreground hover:text-primary underline-offset-4 hover:underline p-0",
        icon: "bg-transparent text-foreground hover:bg-secondary hover:text-primary rounded-full",
        floating: "bg-surface text-foreground shadow-floating hover:shadow-hover rounded-full border border-border/50",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-10 px-6 py-2 text-xs",
        lg: "h-14 px-10 py-4 text-base",
        icon: "h-12 w-12",
        auto: "h-auto p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, isLoading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Ensure text variant gets auto padding
    const activeSize = variant === "text" ? "auto" : size;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size: activeSize, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <Slottable>{children}</Slottable>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
