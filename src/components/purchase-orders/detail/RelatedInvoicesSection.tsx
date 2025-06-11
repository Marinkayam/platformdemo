
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RelatedInvoicesSectionProps {
  invoiceIds: string[] | {
    id: string;
    invoiceNumber: string;
    status: string;
    amount: number;
    currency: string;
    dueDate: string;
  }[];
}

export function RelatedInvoicesSection({ invoiceIds }: RelatedInvoicesSectionProps) {
  const navigate = useNavigate();

  if (!invoiceIds || invoiceIds.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Related Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">No related invoices found for this purchase order.</p>
          </div>
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
        <div className="space-y-3">
          {invoiceIds.map((invoice, index) => {
            if (typeof invoice === 'string') {
              return (
                <div key={invoice} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{invoice}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/invoices/${invoice}`)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Invoice <ExternalLink className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              );
            } else {
              return (
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
              );
            }
          })}
        </div>
      </CardContent>
    </Card>
  );
}
