
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, X, Eye, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
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
}: InvoiceSearchSectionProps) {
  const [previewInvoice, setPreviewInvoice] = useState<any>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

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
        </div>
      )}

      <InvoicePreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        invoice={previewInvoice}
      />
    </div>
  );
}
