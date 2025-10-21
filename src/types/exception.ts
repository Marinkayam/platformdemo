export type ExceptionType = 'PO_CLOSED' | 'PO_INSUFFICIENT_FUNDS' | 'MISSING_INFORMATION' | 'VALIDATION_ERROR' | 'DUPLICATE_INVOICE' | 'EXTRA_DATA' | 'PO_VALIDATION' | 'INVOICE_DATA';

export interface Exception {
  id: string;
  type: ExceptionType;
  message: string;
  details: string;
  createdAt: string;
  resolved?: boolean;
  resolvedAt?: string;
  missingFields?: string[]; // Added for MISSING_INFORMATION type
}

export interface ExceptionResolution {
  id: string;
  exceptionId: string;
  action: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT' | 'EXCLUDED';
  timestamp: string;
  note?: string;
  fileAttachment?: {
    id: string;
    name: string;
    type: string;
    url: string;
  };
}
