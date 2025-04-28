
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
        <Button variant="ghost" size="sm" asChild className="h-9 text-[#4A5568] hover:text-[#1A202C] hover:bg-[#F7FAFC]">
          <Link to="/invoices" className="flex items-center gap-2 text-base">
            <ArrowLeft className="h-4 w-4" />
            Back to Invoices
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-[#1A202C]">{invoice.number}</h1>
            <StatusBadge status={invoice.status} />
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="border-[#E2E8F0] bg-white text-[#4A5568] hover:bg-[#F7FAFC] hover:text-[#1A202C]"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-[#E2E8F0] shadow-lg">
                <DropdownMenuItem className="flex items-center hover:bg-[#F7FAFC] text-[#1A202C]">
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center hover:bg-[#FFEBEE] text-[#D32F2F]">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Exclude Invoice
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-[#718096]">
          <span>Owner: {invoice.owner}</span>
          <span>File type: Invoice</span>
        </div>
      </div>
    </div>
  );
}
