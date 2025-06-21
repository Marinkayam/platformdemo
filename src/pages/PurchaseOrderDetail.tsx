
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { purchaseOrderData } from "@/data/purchaseOrders";
import { PurchaseOrder } from "@/types/purchase-orders";
import { PurchaseOrderDetailHeader } from "@/components/purchase-orders/PurchaseOrderDetailHeader";
import { ActivityLog } from "@/components/common/ActivityLog";
import { TabsContent, Tabs } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { PurchaseOrderTabs } from "@/components/purchase-orders/PurchaseOrderTabs";
import { PurchaseOrderInformation } from "@/components/purchase-orders/PurchaseOrderInformation";
import { PurchaseOrderLineItems } from "@/components/purchase-orders/PurchaseOrderLineItems";
import { PurchaseOrderRelatedInvoices } from "@/components/purchase-orders/PurchaseOrderRelatedInvoices";

// Mock data - in a real app, this would come from an API
const getPurchaseOrderById = async (id: string): Promise<PurchaseOrder> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const foundPo = purchaseOrderData.find((po) => po.id === id);
  if (foundPo) {
    return foundPo;
  } else {
    throw new Error("Purchase order not found");
  }
};

export default function PurchaseOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("po-data");
  const [hasInitialized, setHasInitialized] = useState(false);

  const { data: purchaseOrder, isLoading, isError, error } = useQuery<PurchaseOrder, Error>({
    queryKey: ['purchaseOrder', id],
    queryFn: () => getPurchaseOrderById(id || ''),
    enabled: !!id,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
      setHasInitialized(true);
    }
  }, [location.search]);

  useEffect(() => {
    const handleTabChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.tab) {
        setActiveTab(customEvent.detail.tab);
      }
    };
    window.addEventListener('switchTab', handleTabChange as EventListener);
    return () => {
      window.removeEventListener('switchTab', handleTabChange as EventListener);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-main mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading purchase order...</p>
        </div>
      </div>
    );
  }

  if (isError || !purchaseOrder) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500">{error?.message || "Purchase order not found"}</p>
        </div>
      </div>
    );
  }

  const lineItems = purchaseOrder.lineItems || [];
  const activityCount = 4; // Placeholder, adjust as needed or fetch dynamic count

  return (
    <div className="container mx-auto py-6">
      <PurchaseOrderDetailHeader purchaseOrder={purchaseOrder} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <PurchaseOrderTabs activeTab={activeTab} onTabChange={setActiveTab} activityCount={activityCount} />

        <TabsContent value="po-data">
          <Card className="p-6 rounded-xl shadow-sm">
            <PurchaseOrderInformation purchaseOrder={purchaseOrder} />
          </Card>

          <PurchaseOrderLineItems purchaseOrder={purchaseOrder} />

          <PurchaseOrderRelatedInvoices purchaseOrder={purchaseOrder} />

        </TabsContent>

        <TabsContent value="activity" className="">
          <Card className="p-6 rounded-xl shadow-sm">
            <ActivityLog entityId={purchaseOrder.id} entityType="purchase_order" />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
