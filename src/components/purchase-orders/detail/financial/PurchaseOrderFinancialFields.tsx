
import { PurchaseOrder } from "@/types/purchaseOrder";

interface PurchaseOrderFinancialFieldsProps {
  purchaseOrder: PurchaseOrder;
}

export function PurchaseOrderFinancialFields({ purchaseOrder }: PurchaseOrderFinancialFieldsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">PO Number</label>
            <div className="text-sm font-semibold text-[#38415F]">{purchaseOrder.poNumber}</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Buyer Name</label>
            <div className="text-sm text-gray-900">{purchaseOrder.buyerName}</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
            <div className="text-sm text-gray-900">{purchaseOrder.status}</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Portal</label>
            <div className="text-sm text-gray-900">{purchaseOrder.portal}</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Order Date</label>
            <div className="text-sm text-gray-900">{formatDate(purchaseOrder.orderDate)}</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Total</label>
            <div className="text-sm font-semibold text-gray-900">{formatCurrency(purchaseOrder.total)}</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Invoiced Amount</label>
            <div className="text-sm text-gray-900">{formatCurrency(purchaseOrder.invoicedAmount)}</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Payment Terms</label>
            <div className="text-sm text-gray-900">{purchaseOrder.paymentTerms}</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Currency</label>
            <div className="text-sm text-gray-900">{purchaseOrder.currency}</div>
          </div>
          
          {purchaseOrder.shipmentNumbers && purchaseOrder.shipmentNumbers.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Shipment Numbers</label>
              <div className="text-sm text-gray-900">{purchaseOrder.shipmentNumbers.join(", ")}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
