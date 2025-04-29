
export type ExceptionType = 'PO_CLOSED' | 'PO_INSUFFICIENT_FUNDS' | 'MISSING_INFORMATION' | 'VALIDATION_ERROR' | 'DUPLICATE_INVOICE';

export interface Exception {
  id: string;
  type: ExceptionType;
  message: string;
  details: string;
  createdAt: string;
  resolved?: boolean;
  resolvedAt?: string;
}

export interface ExceptionResolution {
  id: string;
  exceptionId: string;
  action: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT';
  timestamp: string;
  note?: string;
  fileAttachment?: {
    id: string;
    name: string;
    type: string;
    url: string;
  };
}
