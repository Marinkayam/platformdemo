
import { useState, useEffect } from "react";
import { Invoice } from "@/types/invoice";
import { toast } from "@/hooks/use-toast";

interface UseInvoiceSelectionProps {
  invoices: Invoice[];
  selectedInvoices?: Invoice[];
  defaultSelectedInvoice?: Invoice;
  preventAutoAdvance?: boolean;
  onSelect: (selected: Invoice[]) => void;
}

export function useInvoiceSelection({
  invoices,
  selectedInvoices = [],
  defaultSelectedInvoice,
  preventAutoAdvance = false,
  onSelect
}: UseInvoiceSelectionProps) {
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
  
  return {
    selectedId,
    handleSelectChange,
    handleConfirmSelection,
    handleClearSelection
  };
}
