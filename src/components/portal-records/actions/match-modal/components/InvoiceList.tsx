
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
    <div className="border rounded-lg max-h-60 overflow-y-auto">
      {filteredInvoices.length > 0 ? (
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
      ) : (
        <div className="p-8">
          <div className="text-center space-y-6">
            <div className="text-muted-foreground text-sm">
              No invoices found matching your search
            </div>
            
            <div className="space-y-4">
              <div className="max-w-md mx-auto">
                <UploadSection
                  uploadedFile={uploadedFile}
                  isUploading={false}
                  uploadProgress={0}
                  selectedAction="upload"
                  onFileUpload={handleFileUpload}
                  onFileRemoval={handleFileRemoval}
                />
              </div>
              
              {uploadedFile && (
                <Button 
                  onClick={onMatchAndCreateRTP}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Match & Create RTP
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
