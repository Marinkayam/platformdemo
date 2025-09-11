
import { Input } from "@/components/ui/input";
import { PurchaseOrder } from "@/types/purchase-orders";
import { PurchaseOrderStatusBadge } from "../../PurchaseOrderStatusBadge";
import { PurchaseOrderPortalStatusBadge } from "../../PurchaseOrderPortalStatusBadge";

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
        <div className="flex items-center h-10 px-3 py-2 bg-gray-50 rounded-md border border-input">
          <PurchaseOrderStatusBadge status={purchaseOrder.status} />
        </div>
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

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Portal Status</label>
        <div className="flex items-center h-10 px-3 py-2 bg-gray-50 rounded-md border border-input">
          {purchaseOrder.portalStatus ? (
            <PurchaseOrderPortalStatusBadge status={purchaseOrder.portalStatus} />
          ) : (
            <span className="text-gray-500 text-sm">N/A</span>
          )}
        </div>
      </div>
    </div>
  );
}
