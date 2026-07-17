import * as React from "react"
import { cn } from "@/lib/utils"
import { LuxuryImage } from "@/components/common/image"
import { Icon } from "@/components/common/icon"

/* --- Base Card System --- */
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl border bg-card-bg text-foreground shadow-card", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-h4 font-serif font-medium leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-small text-muted-foreground", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

/* --- Specialized Luxury Variants --- */

// Project Card (Large image, editorial typography below)
function ProjectCard({ image, title, category, className }) {
  return (
    <div className={cn("group cursor-pointer flex flex-col gap-4", className)}>
      <LuxuryImage src={image} alt={title} aspectRatio="editorial" hoverEffect="zoom" />
      <div className="flex flex-col gap-1">
        <span className="text-caption uppercase tracking-widest text-muted-foreground">{category}</span>
        <h3 className="text-h4 font-serif transition-colors group-hover:text-primary">{title}</h3>
      </div>
    </div>
  )
}

// Service Card (Soft bg, lift hover, icon)
function ServiceCard({ icon, title, description, className }) {
  return (
    <Card className={cn("bg-surface border-transparent transition-all duration-300 hover:shadow-floating hover:-translate-y-1", className)}>
      <CardHeader>
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
          <Icon icon={icon} size="default" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-body text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

// Feature Card (Minimal, line on left)
function FeatureCard({ title, description, className }) {
  return (
    <div className={cn("pl-6 border-l border-primary/30 py-2", className)}>
      <h4 className="text-h5 font-serif mb-2">{title}</h4>
      <p className="text-small text-muted-foreground">{description}</p>
    </div>
  )
}

// Team Card (Portrait image, rectangular)
function TeamCard({ image, name, role, bio, className }) {
  return (
    <div className={cn("group flex flex-col gap-6 p-6 md:p-8 bg-background border border-border/40 rounded-2xl hover:border-primary/20 hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500", className)}>
      <div className="w-full aspect-[3/4] overflow-hidden rounded-xl">
        <LuxuryImage src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" wrapperClassName="w-full h-full" hoverEffect="none" />
      </div>
      <div className="flex flex-col gap-2 text-center md:text-left">
        <h4 className="text-h4 font-serif text-heading">{name}</h4>
        <p className="text-caption text-primary uppercase tracking-widest">{role}</p>
        {bio && <p className="text-body text-muted-foreground mt-2">{bio}</p>}
      </div>
    </div>
  )
}

// Testimonial Card (Quote focus)
function TestimonialCard({ quote, author, title, className }) {
  return (
    <Card className={cn("bg-secondary border-transparent p-8 md:p-12", className)}>
      <blockquote className="text-h4 font-serif text-center italic mb-8">&quot;{quote}&quot;</blockquote>
      <div className="text-center">
        <div className="text-button text-primary mb-1">{author}</div>
        <div className="text-caption text-muted-foreground">{title}</div>
      </div>
    </Card>
  )
}

// Blog Card
function BlogCard({ image, title, date, excerpt, className }) {
  return (
    <Card className={cn("overflow-hidden group cursor-pointer border-transparent hover:shadow-hover transition-all", className)}>
      <LuxuryImage src={image} alt={title} aspectRatio="video" />
      <CardHeader>
        <div className="text-caption text-muted-foreground mb-2">{date}</div>
        <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-small text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>
    </Card>
  )
}

// Image Card (Text over image overlay)
function ImageCard({ image, title, subtitle, className }) {
  return (
    <div className={cn("group relative overflow-hidden cursor-pointer", className)}>
      <LuxuryImage src={image} alt={title} aspectRatio="square" overlay />
      <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10 transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
        <span className="text-caption uppercase tracking-widest opacity-80 mb-2">{subtitle}</span>
        <h3 className="text-h3 font-serif">{title}</h3>
      </div>
    </div>
  )
}

// Statistics Card (Large number)
function StatisticsCard({ number, label, className }) {
  return (
    <div className={cn("text-center p-6 border border-border/50 bg-surface", className)}>
      <div className="text-display-md text-primary font-serif mb-2">{number}</div>
      <div className="text-button text-muted-foreground">{label}</div>
    </div>
  )
}

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  ProjectCard,
  ServiceCard,
  FeatureCard,
  TeamCard,
  TestimonialCard,
  BlogCard,
  ImageCard,
  StatisticsCard
}
