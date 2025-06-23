
import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PortalRecord } from "@/types/portalRecord";
import { invoiceData } from "@/data/invoices";
import { FileText, AlertTriangle, Search } from "lucide-react";

interface MatchExistingInvoiceTabProps {
  record: PortalRecord;
  selectedInvoiceId: string;
  setSelectedInvoiceId: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedPortal: string;
  setSelectedPortal: (portal: string) => void;
  selectedBuyer: string;
  setSelectedBuyer: (buyer: string) => void;
  debouncedSearchTerm: string;
}

export function MatchExistingInvoiceTab({
  record,
  selectedInvoiceId,
  setSelectedInvoiceId,
  searchTerm,
  setSearchTerm,
  selectedPortal,
  setSelectedPortal,
  selectedBuyer,
  setSelectedBuyer,
  debouncedSearchTerm,
}: MatchExistingInvoiceTabProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // Filter invoices with enhanced search
  const filteredInvoices = useMemo(() => {
    return invoiceData.filter(invoice => {
      const matchesBuyer = selectedBuyer === "all_buyers" || invoice.buyer.toLowerCase().includes(selectedBuyer.toLowerCase());
      const matchesSearch = debouncedSearchTerm === "" || 
        invoice.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        invoice.buyer.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        invoice.number?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      return matchesBuyer && matchesSearch;
    });
  }, [selectedBuyer, debouncedSearchTerm]);

  const selectedInvoice = filteredInvoices.find(inv => inv.id === selectedInvoiceId);
  
  // Check for conflicts
  const hasConflict = selectedInvoice && invoiceData.some(inv => 
    inv.id === selectedInvoiceId && inv.status !== 'Pending Action'
  );

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="portal-filter" className="text-sm font-medium">Portal Filter</Label>
          <Select value={selectedPortal} onValueChange={setSelectedPortal}>
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={record.portal}>{record.portal}</SelectItem>
              <SelectItem value="All Portals">All Portals</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="buyer-filter" className="text-sm font-medium">Buyer Filter</Label>
          <Select value={selectedBuyer} onValueChange={setSelectedBuyer}>
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={record.buyer}>{record.buyer}</SelectItem>
              <SelectItem value="all_buyers">All Buyers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Section */}
      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Search Invoices</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by invoice ID, number, or buyer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <p className="text-xs text-gray-500">
            Showing {filteredInvoices.length} invoices from {selectedPortal} • {selectedBuyer === "all_buyers" ? "All Buyers" : selectedBuyer}
          </p>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="border rounded-lg max-h-60 overflow-y-auto">
            {filteredInvoices.length > 0 ? (
              <div className="divide-y">
                {filteredInvoices.map((invoice) => (
                  <button
                    key={invoice.id}
                    onClick={() => setSelectedInvoiceId(invoice.id)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                      selectedInvoiceId === invoice.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{invoice.id} - {invoice.number}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {invoice.buyer} • {formatCurrency(invoice.total, invoice.currency || 'USD')} • {invoice.dueDate}
                        </div>
                      </div>
                      {selectedInvoiceId === invoice.id && (
                        <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center ml-2">
                          <div className="h-2 w-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                No invoices found matching your search
              </div>
            )}
          </div>
        )}
      </div>

      {/* Conflict Warning */}
      {hasConflict && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <span className="font-medium">Conflict Detected:</span> This invoice is already linked to another portal record. 
            Matching will replace the existing link and may create a conflict.
          </AlertDescription>
        </Alert>
      )}

      {/* Selected Invoice Details */}
      {selectedInvoice && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Selected Invoice Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-gray-700">Invoice ID:</span>
                <p className="font-mono">{selectedInvoice.id}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <p className="capitalize">{selectedInvoice.status}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Amount:</span>
                <p className="font-semibold">{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'USD')}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Due Date:</span>
                <p>{selectedInvoice.dueDate}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Buyer:</span>
                <p>{selectedInvoice.buyer}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Owner:</span>
                <p>{selectedInvoice.owner}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
