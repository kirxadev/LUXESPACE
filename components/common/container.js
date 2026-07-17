import * as React from "react"
import { cn } from "@/lib/utils"

function Container({ className, as: Comp = "div", ...props }) {
  return (
    <Comp className={cn("container-base", className)} {...props} />
  )
}

function WideContainer({ className, as: Comp = "div", ...props }) {
  return (
    <Comp className={cn("container-wide", className)} {...props} />
  )
}

function ContentWrapper({ className, as: Comp = "div", ...props }) {
  return (
    <Comp className={cn("container-content", className)} {...props} />
  )
}

function FullWidthContainer({ className, as: Comp = "div", ...props }) {
  return (
    <Comp className={cn("w-full px-container", className)} {...props} />
  )
}

function SectionWrapper({ className, as: Comp = "section", ...props }) {
  return (
    <Comp className={cn("section-padding w-full", className)} {...props} />
  )
}

function PageWrapper({ className, as: Comp = "main", ...props }) {
  return (
    <Comp className={cn("flex flex-col min-h-screen", className)} {...props} />
  )
}

export { 
  Container, 
  WideContainer, 
  ContentWrapper, 
  FullWidthContainer, 
  SectionWrapper, 
  PageWrapper 
}
