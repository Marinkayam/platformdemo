
import { PortalRecord } from "@/types/portalRecord";

export interface EnhancedMatchInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PortalRecord;
  onMatch: (invoiceId: string) => void;
  onIgnore: () => void;
  onMatchAndCreateRTP: (pdfFile: File) => void;
  contextSource?: 'detail-page' | 'table-row' | 'dashboard';
}

export interface UseModalStateReturn {
  selectedInvoiceId: string;
  setSelectedInvoiceId: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedPortal: string;
  setSelectedPortal: (portal: string) => void;
  selectedBuyer: string;
  setSelectedBuyer: (buyer: string) => void;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  debouncedSearchTerm: string;
  resetForm: () => void;
}
