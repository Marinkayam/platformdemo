
import { invoiceData } from "@/data/invoices";
import { mockSmartConnections } from "@/data/smartConnections";
import { Invoice } from "@/types/invoice";

export interface AnalyticsSummary {
  paid: number;
  upcoming: number;
  pastDue: number;
  totalInPortal: number;
  avgTimeToPayment: number;
}

export interface KPIData {
  rejectionRate: number;
  zeroTouchPercentage: number;
}

export interface ExceptionData {
  rtpExceptions: {
    count: number;
    totalAmount: number;
  };
  scExceptions: {
    connectionCount: number;
    affectedInvoices: number;
  };
  duplicateInvoices: number;
  poMismatches: number;
  missingData: number;
}

export function calculateAnalyticsSummary(): AnalyticsSummary {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let paid = 0;
  let upcoming = 0;
  let pastDue = 0;
  let totalInPortal = 0;
  let totalPaymentDays = 0;
  let paidInvoicesCount = 0;

  invoiceData.forEach((invoice: Invoice) => {
    // Count invoices found in portal
    if (invoice.portal) {
      totalInPortal++;
    }

    // Calculate payment timing
    if (invoice.status === 'Paid' || invoice.status === 'Settled') {
      paid++;
      
      // Calculate days from creation to payment for avg time-to-payment
      const creationDate = new Date(invoice.creationDate);
      const dueDate = new Date(invoice.dueDate);
      const daysDiff = Math.floor((dueDate.getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24));
      totalPaymentDays += daysDiff;
      paidInvoicesCount++;
    } else {
      const dueDate = new Date(invoice.dueDate);
      if (dueDate < today) {
        pastDue++;
      } else {
        upcoming++;
      }
    }
  });

  const avgTimeToPayment = paidInvoicesCount > 0 ? totalPaymentDays / paidInvoicesCount : 0;

  return {
    paid,
    upcoming,
    pastDue,
    totalInPortal,
    avgTimeToPayment: Math.round(avgTimeToPayment * 10) / 10
  };
}

export function calculateKPIData(): KPIData {
  const totalInvoices = invoiceData.length;
  const rejectedInvoices = invoiceData.filter(invoice => 
    invoice.status === 'Rejected by Buyer' || invoice.status === 'Rejected by Monto'
  ).length;

  const autoProcessedInvoices = invoiceData.filter(invoice => 
    invoice.status === 'Paid' || invoice.status === 'Settled' || invoice.status === 'RTP Sent'
  ).length;

  const rejectionRate = totalInvoices > 0 ? (rejectedInvoices / totalInvoices) * 100 : 0;
  const zeroTouchPercentage = totalInvoices > 0 ? (autoProcessedInvoices / totalInvoices) * 100 : 0;

  return {
    rejectionRate: Math.round(rejectionRate * 10) / 10,
    zeroTouchPercentage: Math.round(zeroTouchPercentage * 10) / 10
  };
}

export function calculateExceptionData(): ExceptionData {
  // RTP Exceptions - invoices needing manual attention
  const rtpExceptionInvoices = invoiceData.filter(invoice => 
    invoice.status === 'Pending Action' || 
    invoice.status === 'RTP Prepared' ||
    invoice.hasExceptions
  );

  const rtpTotalAmount = rtpExceptionInvoices.reduce((sum, invoice) => sum + invoice.total, 0);

  // Smart Connection Exceptions
  const scExceptions = mockSmartConnections.filter(connection => 
    connection.status === 'Needs Attention' || connection.status === 'Disconnected'
  );

  const affectedInvoices = invoiceData.filter(invoice => 
    invoice.status === 'Awaiting SC'
  ).length;

  return {
    rtpExceptions: {
      count: rtpExceptionInvoices.length,
      totalAmount: rtpTotalAmount
    },
    scExceptions: {
      connectionCount: scExceptions.length,
      affectedInvoices
    },
    duplicateInvoices: 5,
    poMismatches: 3,
    missingData: 2
  };
}

export function getRecentInvoices(): Invoice[] {
  return invoiceData
    .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
    .slice(0, 5);
}
