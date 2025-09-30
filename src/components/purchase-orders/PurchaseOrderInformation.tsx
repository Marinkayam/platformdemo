import { Input } from "@/components/ui/input";
import { PurchaseOrder } from "@/types/purchase-orders";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

interface PurchaseOrderInformationProps {
  purchaseOrder: PurchaseOrder;
}

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

export function PurchaseOrderInformation({ purchaseOrder }: PurchaseOrderInformationProps) {
  // Calculate TRA (Total Remaining Amount)
  const pendingSubmissionAmount = 0; // Assume 0 for demo
  const tra = (purchaseOrder.total || 0) - (purchaseOrder.invoicedAmount || 0) - pendingSubmissionAmount;
  const standardizedStatus = statusMap[purchaseOrder.status] || purchaseOrder.status;
  return (
    <>
      <h2 className="text-lg font-medium">Purchase Order Information</h2>
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
          <label className="text-sm text-gray-500">Monto Status</label>
          <Input value={standardizedStatus} readOnly className="bg-gray-50" />
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
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Total Remaining Amount (TRA)</label>
          <Input
            value={formatCurrency(tra, purchaseOrder.currency || "USD")}
            readOnly
            className="bg-gray-50 font-semibold"
          />
        </div>
      </div>
    </>
  );
}