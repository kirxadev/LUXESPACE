import * as React from "react"
import { cn } from "@/lib/utils"

const Icon = React.forwardRef(({ 
  icon: LucideIcon, 
  size = "default", 
  className,
  hoverStyle = "none",
  ...props 
}, ref) => {
  if (!LucideIcon) return null;

  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const hoverClasses = {
    none: "",
    scale: "transition-transform hover:scale-110",
    color: "transition-colors hover:text-primary",
  };

  return (
    <LucideIcon
      ref={ref}
      strokeWidth={1.5}
      className={cn(
        sizeClasses[size], 
        hoverClasses[hoverStyle],
        className
      )}
      {...props}
    />
  )
})
Icon.displayName = "Icon"

export { Icon }
