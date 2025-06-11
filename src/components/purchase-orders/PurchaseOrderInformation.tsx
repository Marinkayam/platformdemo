import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PurchaseOrder } from "@/types/purchase-orders";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

interface PurchaseOrderInformationProps {
  purchaseOrder: PurchaseOrder;
}

export function PurchaseOrderInformation({ purchaseOrder }: PurchaseOrderInformationProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Purchase Order Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">PO Number</label>
            <Input value={purchaseOrder.poNumber || "N/A"} readOnly className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Buyer Name</label>
            <Input value={purchaseOrder.buyerName || "N/A"} readOnly className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Status</label>
            <Input value={purchaseOrder.status || "N/A"} readOnly className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Portal</label>
            <Input value={purchaseOrder.portal || "N/A"} readOnly className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Order Date</label>
            <Input 
              value={purchaseOrder.orderDate ? format(new Date(purchaseOrder.orderDate), "PPP") : "N/A"}
              readOnly 
              className="bg-gray-50" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Total</label>
            <Input 
              value={formatCurrency(purchaseOrder.total || 0, purchaseOrder.currency || "USD")}
              readOnly 
              className="bg-gray-50" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Invoiced Amount</label>
            <Input 
              value={formatCurrency(purchaseOrder.invoicedAmount || 0, purchaseOrder.currency || "USD")}
              readOnly 
              className="bg-gray-50" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Payment Terms</label>
            <Input value={purchaseOrder.paymentTerms || "N/A"} readOnly className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Currency</label>
            <Input value={purchaseOrder.currency || "N/A"} readOnly className="bg-gray-50" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 