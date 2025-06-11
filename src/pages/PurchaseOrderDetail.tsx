import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { purchaseOrderData } from "@/data/purchaseOrders";
import { PurchaseOrder } from "@/types/purchase-orders";
import { PurchaseOrderDetailHeader } from "@/components/purchase-orders/PurchaseOrderDetailHeader";
import { PurchaseOrderPdfViewer } from "@/components/purchase-orders/PurchaseOrderPdfViewer";
import { ActivityLog } from "@/components/common/ActivityLog";
import { TabsContent, Tabs } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { PurchaseOrderTabs } from "@/components/purchase-orders/PurchaseOrderTabs";
import { PurchaseOrderFinancialData } from "@/components/purchase-orders/PurchaseOrderFinancialData";

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
  const [zoomLevel, setZoomLevel] = useState(1.0);
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

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2.0));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  const lineItems = purchaseOrder.lineItems || [];
  const activityCount = 4; // Placeholder, adjust as needed or fetch dynamic count

  return (
    <div className="container mx-auto px-4 py-6">
      <PurchaseOrderDetailHeader purchaseOrder={purchaseOrder} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <PurchaseOrderTabs activeTab={activeTab} onTabChange={setActiveTab} activityCount={activityCount} />

        <TabsContent value="po-data">
          <ResizablePanelGroup direction="horizontal" className="min-h-[600px]">
            <ResizablePanel defaultSize={55} className="p-6 bg-white">
              <PurchaseOrderFinancialData purchaseOrder={purchaseOrder} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={45} className="p-6 border-l border-[#E4E5E9] bg-white">
              <Card className="p-6 rounded-xl shadow-sm">
                <PurchaseOrderPdfViewer
                  purchaseOrder={purchaseOrder}
                  zoomLevel={zoomLevel}
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                />
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabsContent>

        <TabsContent value="activity" className="">
          <Card className="p-6">
            <ActivityLog entityId={purchaseOrder.id} entityType="purchase_order" />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
