
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Eye, Check, ChevronDown, ChevronUp, FileText, Download } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useState } from "react";

interface Invoice {
  id: string;
  number?: string;
  buyer: string;
  total: number;
  currency?: string;
  dueDate: string;
}

interface InvoiceListProps {
  filteredInvoices: Invoice[];
  selectedInvoiceId: string;
  setSelectedInvoiceId: (id: string) => void;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  onMatchAndCreateRTP: () => void;
}

export function InvoiceList({
  filteredInvoices,
  selectedInvoiceId,
  setSelectedInvoiceId,
  uploadedFile,
  setUploadedFile,
  onMatchAndCreateRTP,
}: InvoiceListProps) {
  const [expandedInvoiceId, setExpandedInvoiceId] = useState<string | null>(null);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleFileRemoval = () => {
    setUploadedFile(null);
  };

  const handleTogglePreview = (invoiceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedInvoiceId(expandedInvoiceId === invoiceId ? null : invoiceId);
  };

  const handleDownloadPdf = (invoice: any) => {
    // Mock download functionality - in real app this would download the actual PDF
    console.log(`Downloading PDF for invoice ${invoice?.number}`);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {filteredInvoices.length > 0 ? (
        <div className="max-h-60 overflow-y-auto">
          <div className="space-y-2 p-3">
            {filteredInvoices.map((invoice) => {
              const isSelected = selectedInvoiceId === invoice.id;
              const isExpanded = expandedInvoiceId === invoice.id;
              return (
                <div key={invoice.id}>
                  <div
                    className={`relative p-3 rounded-md border transition-colors ${
                      isSelected
                        ? 'bg-primary/10 border-primary ring-2 ring-primary/20'
                        : 'bg-white hover:bg-gray-50 cursor-pointer'
                    }`}
                    onClick={() => setSelectedInvoiceId(invoice.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-sm flex items-center gap-2">
                          {isSelected && <Check className="h-4 w-4 text-primary" />}
                          {invoice.number}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {invoice.buyer} • {formatCurrency(invoice.total, invoice.currency || 'USD')} • {invoice.dueDate}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => handleTogglePreview(invoice.id, e)}
                          className="h-6 px-2 text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          {isExpanded ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
                          Preview
                        </Button>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mx-3 mb-3 p-4 bg-gray-50 rounded-md border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          <h4 className="font-medium">Invoice Preview - {invoice.number}</h4>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadPdf(invoice)}
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {/* First Row */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm text-gray-500">VAT/Tax ID</Label>
                            <Input
                              value="77-0105228"
                              readOnly
                              className="bg-white text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm text-gray-500">Invoice #</Label>
                            <Input
                              value={invoice.number || "26-INV-2000-1479"}
                              readOnly
                              className="bg-white text-sm"
                            />
                          </div>
                        </div>

                        {/* Second Row */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm text-gray-500">Invoice Date</Label>
                            <Input
                              value="April 25, 2025"
                              readOnly
                              className="bg-white text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm text-gray-500">Amount Due</Label>
                            <Input
                              value={formatCurrency(invoice.total, invoice.currency || 'USD')}
                              readOnly
                              className="bg-white font-semibold text-sm"
                            />
                          </div>
                        </div>

                        {/* Third Row */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm text-gray-500">Terms</Label>
                            <Input
                              value="Net 90"
                              readOnly
                              className="bg-white text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm text-gray-500">Due Date</Label>
                            <Input
                              value={invoice.dueDate}
                              readOnly
                              className="bg-white text-sm"
                            />
                          </div>
                        </div>

                        {/* Fourth Row */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm text-gray-500">PO #</Label>
                            <Input
                              value="0082585886"
                              readOnly
                              className="bg-white text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm text-gray-500">Buyer</Label>
                            <Input
                              value={invoice.buyer}
                              readOnly
                              className="bg-white text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4">
          {/* Empty state - handled by parent component */}
        </div>
      )}
    </div>
  );
}
