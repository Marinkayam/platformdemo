
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
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
        <CardHeader className="pb-3">
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
      <CardHeader className="pb-3">
        <CardTitle>Related Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {invoiceIds.map((invoice, index) => {
            if (typeof invoice === 'string') {
              return (
                <div key={invoice} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
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
