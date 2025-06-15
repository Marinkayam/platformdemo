
import { useParams, useLocation } from "react-router-dom";
import { purchaseOrderData } from "@/data/purchaseOrders";
import { PurchaseOrder } from "@/types/purchase-orders";
import { PurchaseOrderDetailHeader } from "@/components/purchase-orders/PurchaseOrderDetailHeader";
import { PurchaseOrderInformation } from "@/components/purchase-orders/PurchaseOrderInformation";
// Fix import path here!
import { PurchaseOrderShipToAddress } from "@/components/purchase-orders/detail/financial/PurchaseOrderShipToAddress";
import { PurchaseOrderLineItems } from "@/components/purchase-orders/PurchaseOrderLineItems";
import { PurchaseOrderRelatedInvoices } from "@/components/purchase-orders/PurchaseOrderRelatedInvoices";
import { PurchaseOrderPdfViewer } from "@/components/purchase-orders/PurchaseOrderPdfViewer";
import { ActivityLog } from "@/components/common/ActivityLog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export default function PurchaseOrderDetailDemandOrderDetail() {
  const { id } = useParams<{ id: string }>();
  // Try to find the PO by id
  const purchaseOrder = purchaseOrderData.find(po => po.id === id) || purchaseOrderData[0];
  const [activeTab, setActiveTab] = useState("po-data");
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel(z => Math.min(z + 0.1, 2));
  const handleZoomOut = () => setZoomLevel(z => Math.max(z - 0.1, 0.5));

  return (
    <div className="container mx-auto px-4 py-6">
      <PurchaseOrderDetailHeader purchaseOrder={purchaseOrder} className="mb-6" />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="po-data">PO Data</TabsTrigger>
          <TabsTrigger value="activity-log">Activity Log</TabsTrigger>
        </TabsList>

        {activeTab === "po-data" ? (
          <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-xl border border-[#E4E5E9]">
            <ResizablePanel defaultSize={55} className="p-6 bg-white space-y-6">
              <PurchaseOrderInformation purchaseOrder={purchaseOrder} />
              <PurchaseOrderShipToAddress purchaseOrder={purchaseOrder} />
              <PurchaseOrderLineItems purchaseOrder={purchaseOrder} />
              <PurchaseOrderRelatedInvoices purchaseOrder={purchaseOrder} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={45} className="p-6 border-l border-[#E4E5E9] bg-white">
              <PurchaseOrderPdfViewer
                purchaseOrder={purchaseOrder}
                zoomLevel={zoomLevel}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <TabsContent value="activity-log" className="mt-6">
            <Card className="p-6">
              <ActivityLog entityId={purchaseOrder.id} entityType="purchase_order" />
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
} 
