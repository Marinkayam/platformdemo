
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PurchaseOrder } from "@/types/purchase-orders";
import { PurchaseOrderLineItemsTable } from "./PurchaseOrderLineItemsTable";
import { RelatedInvoicesSection } from "./RelatedInvoicesSection";
import { StatusBadge } from "@/components/ui/status-badge";

interface PurchaseOrderDetailContentProps {
  purchaseOrder: PurchaseOrder;
}

export function PurchaseOrderDetailContent({ purchaseOrder }: PurchaseOrderDetailContentProps) {
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

  // Status mapping for Monto Status
  const statusMap: Record<string, string> = {
    'approved': 'Open',
    'completed': 'Closed',
    'cancelled': 'Cancelled',
    'Partially Invoiced': 'Partially Invoiced',
    'Fully Invoiced': 'Fully Invoiced',
    'new': 'New',
    'New': 'New',
    'pending_approval': 'Pending Approval',
    'rejected': 'Rejected'
  };

  const getStandardizedStatus = (status: string) => {
    return statusMap[status] || status;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-8">
          <CardTitle>Purchase Order Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-10">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">PO Number</label>
              <p className="text-sm text-gray-900">{purchaseOrder.poNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Buyer Name</label>
              <p className="text-sm text-gray-900">{purchaseOrder.buyerName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Portal Status</label>
              <div className="mt-1">
                <StatusBadge status={purchaseOrder.rawStatus || purchaseOrder.status} className="whitespace-nowrap flex-shrink-0" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Monto Status</label>
              <div className="mt-1">
                <StatusBadge status={getStandardizedStatus(purchaseOrder.status)} className="whitespace-nowrap flex-shrink-0" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Portal</label>
              <p className="text-sm text-gray-900">{purchaseOrder.portal}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Order Date</label>
              <p className="text-sm text-gray-900">{formatDate(purchaseOrder.orderDate)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Total</label>
              <p className="text-sm font-semibold text-gray-900">{formatCurrency(purchaseOrder.total)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Invoiced Amount</label>
              <p className="text-sm text-gray-900">{formatCurrency(purchaseOrder.invoicedAmount)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">TRA</label>
              <p className="text-sm font-semibold text-gray-900">{formatCurrency(purchaseOrder.amountLeft)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Payment Terms</label>
              <p className="text-sm text-gray-900">{purchaseOrder.paymentTerms}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Currency</label>
              <p className="text-sm text-gray-900">{purchaseOrder.currency}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {purchaseOrder.shipToAddress && (
        <Card>
          <CardHeader>
            <CardTitle>Ship To Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-900">
              <p>{purchaseOrder.shipToAddress.line1}</p>
              {purchaseOrder.shipToAddress.line2 && <p>{purchaseOrder.shipToAddress.line2}</p>}
              <p>
                {purchaseOrder.shipToAddress.city}, {purchaseOrder.shipToAddress.state} {purchaseOrder.shipToAddress.zipCode}
              </p>
              <p>{purchaseOrder.shipToAddress.country}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <PurchaseOrderLineItemsTable lineItems={purchaseOrder.lineItems} />

      <RelatedInvoicesSection invoiceIds={purchaseOrder.relatedInvoices || []} />
    </div>
  );
}
