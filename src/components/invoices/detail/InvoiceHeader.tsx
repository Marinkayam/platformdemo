
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Invoice } from "@/types/invoice";

interface InvoiceHeaderProps {
  invoice: Invoice;
}

export function InvoiceHeader({ invoice }: InvoiceHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/invoices">
            <ArrowLeft className="mr-2" />
            Back to Invoices
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">{invoice.number}</h1>
          <p className="text-muted-foreground">Owner: {invoice.owner}</p>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          {invoice.isOverdue && (
            <Badge variant="destructive" className="rounded-full">Overdue</Badge>
          )}
          <Badge variant="outline" className="rounded-full">
            {invoice.documentType || 'Invoice'}
          </Badge>
          <StatusBadge status={invoice.status} />
        </div>
      </div>
    </div>
  );
}
