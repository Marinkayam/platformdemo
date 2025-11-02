import { PurchaseOrder } from "@/types/purchase-orders";
import { formatCurrency } from "@/lib/utils";

interface PurchaseOrderLineItemsProps {
  purchaseOrder: PurchaseOrder;
}

export function PurchaseOrderLineItems({ purchaseOrder }: PurchaseOrderLineItemsProps) {
  const lineItems = purchaseOrder.lineItems || [];

  return (
    <>
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-lg font-medium mb-4">Line Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 tracking-wider rounded-tl-lg">Item</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 tracking-wider">QTY</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 tracking-wider">Unit Price</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 tracking-wider">Currency</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 tracking-wider">Total Amount</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 tracking-wider">Invoiced Amount</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 tracking-wider rounded-tr-lg">Remaining Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lineItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    No line items found.
                  </td>
                </tr>
              ) : (
                lineItems.map((item, index) => {
                  // Calculate remaining amount if not provided
                  const invoicedAmount = item.invoicedAmount ?? 0;
                  const remainingAmount = item.remainingAmount ?? (item.total - invoicedAmount);

                  return (
                    <tr key={item.id}>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.unitPrice || 0, item.currency || "USD")}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.currency || "USD"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.total || 0, item.currency || "USD")}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(invoicedAmount, item.currency || "USD")}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{formatCurrency(remainingAmount, item.currency || "USD")}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
} 