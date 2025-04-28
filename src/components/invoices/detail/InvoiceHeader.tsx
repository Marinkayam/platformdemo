
import { Link } from "react-router-dom";
import { ArrowLeft, Download, MoreHorizontal, FileText, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Invoice } from "@/types/invoice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InvoiceHeaderProps {
  invoice: Invoice;
  onViewPdf: () => void;
}

export function InvoiceHeader({ invoice, onViewPdf }: InvoiceHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" asChild className="h-9">
          <Link to="/invoices" className="flex items-center gap-2 text-base">
            <ArrowLeft className="h-4 w-4" />
            Back to Invoices
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{invoice.number}</h1>
            <StatusBadge status={invoice.status} />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onViewPdf}>
              <FileText className="mr-2 h-4 w-4" />
              View Invoice PDF
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Exclude Invoice
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-muted-foreground">
          <span>Owner: {invoice.owner}</span>
          <span>File type: Invoice</span>
        </div>
      </div>
    </div>
  );
}
