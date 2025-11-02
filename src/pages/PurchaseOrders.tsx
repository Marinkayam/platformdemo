import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PurchaseOrderHeader } from "@/components/purchase-orders/PurchaseOrderHeader";
import { PurchaseOrderTable } from "@/components/purchase-orders/PurchaseOrderTable";
import { purchaseOrderData } from "@/data/purchaseOrders";
import { usePurchaseOrderFiltering } from "@/hooks/usePurchaseOrderFiltering";

export default function PurchaseOrders() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("found");
  
  // Set active tab based on URL search params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get("status");

    if (status === "new") {
      setActiveTab("new");
    } else {
      setActiveTab("found");
    }
  }, [location.search]);

  // Use custom hook for filtering
  const { filters, setFilters, filteredPurchaseOrders } = usePurchaseOrderFiltering(purchaseOrderData, activeTab);

  // Handle search change
  const handleSearchChange = (value: string) => {
    setFilters(prevFilters => ({ ...prevFilters, poNumber: value }));
  };

  // Calculate counts for tabs
  const newCount = purchaseOrderData.filter(po => po.status === "new").length;

  // Update tabs with counts - changed "Found by Monto" to "All POs"
  const tabsWithCounts = [
    { id: "found", label: "All POs", count: purchaseOrderData.length },
    { id: "new", label: "New POs", count: newCount },
  ];

  return (
    <div className="space-y-6">
      <PurchaseOrderHeader 
        tabs={tabsWithCounts}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onFilterChange={setFilters}
        purchaseOrderCount={filteredPurchaseOrders.length}
        searchValue={filters.poNumber || ""}
        onSearchChange={handleSearchChange}
      />
      
      <PurchaseOrderTable 
        purchaseOrders={filteredPurchaseOrders} 
      />
    </div>
  );
}
