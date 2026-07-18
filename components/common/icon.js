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
    sm: "w-[16px] h-[16px]",
    default: "w-[24px] h-[24px]",
    md: "w-[32px] h-[32px]",
    lg: "w-[48px] h-[48px]",
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
