
import { useState, useMemo } from "react";
import { PurchaseOrder } from "@/types/purchase-orders";
import { PurchaseOrderFilters } from "@/components/purchase-orders/filters/types";

export function usePurchaseOrderFiltering(purchaseOrders: PurchaseOrder[], activeTab: string) {
  const [filters, setFilters] = useState<PurchaseOrderFilters>({
    status: [],
    buyer: [],
    portal: [],
    poNumber: "",
    paymentTerms: [],
    createdDate: { from: "", to: "" },
    dueDate: { from: "", to: "" }
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

    if (filters.paymentTerms && filters.paymentTerms.length > 0) {
      filtered = filtered.filter(po => filters.paymentTerms.includes(po.paymentTerms));
    }

    if (filters.createdDate && (filters.createdDate.from || filters.createdDate.to)) {
      filtered = filtered.filter(po => {
        const poDate = new Date(po.createdDate);
        const fromDate = filters.createdDate.from ? new Date(filters.createdDate.from) : null;
        const toDate = filters.createdDate.to ? new Date(filters.createdDate.to) : null;

        if (fromDate && poDate < fromDate) return false;
        if (toDate && poDate > toDate) return false;
        return true;
      });
    }

    return filtered;
  }, [purchaseOrders, activeTab, filters]);

  return {
    filters,
    setFilters,
    filteredPurchaseOrders
  };
}
