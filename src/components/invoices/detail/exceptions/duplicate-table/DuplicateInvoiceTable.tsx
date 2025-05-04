
import { Invoice } from "@/types/invoice";
import { InvoiceTableContainer } from "./InvoiceTableContainer";
import { TableActions } from "./TableActions";
import { useInvoiceSelection } from "./hooks/useInvoiceSelection";

interface DuplicateInvoiceTableProps {
  invoices: Invoice[];
  onSelect: (selected: Invoice[]) => void;
  onSelectSingle: (invoice: Invoice) => void;
  onExcludeAll: () => void;
  currentInvoice: Invoice;
  selectedInvoices?: Invoice[];
  defaultSelectedInvoice?: Invoice;
  onContactSupport?: (invoice: Invoice) => void;
  preventAutoAdvance?: boolean;
}

export function DuplicateInvoiceTable({ 
  invoices, 
  onSelect, 
  onSelectSingle, 
  onExcludeAll,
  currentInvoice, 
  selectedInvoices = [],
  defaultSelectedInvoice,
  onContactSupport,
  preventAutoAdvance = false
}: DuplicateInvoiceTableProps) {
  const {
    selectedId,
    handleSelectChange,
    handleConfirmSelection,
    handleClearSelection
  } = useInvoiceSelection({
    invoices,
    selectedInvoices,
    defaultSelectedInvoice,
    preventAutoAdvance,
    onSelect
  });
  
  return (
    <div className="space-y-6">
      <InvoiceTableContainer
        invoices={invoices}
        selectedId={selectedId}
        onSelectChange={handleSelectChange}
        onContactSupport={onContactSupport}
      />
      
      <TableActions 
        onClearSelection={handleClearSelection}
        onExcludeAll={onExcludeAll}
        onConfirmSelection={handleConfirmSelection}
      />
    </div>
  );
}
