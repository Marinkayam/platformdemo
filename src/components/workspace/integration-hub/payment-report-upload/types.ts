
import { PortalUser } from '@/types/portalUser';

export type PaymentReportWizardStepId = 'upload' | 'mapping' | 'review' | 'summary' | 'connecting';

export interface Step {
  id: PaymentReportWizardStepId;
  name: string;
}

export interface ValidatedPaymentRecord extends Partial<PaymentReportRecord> {
  _row: number;
  _errors: string[];
  _warnings: string[];
  _status: 'valid' | 'warning' | 'error';
}

export interface PaymentReportField {
  key: keyof PaymentReportRecord;
  label: string;
  required: boolean;
  conditionallyRequired?: string;
  description: string;
}

export interface PaymentReportRecord {
  invoiceNumber: string;
  issueDate: string;
  dueDate?: string;
  paymentTerms?: string;
  billingCurrency: string;
  receivable: string;
  payable: string;
  totalAmount: number;
  totalRemainingAmount?: number;
  status?: string;
  poNumber?: string;
  taxTotal?: number;
  type?: string;
  transactionId?: string;
}

export const PAYMENT_REPORT_FIELDS: PaymentReportField[] = [
  { key: 'invoiceNumber', label: 'Invoice Number', required: true, description: 'Invoice Number (string)' },
  { key: 'issueDate', label: 'Issue Date', required: true, description: 'Invoice Issue Date (date)' },
  { key: 'dueDate', label: 'Due Date', required: false, conditionallyRequired: 'Payment Terms', description: 'Invoice Due Date. Mandatory if no Payment Terms (date)' },
  { key: 'paymentTerms', label: 'Payment Terms', required: false, conditionallyRequired: 'Due Date', description: 'Payment Terms. Mandatory if no Due Date (string)' },
  { key: 'billingCurrency', label: 'Billing Currency', required: true, description: 'Invoice Billing Currency (string)' },
  { key: 'receivable', label: 'Receivable', required: true, description: 'Supplier Name (string)' },
  { key: 'payable', label: 'Payable', required: true, description: 'Buyer Name (string)' },
  { key: 'totalAmount', label: 'Total Amount', required: true, description: 'Invoice Total Amount (number)' },
  { key: 'totalRemainingAmount', label: 'Total Remaining Amount', required: false, conditionallyRequired: 'Status', description: 'Total Remaining Amount. Mandatory if no Status (number)' },
  { key: 'status', label: 'Status', required: false, conditionallyRequired: 'Total Remaining Amount', description: 'Invoice Status in ERP. Mandatory if no Total Remaining Amount (PAID, OPEN, DRAFT, string)' },
  { key: 'poNumber', label: 'PO Number', required: false, description: 'Related Purchase Order Number (string)' },
  { key: 'taxTotal', label: 'Tax Total', required: false, description: 'Tax Total Amount (number)' },
  { key: 'type', label: 'Type', required: false, description: 'INVOICE, CREDIT. By default derived from Total Amount (string)' },
  { key: 'transactionId', label: 'Transaction ID', required: false, description: 'Unique transaction ID in ERP (string)' },
];
