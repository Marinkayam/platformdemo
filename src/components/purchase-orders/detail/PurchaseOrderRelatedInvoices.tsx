
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";

interface PurchaseOrderRelatedInvoicesProps {
  invoiceIds: string[];
}

export function PurchaseOrderRelatedInvoices({ invoiceIds }: PurchaseOrderRelatedInvoicesProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <h2 className="text-lg font-medium">Related Invoices</h2>
      </div>
      
      {invoiceIds.length === 0 ? (
        <p className="text-sm text-gray-600">No related invoices found.</p>
      ) : (
        <div className="space-y-2">
          {invoiceIds.map((invoiceId) => (
            <div key={invoiceId} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{invoiceId}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/invoices/${invoiceId}`)}
                className="text-xs"
              >
                View Invoice
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
