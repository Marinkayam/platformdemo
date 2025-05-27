
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
    } else if (status === "low-funds") {
      setActiveTab("low-funds");
    } else {
      setActiveTab("found");
    }
  }, [location.search]);
  
  // Use custom hook for filtering
  const { filters, setFilters, filteredPurchaseOrders } = usePurchaseOrderFiltering(purchaseOrderData, activeTab);

  // Calculate counts for tabs
  const newCount = purchaseOrderData.filter(po => po.status === "New").length;
  const lowFundsCount = purchaseOrderData.filter(po => 
    po.status === "Partially Invoiced" || po.status === "Fully Invoiced"
  ).length;
  
  // Update tabs with counts
  const tabsWithCounts = [
    { id: "found", label: "Found by Monto", count: purchaseOrderData.length },
    { id: "new", label: "New POs", count: newCount },
    { id: "low-funds", label: "Low Funds", count: lowFundsCount },
  ];

  return (
    <div>
      <PurchaseOrderHeader 
        tabs={tabsWithCounts}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onFilterChange={setFilters}
        purchaseOrderCount={filteredPurchaseOrders.length}
      />
      
      <PurchaseOrderTable 
        purchaseOrders={filteredPurchaseOrders} 
      />
    </div>
  );
}
