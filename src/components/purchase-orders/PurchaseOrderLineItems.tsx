import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PurchaseOrder } from "@/types/purchase-orders";
import { formatCurrency } from "@/lib/utils";

interface PurchaseOrderLineItemsProps {
  purchaseOrder: PurchaseOrder;
}

export function PurchaseOrderLineItems({ purchaseOrder }: PurchaseOrderLineItemsProps) {
  const lineItems = purchaseOrder.lineItems || [];

  return (
    <Card className="p-6 rounded-xl shadow-sm mt-6">
      <CardHeader className="pb-4">
        <h2 className="text-lg font-semibold">Line Items</h2>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lineItems.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    No line items found.
                  </td>
                </tr>
              ) : (
                lineItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(item.unitPrice || 0, item.currency || "USD")}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">{formatCurrency(item.total || 0, item.currency || "USD")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
} 