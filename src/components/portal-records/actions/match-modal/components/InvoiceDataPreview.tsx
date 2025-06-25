
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

interface InvoiceDataPreviewProps {
  selectedInvoice: Invoice | undefined;
}

export function InvoiceDataPreview({ selectedInvoice }: InvoiceDataPreviewProps) {
  const [isOpen, setIsOpen] = useState(true);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  if (!selectedInvoice) return null;

  return (
    <Card className="border border-border bg-card">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-4 cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Financial Data Preview
              </CardTitle>
              <Button variant="ghost" size="sm">
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-gray-500">VAT/Tax ID</Label>
                <Input 
                  value={selectedInvoice.vatId || "77-0105228"} 
                  readOnly 
                  className="bg-gray-50" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-gray-500">Invoice #</Label>
                <Input 
                  value={selectedInvoice.number || "26-INV-2000-1479"} 
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
                  value={selectedInvoice.invoiceDate || "April 25, 2025"} 
                  readOnly 
                  className="bg-gray-50" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-gray-500">Amount Due</Label>
                <Input 
                  value={formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'USD')} 
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
                  value={selectedInvoice.terms || "Net 90"} 
                  readOnly 
                  className="bg-gray-50" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-gray-500">Due Date</Label>
                <Input 
                  value={selectedInvoice.dueDate} 
                  readOnly 
                  className="bg-gray-50" 
                />
              </div>
            </div>

            {/* Fourth Row */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-gray-500">PO #</Label>
                <Input 
                  value={selectedInvoice.poNumber || "0082585886"} 
                  readOnly 
                  className="bg-gray-50" 
                />
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
