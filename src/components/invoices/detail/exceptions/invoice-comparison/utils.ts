
import { Invoice } from "@/types/invoice";

/**
 * Format date to "Jan 16, 2025 12:05" format
 */
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

/**
 * Find the newest invoice by creation date
 */
export function findNewestInvoice(invoices: Invoice[]): Invoice | undefined {
  if (invoices.length === 0) return undefined;
  
  return invoices.reduce((newest, current) => 
    new Date(current.creationDate) > new Date(newest.creationDate) ? current : newest
  , invoices[0]);
}

/**
 * Find differences between invoices based on specified fields
 */
export function findDifferences(invoices: Invoice[], fields: Array<{ key: keyof Invoice, label: string }>) {
  const result: Record<string, boolean> = {};
    
  if (invoices.length < 2) return result;
  
  // Compare all invoices against the first one
  const first = invoices[0];
  
  fields.forEach(field => {
    const firstValue = first[field.key];
    
    // Check if any invoice has a different value for this field
    const hasDifference = invoices.slice(1).some(invoice => {
      const value = invoice[field.key];
      return firstValue !== value;
    });
    
    if (hasDifference) {
      result[field.key as string] = true;
    }
  });
  
  return result;
}
