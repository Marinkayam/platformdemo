
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

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

  return (
    <div className="border rounded-lg overflow-hidden">
      {filteredInvoices.length > 0 ? (
        <div className="max-h-60 overflow-y-auto">
          <div className="divide-y">
            {filteredInvoices.map((invoice) => (
              <button
                key={invoice.id}
                onClick={() => setSelectedInvoiceId(invoice.id)}
                className={`w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors ${
                  selectedInvoiceId === invoice.id ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{invoice.id} - {invoice.number}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {invoice.buyer} • {formatCurrency(invoice.total, invoice.currency || 'USD')} • {invoice.dueDate}
                    </div>
                  </div>
                  {selectedInvoiceId === invoice.id && (
                    <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center ml-2">
                      <div className="h-2 w-2 bg-primary-foreground rounded-full" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-8">
          <div className="text-center space-y-6">
            <div className="text-muted-foreground text-sm flex items-center justify-center gap-2">
              No invoices found. Upload an invoice PDF to create a new RTP record.
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      When no matching invoices are found, you can upload a PDF file containing the corrected invoice data. 
                      This will create a new Request to Pay (RTP) record with the updated information from your uploaded document.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="space-y-4">
              <div className="max-w-md mx-auto">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer"
                     onClick={() => {
                       const input = document.createElement('input');
                       input.type = 'file';
                       input.accept = '.pdf';
                       input.onchange = (e) => {
                         const file = (e.target as HTMLInputElement).files?.[0];
                         if (file) handleFileUpload(file);
                       };
                       input.click();
                     }}>
                  <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-foreground">Upload New RTP</h3>
                      <p className="text-xs text-muted-foreground mt-1">This invoice must include the corrected data</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Drag & drop a file here or{" "}
                      <span className="text-primary hover:text-primary/80 underline cursor-pointer">
                        click to browse
                      </span>
                    </div>
                    {uploadedFile && (
                      <div className="mt-3 p-2 bg-background rounded border text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-foreground">{uploadedFile.name}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFileRemoval();
                            }}
                            className="text-destructive hover:text-destructive/80"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {uploadedFile && (
                <Button 
                  onClick={onMatchAndCreateRTP}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Create RTP Record
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
