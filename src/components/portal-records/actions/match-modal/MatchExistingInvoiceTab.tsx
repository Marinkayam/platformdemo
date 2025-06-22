
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PortalRecord } from "@/types/portalRecord";
import { invoiceData } from "@/data/invoices";
import { FileText, AlertTriangle } from "lucide-react";

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
      const matchesBuyer = invoice.buyer.toLowerCase().includes(selectedBuyer.toLowerCase());
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
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="portal-filter">Portal Filter</Label>
          <Select value={selectedPortal} onValueChange={setSelectedPortal}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={record.portal}>{record.portal}</SelectItem>
              <SelectItem value="All Portals">All Portals</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="buyer-filter">Buyer Filter</Label>
          <Input
            id="buyer-filter"
            value={selectedBuyer}
            onChange={(e) => setSelectedBuyer(e.target.value)}
            placeholder="Search buyer name..."
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search-invoices">Search Invoices</Label>
        <Input
          id="search-invoices"
          placeholder="Search by invoice ID, number, or buyer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p className="text-xs text-gray-500">
          Only showing invoices from {selectedPortal} + {selectedBuyer}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="select-invoice">Select Invoice</Label>
        <Select value={selectedInvoiceId} onValueChange={setSelectedInvoiceId}>
          <SelectTrigger>
            <SelectValue placeholder="Choose an invoice..." />
          </SelectTrigger>
          <SelectContent>
            {filteredInvoices.map((invoice) => (
              <SelectItem key={invoice.id} value={invoice.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{invoice.id} - {invoice.number}</span>
                  <span className="text-xs text-gray-500">
                    {invoice.buyer} • {formatCurrency(invoice.total, invoice.currency || 'USD')} • {invoice.dueDate}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Conflict Warning */}
      {hasConflict && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Conflict Detected:</strong> This invoice is already linked to another portal record. 
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
