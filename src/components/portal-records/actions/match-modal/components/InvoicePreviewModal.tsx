
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, X } from "lucide-react";

interface Invoice {
  id: string;
  number?: string;
  buyer: string;
  total: number;
  currency?: string;
  dueDate: string;
  status: string;
  owner: string;
  vatId?: string;
  invoiceDate?: string;
  terms?: string;
  poNumber?: string;
}

interface InvoicePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

export function InvoicePreviewModal({ isOpen, onClose, invoice }: InvoicePreviewModalProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  if (!invoice) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Invoice Preview - {invoice.number}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 p-6">
          {/* First Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">VAT/Tax ID</Label>
              <Input 
                value={invoice.vatId || "77-0105228"} 
                readOnly 
                className="bg-gray-50" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Invoice #</Label>
              <Input 
                value={invoice.number || "26-INV-2000-1479"} 
                readOnly 
                className="bg-gray-50" 
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Invoice Date</Label>
              <Input 
                value={invoice.invoiceDate || "April 25, 2025"} 
                readOnly 
                className="bg-gray-50" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Amount Due</Label>
              <Input 
                value={formatCurrency(invoice.total, invoice.currency || 'USD')} 
                readOnly 
                className="bg-gray-50 font-semibold" 
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Terms</Label>
              <Input 
                value={invoice.terms || "Net 90"} 
                readOnly 
                className="bg-gray-50" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Due Date</Label>
              <Input 
                value={invoice.dueDate} 
                readOnly 
                className="bg-gray-50" 
              />
            </div>
          </div>

          {/* Fourth Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">PO #</Label>
              <Input 
                value={invoice.poNumber || "0082585886"} 
                readOnly 
                className="bg-gray-50" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Buyer</Label>
              <Input 
                value={invoice.buyer} 
                readOnly 
                className="bg-gray-50" 
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
