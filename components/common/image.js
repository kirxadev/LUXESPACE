import * as React from "react"
import NextImage from "next/image"
import { cn } from "@/lib/utils"

const LuxuryImage = React.forwardRef(({
  src,
  alt,
  className,
  wrapperClassName,
  aspectRatio = "auto",
  overlay = false,
  hoverEffect = "zoom", // zoom, none
  priority = false,
  ...props
}, ref) => {
  
  const aspectClasses = {
    auto: "aspect-auto",
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    editorial: "aspect-[4/5]",
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectClasses[aspectRatio],
        wrapperClassName
      )}
    >
      <NextImage
        ref={ref}
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        className={cn(
          "object-cover transition-transform duration-700 ease-out",
          hoverEffect === "zoom" && "group-hover:scale-105",
          className
        )}
        {...props}
      />
      {overlay && (
        <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
      )}
    </div>
  )
})
LuxuryImage.displayName = "LuxuryImage"

export { LuxuryImage }
