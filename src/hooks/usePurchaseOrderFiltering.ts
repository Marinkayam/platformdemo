
import { useState, useMemo } from "react";
import { PurchaseOrder, PurchaseOrderFilters } from "@/types/purchaseOrder";

export function usePurchaseOrderFiltering(purchaseOrders: PurchaseOrder[], activeTab: string) {
  const [filters, setFilters] = useState<PurchaseOrderFilters>({});

  const filteredPurchaseOrders = useMemo(() => {
    let filtered = [...purchaseOrders];

    // Apply tab-based filtering first
    switch (activeTab) {
      case "new":
        filtered = filtered.filter(po => po.status === "New");
        break;
      case "low-funds":
        filtered = filtered.filter(po => 
          po.status === "Partially Invoiced" || po.status === "Fully Invoiced"
        );
        break;
      default:
        // "found" tab shows all POs
        break;
    }

    // Apply additional filters
    if (filters.buyerName) {
      filtered = filtered.filter(po => 
        po.buyerName.toLowerCase().includes(filters.buyerName!.toLowerCase())
      );
    }

    if (filters.portal) {
      filtered = filtered.filter(po => po.portal === filters.portal);
    }

    if (filters.status) {
      filtered = filtered.filter(po => po.status === filters.status);
    }

    if (filters.poNumber) {
      filtered = filtered.filter(po => 
        po.poNumber.toLowerCase().includes(filters.poNumber!.toLowerCase())
      );
    }

    return filtered;
  }, [purchaseOrders, activeTab, filters]);

  return {
    filters,
    setFilters,
    filteredPurchaseOrders
  };
}
