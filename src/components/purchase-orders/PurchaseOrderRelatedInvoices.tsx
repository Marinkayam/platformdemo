import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PurchaseOrder } from "@/types/purchase-orders";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
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