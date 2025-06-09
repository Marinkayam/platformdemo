import { ToastVariant } from "./types"

let count = 0

export function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

export function getMontoClassName(variant: ToastVariant, className?: string): string {
  let montoClassName = className || ""
  
  switch (variant) {
    case "success":
      montoClassName = `border-success-main bg-success-lighter text-success-dark ${className || ""}`.trim()
      break
    case "warning":
      montoClassName = `border-warning-main bg-warning-lighter text-warning-dark ${className || ""}`.trim()
      break
    case "info":
      montoClassName = `border-info-main bg-info-lighter text-info-dark ${className || ""}`.trim()
      break
    case "destructive":
      montoClassName = `border-error-main bg-error-lighter text-error-dark ${className || ""}`.trim()
      break
    default:
      montoClassName = className || ""
  }

  return montoClassName
}
