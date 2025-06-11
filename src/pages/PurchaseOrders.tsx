import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PurchaseOrderHeader } from "@/components/purchase-orders/PurchaseOrderHeader";
import { PurchaseOrderTable } from "@/components/purchase-orders/PurchaseOrderTable";
import { purchaseOrderData } from "@/data/purchaseOrders";
import { usePurchaseOrderFiltering } from "@/hooks/usePurchaseOrderFiltering";
import { Tabs, TabsContent } from "@/components/ui/tabs";

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
  
  // Update tabs with counts - changed "Found by Monto" to "All POs"
  const tabsWithCounts = [
    { id: "found", label: "All POs", count: purchaseOrderData.length },
    { id: "new", label: "New POs", count: newCount },
    { id: "low-funds", label: "Low Funds", count: lowFundsCount },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <PurchaseOrderHeader 
        tabs={tabsWithCounts}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onFilterChange={setFilters}
        purchaseOrderCount={filteredPurchaseOrders.length}
      />
      
      <TabsContent value={activeTab}>
        <PurchaseOrderTable 
          purchaseOrders={filteredPurchaseOrders} 
        />
      </TabsContent>
    </Tabs>
  );
}
