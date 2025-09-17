import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, X, Check, Upload, ChevronDown, ChevronUp, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { InvoiceMatch } from "@/utils/invoiceMatching";

interface InvoiceSearchSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedPortal: string;
  selectedBuyer: string;
  filteredInvoicesCount: number;
  suggestions?: InvoiceMatch[];
  onSuggestionSelect: (invoiceId: string) => void;
  showSuggestions: boolean;
  onClearSearch: () => void;
  selectedInvoiceId?: string;
  showSearchInput?: boolean;
  onUnselectInvoice?: () => void;
  onCreateRTP?: () => void;
}

export function InvoiceSearchSection({
  searchTerm,
  setSearchTerm,
  selectedPortal,
  selectedBuyer,
  filteredInvoicesCount,
  suggestions = [],
  onSuggestionSelect,
  showSuggestions,
  onClearSearch,
  selectedInvoiceId,
  showSearchInput = true,
  onUnselectInvoice,
  onCreateRTP,
}: InvoiceSearchSectionProps) {
  const [expandedInvoiceId, setExpandedInvoiceId] = useState<string | null>(null);
  const [showCreateRTPModal, setShowCreateRTPModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const handleToggleDetails = (invoiceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedInvoiceId(expandedInvoiceId === invoiceId ? null : invoiceId);
  };

  const handleDownloadPdf = (invoice: any) => {
    console.log(`Downloading PDF for invoice ${invoice?.number}`);
  };

  const handleSuggestionClick = (invoiceId: string) => {
    onSuggestionSelect(invoiceId);
  };

  const handleCreateRTPClick = () => {
    setShowCreateRTPModal(true);
  };

  const handleFileUpload = (file: File) => {
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setUploadedFile(file);
      // Don't close the modal - keep it open for user to click "Create RTP Record"
    } else {
      alert('Please upload a PDF file only.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    };
    input.click();
  };

  const handleCreateRTPConfirm = () => {
    if (uploadedFile && onCreateRTP) {
      console.log('Creating RTP with uploaded file:', uploadedFile.name);

      // Show success toast
      import('sonner').then(({ toast }) => {
        toast.success("RTP Record Created", {
          description: `New RTP record has been created successfully with ${uploadedFile.name}. Returning to portal records...`,
        });
      });

      // Close modal and clean up
      setShowCreateRTPModal(false);
      setUploadedFile(null);

      // Call the parent callback
      onCreateRTP();
    }
  };

  const handleCancelRTP = () => {
    setShowCreateRTPModal(false);
    setUploadedFile(null);
  };

  return (
    <div className="space-y-4">
      {/* Search Section */}
      {showSearchInput && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Search Invoices</Label>
            <div className="flex gap-2">
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearSearch}
                  className="h-6 text-xs text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by invoice ID, number, or buyer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          {searchTerm && (
            <>
              {filteredInvoicesCount > 0 ? (
                <p className="text-xs text-muted-foreground">
                  Showing {filteredInvoicesCount} invoices from {selectedPortal} • {selectedBuyer === "all_buyers" ? "All Buyers" : selectedBuyer}
                </p>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">
                    Didn't find an invoice? Upload an invoice PDF to{" "}
                    <span
                      className="text-primary cursor-pointer hover:underline font-medium"
                      onClick={handleCreateRTPClick}
                    >
                      create a new RTP record
                    </span>
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Monto's Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <Label className="text-sm font-medium text-primary">Monto's Suggestions</Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map((match) => {
              const isSelected = selectedInvoiceId === match.invoice.id;
              const isExpanded = expandedInvoiceId === match.invoice.id;
              return (
                <div key={match.invoice.id} className="space-y-0">
                  <div
                    className={`relative p-4 rounded-lg border transition-all shadow-sm cursor-pointer ${
                      isSelected
                        ? 'border-primary border-2 bg-white'
                        : 'border-gray-200 hover:border-primary/30 hover:shadow-md bg-white'
                    }`}
                    onClick={() => handleSuggestionClick(match.invoice.id)}
                  >
                    <div className="space-y-3">

                      {/* Invoice details */}
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs text-gray-500 font-medium">Invoice Number</span>
                          <p className="text-sm font-bold text-gray-900">{match.invoice.number}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 font-medium">Buyer</span>
                          <p className="text-sm text-gray-700">{match.invoice.buyer}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 font-medium">Total Amount</span>
                          <p className="text-sm text-gray-700">
                            {formatCurrency(match.invoice.total, match.invoice.currency || 'USD')}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 font-medium">Currency</span>
                          <p className="text-sm text-gray-700">{match.invoice.currency || 'USD'}</p>
                        </div>
                      </div>


                      {/* More Details button */}
                      <div className="flex justify-end">
                        <button
                          onClick={(e) => handleToggleDetails(match.invoice.id, e)}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center"
                        >
                          More Details
                          {isExpanded ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded details section */}
                  {isExpanded && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                      {/* First Row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label>VAT/Tax ID</Label>
                          <Input
                            value="77-0105228"
                            readOnly
                            className="bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label>Invoice Date</Label>
                          <Input
                            value="April 25, 2025"
                            readOnly
                            className="bg-white"
                          />
                        </div>
                      </div>

                      {/* Second Row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label>Amount Due</Label>
                          <Input
                            value={formatCurrency(match.invoice.total, match.invoice.currency || 'USD')}
                            readOnly
                            className="bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label>Terms</Label>
                          <Input
                            value="Net 90"
                            readOnly
                            className="bg-white"
                          />
                        </div>
                      </div>

                      {/* Third Row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label>Due Date</Label>
                          <Input
                            value={match.invoice.dueDate}
                            readOnly
                            className="bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label>PO #</Label>
                          <Input
                            value="0082585886"
                            readOnly
                            className="bg-white"
                          />
                        </div>
                      </div>

                      {/* Download PDF Button */}
                      <div className="pt-3 border-t border-gray-200">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadPdf(match.invoice)}
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Didn't find an invoice section */}
          {onCreateRTP && (
            <div className="text-center py-6 mt-4">
              <p className="text-sm text-muted-foreground">
                Didn't find an invoice? Upload an invoice PDF to{" "}
                <span
                  className="text-primary cursor-pointer hover:underline font-medium"
                  onClick={handleCreateRTPClick}
                >
                  create a new RTP record
                </span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Create RTP Modal */}
      <Dialog open={showCreateRTPModal} onOpenChange={(open) => !open && handleCancelRTP()}>
        <DialogContent className="max-w-lg">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Create New RTP Record</DialogTitle>
            <DialogDescription>
              Upload an invoice PDF to create a new Request to Pay record with the corrected data.
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-6">
            <div
              className={`border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-300 ${
                isDragging
                  ? 'border-primary bg-primary/5 scale-[1.01] shadow-lg'
                  : 'border-gray-300 hover:border-primary/60 hover:bg-gray-50/50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onClick={() => !isDragging && handleFileSelect()}
            >
              <div className="p-8 space-y-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 ${
                  isDragging
                    ? 'bg-primary/10 scale-105 border-2 border-primary'
                    : 'bg-gray-50 hover:bg-primary/5 border-2 border-transparent hover:border-primary/30'
                }`}>
                  <Upload className={`w-6 h-6 transition-all duration-300 ${
                    isDragging
                      ? 'text-primary scale-110'
                      : 'text-gray-400 hover:text-primary'
                  }`} />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {isDragging ? (
                        <span className="text-primary">Drop your file here</span>
                      ) : (
                        'Upload your files'
                      )}
                    </h4>

                    {!isDragging && (
                      <p className="text-sm text-gray-600">
                        Drag and drop your file here, or{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFileSelect();
                          }}
                          className="text-primary hover:text-primary/80 font-medium underline decoration-2 underline-offset-2 hover:decoration-primary/60 transition-colors"
                        >
                          browse files
                        </button>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Supporting PDF files
                    </span>
                    <span className="text-gray-300">•</span>
                    <span>Max 10MB</span>
                  </div>
                </div>
              </div>
            </div>

            {uploadedFile && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md border text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{uploadedFile.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round(uploadedFile.size / 1024)} KB
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-3 mt-6">
              <Button 
                variant="outline"
                onClick={handleCancelRTP}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateRTPConfirm}
                disabled={!uploadedFile}
                className="bg-primary hover:bg-primary/90"
              >
                <Upload className="h-4 w-4 mr-2" />
                Create RTP Record
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
