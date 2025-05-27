
import { useState, useMemo } from "react";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { PurchaseOrderFilters } from "@/components/purchase-orders/filters/types";

export function usePurchaseOrderFiltering(purchaseOrders: PurchaseOrder[], activeTab: string) {
  const [filters, setFilters] = useState<PurchaseOrderFilters>({
    status: [],
    buyer: [],
    portal: [],
    poNumber: ""
  });

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
    if (filters.status.length > 0) {
      filtered = filtered.filter(po => filters.status.includes(po.status));
    }

    if (filters.buyer.length > 0) {
      filtered = filtered.filter(po => 
        filters.buyer.some(buyer => po.buyerName.toLowerCase().includes(buyer.toLowerCase()))
      );
    }

    if (filters.portal.length > 0) {
      filtered = filtered.filter(po => filters.portal.includes(po.portal));
    }

    if (filters.poNumber) {
      filtered = filtered.filter(po => 
        po.poNumber.toLowerCase().includes(filters.poNumber.toLowerCase())
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
