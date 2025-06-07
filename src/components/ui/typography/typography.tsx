
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 
    | "h1" 
    | "h2" 
    | "h3" 
    | "h4" 
    | "h5" 
    | "h6"
    | "subtitle1"
    | "subtitle2" 
    | "body1"
    | "body2"
    | "body3"
    | "caption"
    | "overline"
    | "button"
    | "smallText"
  component?: keyof JSX.IntrinsicElements
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "body1", component, children, ...props }, ref) => {
    const variantClasses = {
      h1: "text-4xl md:text-5xl lg:text-6xl font-medium text-grey-900",
      h2: "text-3xl md:text-4xl lg:text-5xl font-medium text-grey-900", 
      h3: "text-2xl font-medium text-grey-900",
      h4: "text-xl font-bold text-grey-800",
      h5: "text-lg font-semibold text-grey-800",
      h6: "text-base font-medium text-grey-800",
      subtitle1: "text-base font-semibold text-grey-800",
      subtitle2: "text-sm font-normal text-grey-600",
      body1: "text-base font-normal text-grey-700",
      body2: "text-sm font-normal text-grey-600",
      body3: "text-sm font-light text-grey-700",
      caption: "text-xs font-normal text-grey-500",
      overline: "text-overline font-medium uppercase tracking-wide text-grey-600",
      button: "text-xs font-medium",
      smallText: "text-small-text font-normal text-grey-500"
    }

    const Component = component || (variant.startsWith('h') ? variant : 'p')

    return React.createElement(
      Component,
      {
        className: cn(variantClasses[variant], className),
        ref,
        ...props
      },
      children
    )
  }
)

Typography.displayName = "Typography"

export { Typography }
