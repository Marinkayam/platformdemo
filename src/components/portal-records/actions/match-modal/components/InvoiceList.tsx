
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { UploadSection } from "@/components/invoices/detail/exceptions/extra-data/UploadSection";

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
            <div className="text-muted-foreground text-sm">
              No invoices found. Upload an invoice PDF to create a new RTP record.
            </div>
            
            <div className="space-y-4">
              <div className="max-w-md mx-auto">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Upload New RTP</h3>
                      <p className="text-xs text-gray-500 mt-1">This invoice must include the corrected data</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      Drag & drop a file here or{" "}
                      <button 
                        className="text-blue-600 hover:text-blue-700 underline"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = '.pdf';
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) handleFileUpload(file);
                          };
                          input.click();
                        }}
                      >
                        click to browse
                      </button>
                    </div>
                    {uploadedFile && (
                      <div className="mt-3 p-2 bg-white rounded border text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">{uploadedFile.name}</span>
                          <button
                            onClick={handleFileRemoval}
                            className="text-red-500 hover:text-red-700"
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
