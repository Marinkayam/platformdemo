
import { useParams } from "react-router-dom";
import { purchaseOrderData } from "@/data/purchaseOrders";
import { PurchaseOrderHeader } from "@/components/purchase-orders/detail/PurchaseOrderHeader";
import { PurchaseOrderFinancialData } from "@/components/purchase-orders/detail/PurchaseOrderFinancialData";
import { PurchaseOrderLineItems } from "@/components/purchase-orders/detail/PurchaseOrderLineItems";
import { PurchaseOrderRelatedInvoices } from "@/components/purchase-orders/detail/PurchaseOrderRelatedInvoices";
import { PurchaseOrderPdfViewer } from "@/components/purchase-orders/detail/PurchaseOrderPdfViewer";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export default function PurchaseOrderDetail() {
  const { id } = useParams();
  
  // Find the purchase order by id
  const purchaseOrder = purchaseOrderData.find(po => po.id === id);

  if (!purchaseOrder) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Purchase Order not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <PurchaseOrderHeader purchaseOrder={purchaseOrder} />
      
      <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-xl border border-[#E4E5E9]">
        <ResizablePanel defaultSize={55} className="p-6 bg-white">
          <div className="space-y-6">
            <PurchaseOrderFinancialData purchaseOrder={purchaseOrder} />
            <PurchaseOrderLineItems lineItems={purchaseOrder.lineItems} />
            <PurchaseOrderRelatedInvoices invoiceIds={purchaseOrder.relatedInvoices} />
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={45} className="p-6 border-l border-[#E4E5E9] bg-white">
          <PurchaseOrderPdfViewer purchaseOrder={purchaseOrder} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
