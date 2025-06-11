import { PurchaseOrder } from "@/types/purchase-orders";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface PurchaseOrderRelatedInvoicesProps {
  purchaseOrder: PurchaseOrder;
  className?: string;
}

export function PurchaseOrderRelatedInvoices({ purchaseOrder, className }: PurchaseOrderRelatedInvoicesProps) {
  const navigate = useNavigate();

  if (!purchaseOrder.relatedInvoices?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No related invoices found for this purchase order.</p>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Related Invoices</h2>
        <div className="space-y-3">
          {purchaseOrder.relatedInvoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{invoice.invoiceNumber}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/invoices/${invoice.id}`)}
                className="text-blue-600 hover:text-blue-800"
              >
                View Invoice <ExternalLink className="h-4 w-4 ml-1" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 