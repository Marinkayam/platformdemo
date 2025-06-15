import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PurchaseOrder } from "@/types/purchase-orders";
import { Link } from "react-router-dom";
import { FileText, ExternalLink } from "lucide-react";

interface PurchaseOrderRelatedInvoicesProps {
  purchaseOrder: PurchaseOrder;
}

export function PurchaseOrderRelatedInvoices({ purchaseOrder }: PurchaseOrderRelatedInvoicesProps) {
  const relatedInvoices = purchaseOrder.relatedInvoices || [];

  return (
    <Card className="p-6 rounded-xl shadow-sm mt-6">
      <CardHeader className="pb-4">
        <h2 className="text-lg font-semibold">Related Invoices</h2>
      </CardHeader>
      <CardContent className="p-0">
        {relatedInvoices.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">No related invoices found.</p>
        ) : (
          <div className="space-y-4">
            {relatedInvoices.map((invoiceId) => (
              <div key={invoiceId} className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>{invoiceId}</span>
                </div>
                <a href="/dummy-invoice.pdf" download className="flex items-center gap-1 text-primary hover:underline">
                  <ExternalLink className="h-4 w-4" />
                  <span>View Invoice</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 