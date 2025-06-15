import { PurchaseOrder } from "@/types/purchase-orders";
import { Button } from "@/components/ui/button";
import { Download, Search, ZoomIn, ZoomOut } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDownToLine, ChevronLeft, ChevronRight } from "lucide-react";

interface PurchaseOrderPdfViewerProps {
  purchaseOrder: PurchaseOrder;
  className?: string;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function PurchaseOrderPdfViewer({
  purchaseOrder,
  className,
  zoomLevel,
  onZoomIn,
  onZoomOut,
}: PurchaseOrderPdfViewerProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">PO Preview</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{`${Math.round(zoomLevel * 100)}%`}</span>
          <Button variant="ghost" size="sm" onClick={onZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto border border-gray-200 rounded-lg">
        <div className="text-center border-b pb-4 mb-4">
          <h2 className="text-xl font-bold">PURCHASE ORDER</h2>
          <p className="text-lg text-gray-600 mb-4">PO-{purchaseOrder.poNumber || "N/A"}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Buyer Information</h3>
            <p>{purchaseOrder.buyerName || "N/A"}</p>
            <p>Portal: {purchaseOrder.portal || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Order Details</h3>
            <p>Order Date: {purchaseOrder.orderDate ? format(new Date(purchaseOrder.orderDate), "yyyy-MM-dd") : "N/A"}</p>
            <p>Terms: {purchaseOrder.paymentTerms || "N/A"}</p>
            <p>Due Date: {purchaseOrder.dueDate ? format(new Date(purchaseOrder.dueDate), "yyyy-MM-dd") : "N/A"}</p>
          </div>
        </div>

        <div className="mb-6 text-sm">
          <h3 className="font-semibold mb-2">Ship To Address</h3>
          <p>{purchaseOrder.shipToAddress?.line1 || "N/A"}</p>
          {purchaseOrder.shipToAddress?.line2 && <p>{purchaseOrder.shipToAddress.line2}</p>}
          <p>
            {purchaseOrder.shipToAddress?.city || "N/A"}, {purchaseOrder.shipToAddress?.state || "N/A"} {purchaseOrder.shipToAddress?.zipCode || "N/A"}
          </p>
          <p>{purchaseOrder.shipToAddress?.country || "N/A"}</p>
        </div>

        <div className="mb-6 text-sm">
          <h3 className="font-semibold mb-2">Line Items</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-left text-xs text-gray-600">
                <th className="py-2">Description</th>
                <th className="py-2 text-right">Qty</th>
                <th className="py-2 text-right">Unit Price</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrder.lineItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 last:border-b-0">
                  <td className="py-2">{item.description}</td>
                  <td className="py-2 text-right">{item.quantity}</td>
                  <td className="py-2 text-right">{formatCurrency(item.unitPrice, item.currency || "USD")}</td>
                  <td className="py-2 text-right">{formatCurrency(item.total, item.currency || "USD")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-right text-sm font-semibold">
          Total: {formatCurrency(purchaseOrder.total || 0, purchaseOrder.currency || "USD")}
        </div>
      </div>
    </>
  );
} 