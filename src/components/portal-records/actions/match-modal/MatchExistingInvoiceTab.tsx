import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PortalRecord } from "@/types/portalRecord";
import { invoiceData } from "@/data/invoices";
import { FileText, AlertTriangle, Search, ExternalLink, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
  onMakePrimary?: () => void;
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
  onMakePrimary,
}: MatchExistingInvoiceTabProps) {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showMakePrimaryConfirm, setShowMakePrimaryConfirm] = useState(false);

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
  
  // Check for conflicts - if invoice is already linked to another portal record
  const hasConflict = selectedInvoice && invoiceData.some(inv => 
    inv.id === selectedInvoiceId && inv.status !== 'Pending Action'
  );

  const handlePreviewPdf = () => {
    if (selectedInvoice) {
      setShowPdfModal(true);
    }
  };

  const handleMakePrimary = () => {
    setShowMakePrimaryConfirm(true);
  };

  const confirmMakePrimary = () => {
    if (onMakePrimary) {
      onMakePrimary();
    }
    toast({
      title: "Made Primary",
      description: `${record.portalRecordId} is now the primary record.`,
    });
    setShowMakePrimaryConfirm(false);
  };

  return (
    <>
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
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by invoice ID, number, or buyer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Showing {filteredInvoices.length} invoices from {selectedPortal} • {selectedBuyer === "all_buyers" ? "All Buyers" : selectedBuyer}
            </p>
          </div>

          {/* Search Results or No Results */}
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
              <div className="px-4 py-8 text-center">
                <div className="text-muted-foreground text-sm mb-4">
                  No invoices found matching your search
                </div>
                <Button 
                  onClick={handleMakePrimary}
                  variant="outline"
                  size="sm"
                  className="bg-primary/5 border-primary/20 text-primary hover:bg-primary/10"
                >
                  Make {record.portalRecordId} Primary
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Conflict Warning */}
        {hasConflict && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <span className="font-medium">Conflict Detected:</span> This invoice is already linked to another portal record. 
              Matching will create a conflict that needs to be resolved.
            </AlertDescription>
          </Alert>
        )}

        {/* Primary Match Info */}
        {selectedInvoice && !hasConflict && (
          <Alert className="border-green-200 bg-green-50">
            <FileText className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <span className="font-medium">Primary Match:</span> This portal record will become the primary match for the selected invoice.
            </AlertDescription>
          </Alert>
        )}

        {/* Selected Invoice Details */}
        {selectedInvoice && (
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Selected Invoice Details
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviewPdf}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Preview PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Invoice ID</Label>
                  <Input value={selectedInvoice.id} readOnly className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Invoice Number</Label>
                  <Input value={selectedInvoice.number || ''} readOnly className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <Input value={selectedInvoice.status} readOnly className="bg-muted/50 capitalize" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Amount</Label>
                  <Input 
                    value={formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'USD')} 
                    readOnly 
                    className="bg-muted/50 font-semibold" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Due Date</Label>
                  <Input value={selectedInvoice.dueDate} readOnly className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Buyer</Label>
                  <Input value={selectedInvoice.buyer} readOnly className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Owner</Label>
                  <Input value={selectedInvoice.owner} readOnly className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Currency</Label>
                  <Input value={selectedInvoice.currency || 'USD'} readOnly className="bg-muted/50" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* PDF Preview Modal */}
      <Dialog open={showPdfModal} onOpenChange={setShowPdfModal}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Invoice PDF Preview - {selectedInvoice?.number}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 border rounded-lg bg-gray-50 flex items-center justify-center min-h-[500px]">
            <div className="text-center text-gray-500">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium mb-2">PDF Preview</p>
              <p className="text-sm">
                Invoice {selectedInvoice?.number} would be displayed here
              </p>
              <p className="text-xs text-gray-400 mt-2">
                PDF viewer integration would be implemented here
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Make Primary Confirmation Modal */}
      <Dialog open={showMakePrimaryConfirm} onOpenChange={setShowMakePrimaryConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Make Primary Record?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-6">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to make <span className="font-mono text-foreground">{record.portalRecordId}</span> the primary record? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline"
                onClick={() => setShowMakePrimaryConfirm(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmMakePrimary}
                className="bg-primary hover:bg-primary/90"
              >
                Yes, Make Primary
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
