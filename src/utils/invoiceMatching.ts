
import { Invoice } from "@/types/invoice";
import { PortalRecord } from "@/types/portalRecord";

export interface InvoiceMatch {
  invoice: Invoice;
  score: number;
  matchReasons: MatchReason[];
}

export interface MatchReason {
  type: 'partial-id' | 'amount-match' | 'date-proximity' | 'currency-match' | 'tax-match';
  label: string;
  confidence: 'high' | 'medium' | 'low';
}

export function getInvoiceSuggestions(
  portalRecord: PortalRecord,
  invoices: Invoice[],
  limit: number = 5
): InvoiceMatch[] {
  const matches: InvoiceMatch[] = [];

  invoices.forEach(invoice => {
    const matchReasons: MatchReason[] = [];
    let score = 0;

    // Partial ID matching
    const partialIdMatch = checkPartialIdMatch(portalRecord.portalRecordId, invoice);
    if (partialIdMatch) {
      matchReasons.push(partialIdMatch);
      score += partialIdMatch.confidence === 'high' ? 30 : 20;
    }

    // Amount matching
    const amountMatch = checkAmountMatch(portalRecord, invoice);
    if (amountMatch) {
      matchReasons.push(amountMatch);
      score += 25;
    }

    // Currency matching
    if (portalRecord.currency === invoice.currency) {
      matchReasons.push({
        type: 'currency-match',
        label: 'Amount Match',
        confidence: 'medium'
      });
      score += 10;
    }

    // Date proximity matching
    const dateMatch = checkDateProximity(portalRecord, invoice);
    if (dateMatch) {
      matchReasons.push(dateMatch);
      score += dateMatch.confidence === 'high' ? 15 : 10;
    }

    // Tax matching (if available)
    const taxMatch = checkTaxMatch(portalRecord, invoice);
    if (taxMatch) {
      matchReasons.push(taxMatch);
      score += 15;
    }

    // Only include invoices with at least one match reason
    if (matchReasons.length > 0) {
      matches.push({
        invoice,
        score,
        matchReasons
      });
    }
  });

  // Sort by score (descending) and return top matches
  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function checkPartialIdMatch(portalRecordId: string, invoice: Invoice): MatchReason | null {
  const recordNumbers = portalRecordId.replace(/[^\d]/g, '');
  const invoiceNumbers = invoice.number?.replace(/[^\d]/g, '') || '';
  
  if (!recordNumbers || !invoiceNumbers) return null;

  // Exact number match
  if (recordNumbers === invoiceNumbers) {
    return {
      type: 'partial-id',
      label: 'Exact ID Match',
      confidence: 'high'
    };
  }

  // Partial match (at least 3 digits)
  if (recordNumbers.length >= 3 && invoiceNumbers.includes(recordNumbers)) {
    return {
      type: 'partial-id',
      label: 'Partial ID Match',
      confidence: 'medium'
    };
  }

  // Reverse partial match
  if (invoiceNumbers.length >= 3 && recordNumbers.includes(invoiceNumbers)) {
    return {
      type: 'partial-id',
      label: 'Partial ID Match',
      confidence: 'medium'
    };
  }

  return null;
}

function checkAmountMatch(portalRecord: PortalRecord, invoice: Invoice): MatchReason | null {
  if (Math.abs(portalRecord.total - invoice.total) < 0.01) {
    return {
      type: 'amount-match',
      label: 'Exact Amount',
      confidence: 'high'
    };
  }
  return null;
}

function checkDateProximity(portalRecord: PortalRecord, invoice: Invoice): MatchReason | null {
  const recordDate = new Date(portalRecord.lastSynced);
  const invoiceDate = new Date(invoice.creationDate);
  const daysDiff = Math.abs((recordDate.getTime() - invoiceDate.getTime()) / (1000 * 60 * 60 * 24));

  if (daysDiff <= 7) {
    return {
      type: 'date-proximity',
      label: 'Recent Date',
      confidence: 'high'
    };
  } else if (daysDiff <= 30) {
    return {
      type: 'date-proximity',
      label: 'Similar Date',
      confidence: 'medium'
    };
  }

  return null;
}

function checkTaxMatch(portalRecord: PortalRecord, invoice: Invoice): MatchReason | null {
  // This would need tax information from portal record
  // For now, we'll skip this check since tax isn't in the portal record type
  return null;
}

export function extractSearchTermFromPortalRecord(portalRecordId: string): string {
  // Extract numeric part for initial search
  const numbers = portalRecordId.replace(/[^\d]/g, '');
  return numbers || portalRecordId;
}
