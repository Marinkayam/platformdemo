
import { Input } from "@/components/ui/input";
import { PurchaseOrder } from "@/types/purchase-orders";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm text-gray-500">PO Number</label>
        <Input value={purchaseOrder.poNumber} readOnly className="bg-gray-50" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm text-gray-500">Buyer Name</label>
        <Input value={purchaseOrder.buyerName} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Status</label>
        <Input value={purchaseOrder.status} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Portal</label>
        <Input value={purchaseOrder.portal} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Order Date</label>
        <Input value={formatDate(purchaseOrder.orderDate)} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Total</label>
        <Input value={formatCurrency(purchaseOrder.total)} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Invoiced Amount</label>
        <Input value={formatCurrency(purchaseOrder.invoicedAmount)} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Payment Terms</label>
        <Input value={purchaseOrder.paymentTerms} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Currency</label>
        <Input value={purchaseOrder.currency} readOnly className="bg-gray-50" />
      </div>
    </div>
  );
}
