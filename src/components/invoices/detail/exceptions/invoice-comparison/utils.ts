
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
      
      // For number fields, check if the difference is significant (more than 0.01)
      if (typeof firstValue === 'number' && typeof value === 'number') {
        return Math.abs(firstValue - value) > 0.01;
      }
      
      return firstValue !== value;
    });
    
    if (hasDifference) {
      result[field.key as string] = true;
    }
  });
  
  return result;
}

/**
 * Categorize fields by importance and if they have differences
 */
export function categorizeFields(
  fields: Array<{ key: keyof Invoice, label: string }>, 
  differences: Record<string, boolean>
) {
  // Define critical fields that should be prioritized
  const criticalFields = ['number', 'total', 'buyer', 'status', 'dueDate'];
  
  return {
    // Fields that have differences and are critical
    criticalDifferences: fields.filter(f => 
      differences[f.key as string] && criticalFields.includes(f.key as string)
    ),
    // Fields that have differences but are not critical
    otherDifferences: fields.filter(f => 
      differences[f.key as string] && !criticalFields.includes(f.key as string)
    ),
    // Fields that don't have differences
    identical: fields.filter(f => !differences[f.key as string])
  };
}

/**
 * Returns a recommendation based on the invoice properties
 * Higher score is better
 */
export function scoreInvoice(invoice: Invoice): number {
  let score = 0;
  
  // Prefer newer invoices
  score += new Date(invoice.creationDate).getTime() / 1000000;
  
  // Prefer approved invoices
  if (invoice.status === 'Approved by Buyer') {
    score += 100;
  }
  
  // Penalize invoices with exceptions
  if (invoice.exceptions?.length) {
    score -= invoice.exceptions.length * 10;
  }
  
  return score;
}
