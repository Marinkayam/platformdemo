
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });
}
