
import { useState } from "react";
import { InvoiceFilters, defaultFilters } from "@/components/invoices/filters/types";
import { toast } from "@/hooks/use-toast";

export function useInvoiceFiltersState(
  onFilterChange: (filters: InvoiceFilters) => void
) {
  const [filters, setFilters] = useState<InvoiceFilters>(defaultFilters);
  
  const handleFilterChange = (key: keyof InvoiceFilters, value: string | string[]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleRemoveFilter = (key: string, value: string) => {
    const newFilters = { ...filters };
    
    if (key.startsWith("status")) {
      newFilters.status = newFilters.status.filter(s => s !== value);
    } else if (key.startsWith("buyer")) {
      newFilters.buyer = newFilters.buyer.filter(b => b !== value);
    } else if (key.startsWith("portal")) {
      newFilters.portal = newFilters.portal.filter(p => p !== value);
    } else if (key === "date-range") {
      newFilters.dueDate = { from: "", to: "" };
    } else if (key === "transaction-type") {
      newFilters.transactionType = "All";
    } else if (key.startsWith("owner")) {
      newFilters.owner = newFilters.owner.filter(o => o !== value);
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
    toast({
      title: "Filters reset",
      description: "All filters have been reset to default values",
    });
  };

  return {
    filters,
    handleFilterChange,
    handleRemoveFilter,
    handleResetFilters
  };
}
