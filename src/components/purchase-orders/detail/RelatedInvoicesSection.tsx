
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";

interface RelatedInvoicesSectionProps {
  invoiceIds: string[];
}

export function RelatedInvoicesSection({ invoiceIds }: RelatedInvoicesSectionProps) {
  const navigate = useNavigate();

  if (invoiceIds.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Related Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">No related invoices found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {invoiceIds.map((invoiceId) => (
            <div key={invoiceId} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{invoiceId}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/invoices/${invoiceId}`)}
              >
                View Invoice
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
