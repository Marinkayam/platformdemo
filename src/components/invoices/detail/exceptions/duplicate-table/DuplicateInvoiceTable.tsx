
import { useState, useEffect } from "react";
import { Invoice } from "@/types/invoice";
import { Table } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { RadioGroup } from "@/components/ui/radio-group";
import { InvoiceTableHeader } from "./TableHeader";
import { InvoiceTableBody } from "./TableBody";
import { TableActions } from "./TableActions";
import { formatDate } from "./utils";

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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Initialize selection based on props and default selection
  useEffect(() => {
    if (selectedInvoices.length > 0) {
      setSelectedId(selectedInvoices[0].id);
    } else if (defaultSelectedInvoice) {
      setSelectedId(defaultSelectedInvoice.id);
      
      // Only notify parent of default selection if not preventing auto-advance
      if (!preventAutoAdvance) {
        setTimeout(() => {
          const defaultSelected = invoices.filter(inv => inv.id === defaultSelectedInvoice.id);
          if (defaultSelected.length > 0) {
            onSelect(defaultSelected);
          }
        }, 0);
      }
    }
  }, [selectedInvoices, defaultSelectedInvoice, invoices, onSelect, preventAutoAdvance]);
  
  const handleSelectChange = (id: string) => {
    setSelectedId(id);
    // Update selection but don't auto-advance
  };
  
  const handleConfirmSelection = () => {
    if (!selectedId) {
      toast({
        title: "Selection required",
        description: "Please select an invoice to continue.",
        variant: "destructive",
      });
      return;
    }
    
    const selectedInvoice = invoices.find(inv => inv.id === selectedId);
    if (selectedInvoice) {
      onSelect([selectedInvoice]);
    }
  };

  const handleClearSelection = () => {
    setSelectedId(null);
    onSelect([]);
  };
  
  return (
    <div className="space-y-6">
      <div className="border rounded-lg overflow-hidden">
        <RadioGroup value={selectedId || ""} onValueChange={handleSelectChange}>
          <Table>
            <InvoiceTableHeader />
            <InvoiceTableBody
              invoices={invoices}
              selectedId={selectedId}
              formatDate={formatDate}
              onContactSupport={onContactSupport}
            />
          </Table>
        </RadioGroup>
      </div>
      
      <TableActions 
        onClearSelection={handleClearSelection}
        onExcludeAll={onExcludeAll}
        onConfirmSelection={handleConfirmSelection}
      />
    </div>
  );
}
