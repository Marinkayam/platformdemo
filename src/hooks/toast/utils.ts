
import { ToastVariant } from "./types"

let count = 0

export function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

export function getMontoClassName(_variant: ToastVariant, className?: string): string {
  // The variant styles are now handled by CVA in `src/components/ui/toast.tsx`.
  // This function now just passes through any extra class names.
  return className || ""
}
