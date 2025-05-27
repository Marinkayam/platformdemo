
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { Download, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface PurchaseOrderPdfViewerProps {
  purchaseOrder: PurchaseOrder;
}

export function PurchaseOrderPdfViewer({ purchaseOrder }: PurchaseOrderPdfViewerProps) {
  const [zoomLevel, setZoomLevel] = useState(1.0);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2.0));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Purchase Order Document</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ChevronDown className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600 min-w-[60px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          className="bg-white border rounded-lg m-4 p-6 shadow-sm overflow-auto font-inter"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
        >
          <div className="space-y-6 text-sm">
            <div className="text-center border-b pb-4">
              <h2 className="text-2xl font-bold">PURCHASE ORDER</h2>
              <p className="text-lg text-gray-600">{purchaseOrder.poNumber}</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2 text-sm">Buyer Information</h3>
                <p className="text-sm">{purchaseOrder.buyerName}</p>
                <p className="text-sm text-gray-600">Portal: {purchaseOrder.portal}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-sm">Order Details</h3>
                <p className="text-sm">Date: {new Date(purchaseOrder.orderDate).toLocaleDateString()}</p>
                <p className="text-sm">Terms: {purchaseOrder.paymentTerms}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-sm">Ship To Address</h3>
              <div className="text-sm">
                <p>{purchaseOrder.shipToAddress.line1}</p>
                {purchaseOrder.shipToAddress.line2 && <p>{purchaseOrder.shipToAddress.line2}</p>}
                <p>{purchaseOrder.shipToAddress.city}, {purchaseOrder.shipToAddress.state} {purchaseOrder.shipToAddress.zipCode}</p>
                <p>{purchaseOrder.shipToAddress.country}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-sm">Line Items</h3>
              <table className="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-2 text-left text-sm">Description</th>
                    <th className="border border-gray-300 p-2 text-right text-sm">Qty</th>
                    <th className="border border-gray-300 p-2 text-right text-sm">Unit Price</th>
                    <th className="border border-gray-300 p-2 text-right text-sm">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrder.lineItems.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 p-2 text-sm">{item.description}</td>
                      <td className="border border-gray-300 p-2 text-right text-sm">{item.quantity}</td>
                      <td className="border border-gray-300 p-2 text-right text-sm">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.unitPrice)}
                      </td>
                      <td className="border border-gray-300 p-2 text-right text-sm">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-semibold">
                    <td colSpan={3} className="border border-gray-300 p-2 text-right text-sm">Total:</td>
                    <td className="border border-gray-300 p-2 text-right text-sm">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(purchaseOrder.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
