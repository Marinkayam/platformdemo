
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
}: InvoiceSearchSectionProps) {
  const getMatchReasonColor = (type: string) => {
    switch (type) {
      case 'partial-id':
        return 'bg-blue-100 text-blue-800';
      case 'amount-match':
        return 'bg-green-100 text-green-800';
      case 'date-proximity':
        return 'bg-orange-100 text-orange-800';
      case 'currency-match':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Monto's Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <Label className="text-sm font-medium text-primary">Monto's Suggestions</Label>
          </div>
          <div className="border rounded-lg p-3 bg-primary/5">
            <div className="space-y-2">
              {suggestions.map((match) => (
                <button
                  key={match.invoice.id}
                  onClick={() => onSuggestionSelect(match.invoice.id)}
                  className="w-full text-left p-3 rounded-md border bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {match.invoice.id} - {match.invoice.number}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {match.invoice.buyer} • {formatCurrency(match.invoice.total, match.invoice.currency || 'USD')} • {match.invoice.dueDate}
                      </div>
                      <div className="flex gap-1 mt-2">
                        {match.matchReasons.map((reason, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className={`text-xs ${getMatchReasonColor(reason.type)}`}
                          >
                            {reason.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground ml-2">
                      {match.score}% match
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Search Invoices</Label>
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
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by invoice ID, number, or buyer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Showing {filteredInvoicesCount} invoices from {selectedPortal} • {selectedBuyer === "all_buyers" ? "All Buyers" : selectedBuyer}
        </p>
      </div>
    </div>
  );
}
