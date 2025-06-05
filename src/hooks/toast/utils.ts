
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
      montoClassName = `border-success-main bg-success-main text-white ${className || ""}`.trim()
      break
    case "warning":
      montoClassName = `border-warning-main bg-warning-main text-grey-900 ${className || ""}`.trim()
      break
    case "info":
      montoClassName = `border-primary-lighter bg-primary-lighter text-primary-darker ${className || ""}`.trim()
      break
    case "destructive":
      montoClassName = `border-error-main bg-error-main text-white ${className || ""}`.trim()
      break
    default:
      montoClassName = className || ""
  }

  return montoClassName
}
