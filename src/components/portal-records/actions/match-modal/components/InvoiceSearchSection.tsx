import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, X, Eye, Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { InvoiceMatch } from "@/utils/invoiceMatching";
import { InvoicePreviewModal } from "./InvoicePreviewModal";

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
  const [previewInvoice, setPreviewInvoice] = useState<any>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showCreateRTPModal, setShowCreateRTPModal] = useState(false);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const handlePreviewInvoice = (invoice: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewInvoice(invoice);
    setShowPreviewModal(true);
  };

  const handleSuggestionClick = (invoiceId: string) => {
    onSuggestionSelect(invoiceId);
  };

  const handleCreateRTPClick = () => {
    setShowCreateRTPModal(true);
  };

  const handleCreateRTPConfirm = () => {
    // Trigger the file upload dialog
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && onCreateRTP) {
        onCreateRTP();
        setShowCreateRTPModal(false);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-4">
      {/* Search Section */}
      {showSearchInput && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Search Invoices</Label>
            <div className="flex gap-2">
              {selectedInvoiceId && onUnselectInvoice && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onUnselectInvoice}
                  className="h-6 text-xs text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3 mr-1" />
                  Unselect
                </Button>
              )}
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
            <p className="text-xs text-muted-foreground">
              Showing {filteredInvoicesCount} invoices from {selectedPortal} • {selectedBuyer === "all_buyers" ? "All Buyers" : selectedBuyer}
            </p>
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
          <div className="border rounded-lg overflow-hidden bg-primary/5">
            <div className="space-y-2 p-3">
              {suggestions.map((match) => {
                const isSelected = selectedInvoiceId === match.invoice.id;
                return (
                  <div
                    key={match.invoice.id}
                    className={`relative p-3 rounded-md border transition-colors ${
                      isSelected 
                        ? 'bg-primary/15 border-primary ring-2 ring-primary/30' 
                        : 'bg-white hover:bg-gray-50 cursor-pointer border-gray-200'
                    }`}
                    onClick={() => handleSuggestionClick(match.invoice.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-sm flex items-center gap-2">
                          {isSelected && <Check className="h-4 w-4 text-primary" />}
                          {match.invoice.number}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {match.invoice.buyer} • {formatCurrency(match.invoice.total, match.invoice.currency || 'USD')} • {match.invoice.dueDate}
                        </div>
                        <div className="flex gap-1 mt-2">
                          {match.matchReasons.map((reason, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center text-xs text-muted-foreground"
                            >
                              {reason.label}
                              {index < match.matchReasons.length - 1 && <span className="mx-1">•</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => handlePreviewInvoice(match.invoice, e)}
                          className="h-7 px-3 text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Didn't find an invoice section */}
          {onCreateRTP && (
            <div className="text-center py-2">
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
      <Dialog open={showCreateRTPModal} onOpenChange={setShowCreateRTPModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New RTP Record</DialogTitle>
            <DialogDescription>
              Upload an invoice PDF to create a new Request to Pay record with the corrected data.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 p-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">Upload Invoice PDF</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Select a PDF file containing the corrected invoice data to create a new RTP record.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button 
                variant="outline"
                onClick={() => setShowCreateRTPModal(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateRTPConfirm}
                className="bg-primary hover:bg-primary/90"
              >
                <Upload className="h-4 w-4 mr-2" />
                Create RTP Record
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <InvoicePreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        invoice={previewInvoice}
      />
    </div>
  );
}
