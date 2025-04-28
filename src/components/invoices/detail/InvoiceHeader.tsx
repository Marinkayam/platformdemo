
import { Link } from "react-router-dom";
import { ArrowLeft, MoreHorizontal, FileText, Download, Trash2 } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/button";
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
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="h-9">
          <Link to="/invoices" className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <ArrowLeft className="h-4 w-4" />
            Back to Invoices
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-[32px] font-semibold text-gray-900">{invoice.number}</h1>
            <StatusBadge status={invoice.status} />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={onViewPdf}
              className="flex items-center gap-2 bg-white text-sm"
            >
              <FileText className="h-4 w-4" />
              View Invoice PDF
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="bg-white">
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
        
        <div className="flex items-center gap-6 text-[14px] text-gray-600">
          <span>Owner: {invoice.owner}</span>
          <span>File type: Invoice</span>
        </div>
      </div>
    </div>
  );
}
