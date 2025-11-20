import * as React from "react"
import { cn } from "@/lib/utils"

interface SelectableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  onSelect?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

/**
 * SelectableCard - A reusable card component with selection and hover states
 *
 * Features:
 * - Consistent styling with border, shadow, and padding
 * - Interactive hover effects with shadow transition
 * - Selection state with primary border highlight
 * - Disabled state support
 * - Fully accessible with click handlers
 *
 * Usage:
 * ```tsx
 * <SelectableCard
 *   selected={isSelected}
 *   onSelect={() => handleSelect(id)}
 * >
 *   <div>Your content here</div>
 * </SelectableCard>
 * ```
 */
const SelectableCard = React.forwardRef<HTMLDivElement, SelectableCardProps>(
  ({ className, selected = false, onSelect, disabled = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "relative p-4 rounded-lg border bg-white transition-all",
          // Shadow
          "shadow-sm",
          // Interactive states (when not disabled)
          !disabled && "cursor-pointer hover:shadow-md",
          // Border states
          selected
            ? "border-primary border-2"
            : "border-gray-200 hover:border-primary/30",
          // Disabled state
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={() => !disabled && onSelect?.()}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SelectableCard.displayName = "SelectableCard"

/**
 * SelectableCardContent - Content wrapper for SelectableCard with consistent spacing
 */
const SelectableCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-3", className)}
    {...props}
  />
))
SelectableCardContent.displayName = "SelectableCardContent"

/**
 * SelectableCardField - Field wrapper for label/value pairs
 */
const SelectableCardField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-0", className)}
    {...props}
  />
))
SelectableCardField.displayName = "SelectableCardField"

/**
 * SelectableCardLabel - Label for field in SelectableCard
 */
const SelectableCardLabel = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-xs text-gray-500 font-medium", className)}
    {...props}
  />
))
SelectableCardLabel.displayName = "SelectableCardLabel"

/**
 * SelectableCardValue - Value for field in SelectableCard
 */
const SelectableCardValue = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-700", className)}
    {...props}
  />
))
SelectableCardValue.displayName = "SelectableCardValue"

export {
  SelectableCard,
  SelectableCardContent,
  SelectableCardField,
  SelectableCardLabel,
  SelectableCardValue,
}
