import * as React from "react"
import { cn } from "@/lib/utils"

/* --- Label --- */
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("text-small uppercase tracking-widest text-muted-foreground mb-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props} />
))
Label.displayName = "Label"

/* --- Input --- */
const Input = React.forwardRef(({ className, type, hasError, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-none border-b border-border/40 bg-transparent px-0 py-2 text-[15px] font-light ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        hasError && "border-error focus-visible:border-error",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

/* --- Textarea --- */
const Textarea = React.forwardRef(({ className, hasError, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-none border-b border-border/40 bg-transparent px-0 py-2 text-[15px] font-light ring-offset-background placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y",
        hasError && "border-error focus-visible:border-error",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

/* --- Checkbox --- */
const Checkbox = React.forwardRef(({ className, hasError, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "peer h-5 w-5 shrink-0 appearance-none border border-border bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary checked:border-primary checked:bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%2220%206%209%2017%204%2012%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-center bg-no-repeat transition-all",
        hasError && "border-error",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Checkbox.displayName = "Checkbox"

/* --- Radio --- */
const Radio = React.forwardRef(({ className, hasError, ...props }, ref) => {
  return (
    <input
      type="radio"
      className={cn(
        "peer h-5 w-5 shrink-0 appearance-none rounded-full border border-border bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:border-primary checked:border-[6px] transition-all",
        hasError && "border-error",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Radio.displayName = "Radio"

/* --- Switch --- */
const Switch = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" ref={ref} {...props} />
      <div className={cn(
        "w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary",
        className
      )}></div>
    </label>
  )
})
Switch.displayName = "Switch"

/* --- Form Field Wrapper --- */
function FormField({ label, helperText, error, success, className, children }) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && <Label className={error ? "text-error" : ""}>{label}</Label>}
      {children}
      {error && <p className="text-caption text-error mt-1">{error}</p>}
      {success && !error && <p className="text-caption text-success mt-1">{success}</p>}
      {helperText && !error && !success && <p className="text-caption text-muted-foreground mt-1">{helperText}</p>}
    </div>
  )
}

export { Label, Input, Textarea, Checkbox, Radio, Switch, FormField }
