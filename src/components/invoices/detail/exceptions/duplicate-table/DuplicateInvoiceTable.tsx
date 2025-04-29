
import { useState, useEffect } from "react";
import { Invoice } from "@/types/invoice";
import { Table } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
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
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  
  // Initialize selections based on props and default selection
  useEffect(() => {
    const initialSelection: Record<string, boolean> = {};
    
    // Add pre-selections from props
    selectedInvoices.forEach(inv => {
      initialSelection[inv.id] = true;
    });
    
    // Add default selection if provided and not already selected
    if (defaultSelectedInvoice && selectedInvoices.length === 0) {
      initialSelection[defaultSelectedInvoice.id] = true;
      
      // Only notify parent of default selection if not preventing auto-advance
      if (!preventAutoAdvance) {
        setTimeout(() => {
          const defaultSelected = invoices.filter(inv => initialSelection[inv.id]);
          if (defaultSelected.length > 0) {
            onSelect(defaultSelected);
          }
        }, 0);
      }
    }
    
    setSelected(initialSelection);
  }, [selectedInvoices, defaultSelectedInvoice, invoices, onSelect, preventAutoAdvance]);
  
  const handleToggle = (id: string) => {
    const newSelected = { ...selected };
    
    // If already selected, unselect
    if (newSelected[id]) {
      delete newSelected[id];
    } else {
      newSelected[id] = true;
    }
    
    setSelected(newSelected);
  };
  
  const handleCompare = () => {
    const selectedIds = Object.keys(selected);
    if (selectedIds.length === 0) {
      toast({
        title: "Selection required",
        description: "Please select at least one invoice to compare.",
        variant: "destructive",
      });
      return;
    }
    
    const selectedInvoices = invoices.filter(inv => selected[inv.id]);
    onSelect(selectedInvoices);
  };

  const handleSelectSingle = (invoice: Invoice) => {
    // Clear any existing selections first
    const newSelected = { [invoice.id]: true };
    setSelected(newSelected);
    
    // Notify parent of single selection
    onSelectSingle(invoice);
  };
  
  const handleClearSelection = () => {
    setSelected({});
    onSelect([]);
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <InvoiceTableHeader />
          <InvoiceTableBody
            invoices={invoices}
            selected={selected}
            onToggle={handleToggle}
            onSelectSingle={handleSelectSingle}
            onContactSupport={onContactSupport}
            formatDate={formatDate}
          />
        </Table>
      </div>
      
      <TableActions 
        onClearSelection={handleClearSelection}
        onExcludeAll={onExcludeAll}
        onCompare={handleCompare}
      />
    </div>
  );
}
