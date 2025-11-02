import { Input } from "@/components/ui/input";
import { PurchaseOrder } from "@/types/purchase-orders";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  'pending_approval': 'Pending Approval',
  'rejected': 'Rejected'
};

export function PurchaseOrderInformation({ purchaseOrder }: PurchaseOrderInformationProps) {
  // Calculate Remaining Amount
  const pendingSubmissionAmount = 0; // Assume 0 for demo
  const remainingAmount = (purchaseOrder.total || 0) - (purchaseOrder.invoicedAmount || 0) - pendingSubmissionAmount;
  const standardizedStatus = statusMap[purchaseOrder.status] || purchaseOrder.status;
  const isCancelled = standardizedStatus === 'Cancelled';

  // Mock cancellation reason - in a real app, this would come from the PO data
  const cancellationReason = "Duplicate order created in error";

  return (
    <>
      <h2 className="text-lg font-medium">Purchase Order Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-500">PO Number</label>
          <Input value={purchaseOrder.poNumber || "N/A"} readOnly className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Portal</label>
          <Input value={purchaseOrder.portal || "N/A"} readOnly className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Buyer Name</label>
          <Input value={purchaseOrder.buyerName || "N/A"} readOnly className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Monto Status</label>
          <div className="flex items-center h-10 px-3 bg-gray-50 rounded-md border border-input">
            <TooltipProvider>
              {isCancelled ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <StatusBadge status={standardizedStatus} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium">Reason:</p>
                    <p>{cancellationReason}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <StatusBadge status={standardizedStatus} />
              )}
            </TooltipProvider>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Portal Status</label>
          <Input value={purchaseOrder.portalStatus || "N/A"} readOnly className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Currency</label>
          <Input value={purchaseOrder.currency || "N/A"} readOnly className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">PO Date</label>
          <Input
            value={purchaseOrder.orderDate ? format(new Date(purchaseOrder.orderDate), "PPP") : "N/A"}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Payment Terms</label>
          <Input value={purchaseOrder.paymentTerms || "N/A"} readOnly className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Total Amount</label>
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
          <label className="text-sm text-gray-500">Remaining Amount</label>
          <Input
            value={formatCurrency(remainingAmount, purchaseOrder.currency || "USD")}
            readOnly
            className="bg-gray-50 font-bold"
          />
        </div>
      </div>
    </>
  );
}