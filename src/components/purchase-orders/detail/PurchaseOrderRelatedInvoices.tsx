
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, ExternalLink } from "lucide-react";

interface PurchaseOrderRelatedInvoicesProps {
  invoiceIds: string[];
}

export function PurchaseOrderRelatedInvoices({ invoiceIds }: PurchaseOrderRelatedInvoicesProps) {
  const navigate = useNavigate();

  const handleViewInvoice = (invoiceId: string) => {
    navigate(`/invoices/${invoiceId}`);
  };

  if (invoiceIds.length === 0) {
    return (
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Related Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">No related invoices yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Related Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {invoiceIds.map((invoiceId) => (
            <div key={invoiceId} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{invoiceId}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleViewInvoice(invoiceId)}
                className="h-8 px-3"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View Invoice
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
