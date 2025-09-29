
import { useState } from "react";
import { PurchaseOrderFilters, defaultPurchaseOrderFilters } from "@/components/purchase-orders/filters/types";
import { toast } from "@/hooks/use-toast";

export function usePurchaseOrderFiltersState(
  onFilterChange: (filters: PurchaseOrderFilters) => void
) {
  const [filters, setFilters] = useState<PurchaseOrderFilters>(defaultPurchaseOrderFilters);
  
  const handleFilterChange = (key: keyof PurchaseOrderFilters, value: string | string[]) => {
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
    } else if (key.startsWith("paymentTerms")) {
      newFilters.paymentTerms = newFilters.paymentTerms.filter(p => p !== value);
    } else if (key === "po-number") {
      newFilters.poNumber = "";
    } else if (key === "created-date") {
      newFilters.createdDate = { from: "", to: "" };
    } else if (key === "due-date") {
      newFilters.dueDate = { from: "", to: "" };
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    setFilters(defaultPurchaseOrderFilters);
    onFilterChange(defaultPurchaseOrderFilters);
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
